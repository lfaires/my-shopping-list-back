import { expect } from '@jest/globals';
import supertest from 'supertest';
import app from '../src/app.js'
import connection from '../src/database.js';

describe('GET /items', () => {
    it('returns all stored items', async (req, res) =>{
        const body = { text: "Whey protein"}
        
        await supertest(app).post('/items').send(body);
        const result = await supertest(app).get('/items')
        
        expect(result.status).toEqual(200)
    })
})

describe('POST /items', () => {
    it('returns 200 for valid params', async (req, res) =>{
        const body = { text: "Whey protein"}
        
        const result = await supertest(app).post('/items').send(body);
        expect(result.status).toEqual(200)
    })

    it('returns 401 for invalid params', async (req, res) =>{
        const body = { text: ""}
        
        const result = await supertest(app).post('/items').send(body);
        expect(result.status).toEqual(401)
    })
})

beforeEach( async () => {
    await connection.query('DELETE FROM items')  
})
  
afterAll( () => {
    connection.end();
})