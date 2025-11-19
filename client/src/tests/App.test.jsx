import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Component', () => {
    it('redirects to login page by default', () => {
        render(<App />);
        // Should show Sign In form
        expect(screen.getByRole('heading', { name: /Sign In/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    });

    it('shows register link', () => {
        render(<App />);
        expect(screen.getByText(/Don't have an account?/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Register/i })).toBeInTheDocument();
    });
});
