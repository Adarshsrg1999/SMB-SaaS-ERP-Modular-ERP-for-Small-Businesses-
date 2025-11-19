const request = require('supertest');
const app = require('../server');

describe('Insurance API Endpoints', () => {

    it('GET /api/products should return a list of products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /api/cart should return empty cart initially', async () => {
        const res = await request(app).get('/api/cart');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('POST /api/auth/register should create a new user', async () => {
        const uniqueEmail = `test${Date.now()}@example.com`;
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: uniqueEmail,
                password: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('User registered successfully');
    });

});
