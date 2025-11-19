import React, { useState, useEffect } from 'react';

export default function Sales() {
    const [documents, setDocuments] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);

    // Simple form state for creating a document
    const [formData, setFormData] = useState({ customer_id: '', type: 'quotation', items: [] });
    const [currentItem, setCurrentItem] = useState({ product_id: '', quantity: 1 });

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchDocuments();
        fetchCustomers();
        fetchProducts();
    }, []);

    const fetchDocuments = async () => {
        const res = await fetch('/api/sales', { headers: { 'Authorization': `Bearer ${token}` } });
        if (res.ok) setDocuments(await res.json());
    };

    const fetchCustomers = async () => {
        const res = await fetch('/api/customers', { headers: { 'Authorization': `Bearer ${token}` } });
        if (res.ok) setCustomers(await res.json());
    };

    const fetchProducts = async () => {
        const res = await fetch('/api/inventory', { headers: { 'Authorization': `Bearer ${token}` } });
        if (res.ok) setProducts(await res.json());
    };

    const addItem = () => {
        const product = products.find(p => p.id === parseInt(currentItem.product_id));
        if (!product) return;

        setFormData({
            ...formData,
            items: [...formData.items, { ...currentItem, price: product.price, name: product.name }]
        });
        setCurrentItem({ product_id: '', quantity: 1 });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/sales', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            setShowForm(false);
            setFormData({ customer_id: '', type: 'quotation', items: [] });
            fetchDocuments();
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3>Sales & Orders</h3>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : '+ Create Document'}
                </button>
            </div>

            {showForm && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h4>New {formData.type}</h4>
                    <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
                        <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} style={{ padding: '0.5rem' }}>
                            <option value="quotation">Quotation</option>
                            <option value="order">Order</option>
                            <option value="invoice">Invoice</option>
                        </select>

                        <select value={formData.customer_id} onChange={e => setFormData({ ...formData, customer_id: e.target.value })} style={{ padding: '0.5rem' }}>
                            <option value="">Select Customer</option>
                            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>

                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <select value={currentItem.product_id} onChange={e => setCurrentItem({ ...currentItem, product_id: e.target.value })} style={{ flex: 1, padding: '0.5rem' }}>
                                <option value="">Select Product</option>
                                {products.map(p => <option key={p.id} value={p.id}>{p.name} (${p.price})</option>)}
                            </select>
                            <input type="number" min="1" value={currentItem.quantity} onChange={e => setCurrentItem({ ...currentItem, quantity: parseInt(e.target.value) })} style={{ width: '80px', padding: '0.5rem' }} />
                            <button type="button" onClick={addItem} className="btn btn-outline">Add Item</button>
                        </div>

                        {formData.items.length > 0 && (
                            <ul style={{ listStyle: 'none', backgroundColor: 'var(--background)', padding: '0.5rem' }}>
                                {formData.items.map((item, idx) => (
                                    <li key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span>{item.name} x {item.quantity}</span>
                                        <span>${item.price * item.quantity}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <button onClick={handleSubmit} className="btn btn-primary" disabled={formData.items.length === 0 || !formData.customer_id}>
                            Create {formData.type}
                        </button>
                    </div>
                </div>
            )}

            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '0.5rem' }}>ID</th>
                            <th style={{ padding: '0.5rem' }}>Date</th>
                            <th style={{ padding: '0.5rem' }}>Customer</th>
                            <th style={{ padding: '0.5rem' }}>Type</th>
                            <th style={{ padding: '0.5rem' }}>Status</th>
                            <th style={{ padding: '0.5rem' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map(d => (
                            <tr key={d.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '0.5rem' }}>#{d.id}</td>
                                <td style={{ padding: '0.5rem' }}>{new Date(d.created_at).toLocaleDateString()}</td>
                                <td style={{ padding: '0.5rem' }}>{d.customer_name}</td>
                                <td style={{ padding: '0.5rem', textTransform: 'capitalize' }}>{d.type}</td>
                                <td style={{ padding: '0.5rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '1rem',
                                        backgroundColor: d.status === 'confirmed' ? 'var(--success)' : 'var(--secondary)',
                                        color: 'white',
                                        fontSize: '0.8rem'
                                    }}>
                                        {d.status}
                                    </span>
                                </td>
                                <td style={{ padding: '0.5rem' }}>${d.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
