import React from 'react';

export default function Receipt({ receipt, onContinueShopping }) {
    if (!receipt) return null;

    return (
        <div className="container" style={{ maxWidth: '600px', marginTop: '4rem' }}>
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                <h1 style={{ color: 'var(--success)', marginBottom: '1rem' }}>Thank You!</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
                    Your order has been placed successfully.
                </p>

                <div style={{ textAlign: 'left', backgroundColor: 'var(--background)', padding: '1.5rem', borderRadius: 'var(--radius)', marginBottom: '2rem' }}>
                    <p><strong>Order ID:</strong> #{receipt.orderId}</p>
                    <p><strong>Date:</strong> {new Date(receipt.date).toLocaleString()}</p>
                    <p><strong>Name:</strong> {receipt.user.name}</p>
                    <p><strong>Email:</strong> {receipt.user.email}</p>

                    <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />

                    <ul style={{ listStyle: 'none', marginBottom: '1rem' }}>
                        {receipt.items.map((item, index) => (
                            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>{item.name}</span>
                                <span>${item.price}</span>
                            </li>
                        ))}
                    </ul>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.25rem' }}>
                        <span>Total</span>
                        <span>${receipt.total}</span>
                    </div>
                </div>

                <button className="btn btn-primary" onClick={onContinueShopping}>
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}
