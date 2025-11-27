import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

describe('ProtectedRoute Component', () => {
    it('redirects unauthenticated user to login', () => {
        render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route path="/login" element={<div>Login Page</div>} />
                    <Route
                        path="/protected"
                        element={
                            <ProtectedRoute user={null}>
                                <div>Protected Content</div>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('Login Page')).toBeInTheDocument();
        expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    });

    it('redirects unauthorized user to access denied', () => {
        const user = { role: 'staff' };
        render(
            <MemoryRouter initialEntries={['/admin']}>
                <Routes>
                    <Route path="/access-denied" element={<div>Access Denied Page</div>} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute user={user} allowedRoles={['admin']}>
                                <div>Admin Content</div>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('Access Denied Page')).toBeInTheDocument();
        expect(screen.queryByText('Admin Content')).not.toBeInTheDocument();
    });

    it('renders content for authorized user', () => {
        const user = { role: 'admin' };
        render(
            <MemoryRouter initialEntries={['/admin']}>
                <Routes>
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute user={user} allowedRoles={['admin']}>
                                <div>Admin Content</div>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('Admin Content')).toBeInTheDocument();
    });
});
