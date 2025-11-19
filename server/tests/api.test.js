const request = require('supertest');
const app = require('../server');
const db = require('../database');

describe('ERP API Endpoints', () => {
    let token;

    beforeAll(async () => {
        // Create a test user for login
        const uniqueEmail = `admin${Date.now()}@erp.com`;
        await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test Admin',
                email: uniqueEmail,
                password: 'password123',
                role: 'admin'
            });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: uniqueEmail,
                password: 'password123'
            });
        token = res.body.token;
    });

    it('POST /api/auth/register should create a new user', async () => {
        const uniqueEmail = `staff${Date.now()}@erp.com`;
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test Staff',
                email: uniqueEmail,
                password: 'password123',
                role: 'staff'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('User registered successfully');
    });

    it('GET /api/customers should return list (requires auth)', async () => {
        const res = await request(app)
            .get('/api/customers')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('GET /api/inventory should return products (requires auth)', async () => {
        const res = await request(app)
            .get('/api/inventory')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});
