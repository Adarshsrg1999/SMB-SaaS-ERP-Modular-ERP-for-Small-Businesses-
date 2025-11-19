import React from 'react';

export default function Cart({ isOpen, onClose, items, onCheckout }) {
    if (!isOpen) return null;

    const total = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            maxWidth: '400px',
            backgroundColor: 'var(--surface)',
            boxShadow: '-4px 0 15px rgba(0,0,0,0.1)',
            zIndex: 100,
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Your Cart</h2>
                <button onClick={onClose} style={{ fontSize: '1.5rem' }}>&times;</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
                {items.length === 0 ? (
                    <p style={{ color: 'var(--text-light)', textAlign: 'center' }}>Your cart is empty.</p>
                ) : (
                    items.map((item, index) => (
                        <div key={index} style={{
                            padding: '1rem',
                            borderBottom: '1px solid var(--border)',
                            marginBottom: '1rem'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4>{item.name}</h4>
                                <span style={{ fontWeight: 'bold' }}>${item.price}</span>
                            </div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>{item.category}</p>
                        </div>
                    ))
                )}
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
                    <span>Total</span>
                    <span>${total}/mo</span>
                </div>
                <button
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    onClick={onCheckout}
                    disabled={items.length === 0}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
}
