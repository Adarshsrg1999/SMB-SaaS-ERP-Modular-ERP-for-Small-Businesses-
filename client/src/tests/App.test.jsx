import { render, screen } from '@testing-library/react';
import App from '../App';
import { describe, it, expect, vi } from 'vitest';

// Mock the API calls
vi.mock('../api', () => ({
    fetchProducts: vi.fn(() => Promise.resolve([
        { id: 1, name: 'Test Product', price: 100, features: [] }
    ])),
    fetchCart: vi.fn(() => Promise.resolve([])),
}));

describe('App Component', () => {
    it('renders the Navbar', async () => {
        render(<App />);
        // Check for Logo text
        expect(await screen.findByText(/InsureCart/i)).toBeInTheDocument();
        // Check for Sign In button (since we are not logged in)
        expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    });

    it('renders the Hero section', async () => {
        render(<App />);
        expect(await screen.findByText(/Secure Your Future/i)).toBeInTheDocument();
    });
});
