const express = require('express');
const db = require('../database');
const router = express.Router();

// Middleware (Simple version, should be shared)
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

// GET all products
router.get('/', (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// ADD product
router.post('/', (req, res) => {
    const { name, sku, price, stock_quantity, description } = req.body;
    db.run("INSERT INTO products (name, sku, price, stock_quantity, description) VALUES (?, ?, ?, ?, ?)",
        [name, sku, price, stock_quantity || 0, description],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            // Log initial stock
            if (stock_quantity > 0) {
                db.run("INSERT INTO inventory_logs (product_id, change_amount, type, reason) VALUES (?, ?, ?, ?)",
                    [this.lastID, stock_quantity, 'in', 'Initial Stock']);
            }

            res.status(201).json({ id: this.lastID, message: 'Product added' });
        }
    );
});

// UPDATE Stock (Inventory Adjustment)
router.post('/:id/stock', (req, res) => {
    const { change_amount, type, reason } = req.body; // type: 'in' or 'out'
    const productId = req.params.id;

    const adjustment = type === 'in' ? change_amount : -change_amount;

    db.run("UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?",
        [adjustment, productId],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            db.run("INSERT INTO inventory_logs (product_id, change_amount, type, reason) VALUES (?, ?, ?, ?)",
                [productId, change_amount, type, reason]);

            res.json({ message: 'Stock updated' });
        }
    );
});

module.exports = router;
