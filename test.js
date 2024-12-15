const request = require('supertest');
const app = require('./index.js');

describe('API Endpoints', () => {
    it('should load the homepage', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('<html');
    });

    it('should fetch all visitors', async () => {
        const res = await request(app).get('/visitors');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should add a visitor', async () => {
        const res = await request(app).post('/visitors').send({
            ip: '192.168.0.1',
            continent_code: 'NA',
            continent_name: 'North America',
            country_code: 'US',
            country_name: 'United States',
            region_code: 'CA',
            region_name: 'California',
            city: 'Los Angeles',
            zip: '90001',
            latitude: 34.0522,
            longitude: -118.2437
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id');
    });

    it('should fetch user IP details', async () => {
        const res = await request(app).get('/userself-ip');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('ip');
    });
});
