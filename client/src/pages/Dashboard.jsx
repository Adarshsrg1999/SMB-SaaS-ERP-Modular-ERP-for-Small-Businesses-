import React from 'react';

export default function Dashboard() {
    return (
        <div className="grid">
            <div className="card">
                <h3>Total Sales</h3>
                <p className="price">$12,450</p>
                <span style={{ color: 'var(--success)' }}>+15% from last month</span>
            </div>
            <div className="card">
                <h3>Active Customers</h3>
                <p className="price">45</p>
                <span style={{ color: 'var(--success)' }}>+5 new this week</span>
            </div>
            <div className="card">
                <h3>Pending Orders</h3>
                <p className="price">8</p>
                <span style={{ color: 'var(--text-light)' }}>Needs attention</span>
            </div>
            <div className="card">
                <h3>Low Stock Items</h3>
                <p className="price" style={{ color: 'var(--danger)' }}>3</p>
                <span style={{ color: 'var(--danger)' }}>Restock immediately</span>
            </div>
        </div>
    );
}
