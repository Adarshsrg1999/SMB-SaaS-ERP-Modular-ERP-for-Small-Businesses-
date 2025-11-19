import React, { useState, useEffect } from 'react';

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', gst: '' });

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        const res = await fetch('/api/customers', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            const data = await res.json();
            setCustomers(data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            setShowForm(false);
            setFormData({ name: '', email: '', phone: '', address: '', gst: '' });
            fetchCustomers();
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3>Customer List</h3>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : '+ Add Customer'}
                </button>
            </div>

            {showForm && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                        <input placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required style={{ padding: '0.5rem' }} />
                        <input placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ padding: '0.5rem' }} />
                        <input placeholder="Phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} style={{ padding: '0.5rem' }} />
                        <input placeholder="GST No" value={formData.gst} onChange={e => setFormData({ ...formData, gst: e.target.value })} style={{ padding: '0.5rem' }} />
                        <input placeholder="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} style={{ gridColumn: 'span 2', padding: '0.5rem' }} />
                        <button type="submit" className="btn btn-primary" style={{ gridColumn: 'span 2' }}>Save Customer</button>
                    </form>
                </div>
            )}

            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '0.5rem' }}>Name</th>
                            <th style={{ padding: '0.5rem' }}>Email</th>
                            <th style={{ padding: '0.5rem' }}>Phone</th>
                            <th style={{ padding: '0.5rem' }}>GST</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(c => (
                            <tr key={c.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '0.5rem' }}>{c.name}</td>
                                <td style={{ padding: '0.5rem' }}>{c.email}</td>
                                <td style={{ padding: '0.5rem' }}>{c.phone}</td>
                                <td style={{ padding: '0.5rem' }}>{c.gst}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
