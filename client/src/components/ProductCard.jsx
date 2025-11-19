import React from 'react';

export default function ProductCard({ product, onAdd }) {
    return (
        <div className="card">
            <h3>{product.name}</h3>
            <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>{product.category}</p>
            <p>{product.description}</p>
            <ul className="features">
                {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                <div className="price">
                    ${product.price}<span>/mo</span>
                </div>
                <button className="btn btn-primary" onClick={() => onAdd(product.id)}>
                    Add Plan
                </button>
            </div>
        </div>
    );
}
