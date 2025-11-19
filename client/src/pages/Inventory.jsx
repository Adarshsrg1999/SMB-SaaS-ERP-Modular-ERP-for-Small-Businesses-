import React, { useState, useEffect } from 'react';

export default function Inventory() {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', sku: '', price: '', stock_quantity: '' });

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch('/api/inventory', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            const data = await res.json();
            setProducts(data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/inventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            setShowForm(false);
            setFormData({ name: '', sku: '', price: '', stock_quantity: '' });
            fetchProducts();
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3>Inventory</h3>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : '+ Add Product'}
                </button>
            </div>

            {showForm && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                        <input placeholder="Product Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required style={{ padding: '0.5rem' }} />
                        <input placeholder="SKU" value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })} required style={{ padding: '0.5rem' }} />
                        <input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required style={{ padding: '0.5rem' }} />
                        <input type="number" placeholder="Initial Stock" value={formData.stock_quantity} onChange={e => setFormData({ ...formData, stock_quantity: e.target.value })} style={{ padding: '0.5rem' }} />
                        <button type="submit" className="btn btn-primary" style={{ gridColumn: 'span 2' }}>Save Product</button>
                    </form>
                </div>
            )}

            <div className="grid">
                {products.map(p => (
                    <div key={p.id} className="card">
                        <h4>{p.name}</h4>
                        <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>SKU: {p.sku}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', alignItems: 'center' }}>
                            <span className="price">${p.price}</span>
                            <span style={{
                                padding: '0.25rem 0.5rem',
                                borderRadius: '1rem',
                                backgroundColor: p.stock_quantity < p.min_stock_level ? 'var(--danger)' : 'var(--success)',
                                color: 'white',
                                fontSize: '0.8rem'
                            }}>
                                Stock: {p.stock_quantity}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
