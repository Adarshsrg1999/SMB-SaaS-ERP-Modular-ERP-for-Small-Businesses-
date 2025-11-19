const express = require('express');
const db = require('../database');
const router = express.Router();

// Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    const jwt = require('jsonwebtoken');
    const SECRET_KEY = process.env.SECRET_KEY || 'supersecretkey';
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

router.use(authenticateToken);

// GET all documents (with filters optional)
router.get('/', (req, res) => {
    const { type } = req.query;
    let query = "SELECT sales_documents.*, customers.name as customer_name FROM sales_documents LEFT JOIN customers ON sales_documents.customer_id = customers.id";
    let params = [];

    if (type) {
        query += " WHERE type = ?";
        params.push(type);
    }

    query += " ORDER BY created_at DESC";

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// CREATE Document (Quote/Order)
router.post('/', (req, res) => {
    const { customer_id, type, items } = req.body; // items: [{ product_id, quantity, price }]

    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const status = type === 'quotation' ? 'pending' : 'confirmed';

    db.run("INSERT INTO sales_documents (customer_id, type, status, total) VALUES (?, ?, ?, ?)",
        [customer_id, type, status, total],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            const docId = this.lastID;

            // Insert Items
            const placeholders = items.map(() => '(?, ?, ?, ?)').join(',');
            const values = [];
            items.forEach(item => {
                values.push(docId, item.product_id, item.quantity, item.price);
            });

            db.run(`INSERT INTO sale_items (document_id, product_id, quantity, price) VALUES ${placeholders}`, values, (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ id: docId, message: 'Document created' });
            });
        }
    );
});

// UPDATE Status (e.g., Quote -> Order, Order -> Invoice)
router.patch('/:id/status', (req, res) => {
    const { status, type } = req.body;
    const updates = [];
    const params = [];

    if (status) {
        updates.push("status = ?");
        params.push(status);
    }
    if (type) {
        updates.push("type = ?");
        params.push(type);
    }
    params.push(req.params.id);

    db.run(`UPDATE sales_documents SET ${updates.join(', ')} WHERE id = ?`, params, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Document updated' });
    });
});

module.exports = router;
