import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function DashboardLayout({ children, user, onLogout }) {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { path: '/', label: 'Dashboard', icon: '📊' },
        { path: '/customers', label: 'Customers', icon: '👥' },
        { path: '/inventory', label: 'Inventory', icon: '📦' },
        { path: '/sales', label: 'Sales & Orders', icon: '💰' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', backgroundColor: 'var(--accent)', color: 'white', padding: '1rem' }}>
                <div style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>🚀</span> SMB ERP
                </div>

                <nav>
                    <ul style={{ listStyle: 'none' }}>
                        {menuItems.map((item) => (
                            <li key={item.path} style={{ marginBottom: '0.5rem' }}>
                                <Link
                                    to={item.path}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius)',
                                        backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                                        color: 'white',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <span>{item.icon}</span>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ marginBottom: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>
                        Logged in as: <br /> <strong>{user?.name}</strong> ({user?.role})
                    </div>
                    <button
                        onClick={onLogout}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius)',
                            cursor: 'pointer'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, backgroundColor: 'var(--background)', display: 'flex', flexDirection: 'column' }}>
                <header style={{ padding: '1rem 2rem', backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0 }}>{menuItems.find(i => i.path === location.pathname)?.label || 'ERP'}</h2>
                </header>
                <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                    {children}
                </div>
            </main>
        </div>
    );
}
