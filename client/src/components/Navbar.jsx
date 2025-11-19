import React from 'react';

export default function Navbar({ cartCount, onOpenCart, user, onLogout, onLoginClick }) {
    return (
        <header>
            <div className="container navbar">
                <div className="logo">
                    🛡️ InsureCart
                </div>
                <nav className="nav-links">
                    <a href="#" onClick={(e) => { e.preventDefault(); }}>Home</a>
                    {user ? (
                        <>
                            <span style={{ color: 'var(--text-light)' }}>Hello, {user.name}</span>
                            <button onClick={onLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Logout</button>
                        </>
                    ) : (
                        <button onClick={onLoginClick} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Sign In</button>
                    )}
                </nav>
                {user && (
                    <button className="cart-icon" onClick={onOpenCart} aria-label="Open Cart">
                        🛒
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </button>
                )}
            </div>
        </header>
    );
}
