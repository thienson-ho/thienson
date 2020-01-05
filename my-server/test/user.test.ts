import {expect} from 'chai';
import { app as server } from "../src/index";
const request = require('supertest');

describe('User API tests', () => {
    it('GET /api/users/ returns an array of users', async () => {
        const response = await request(server).get('/api/users/');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an.instanceOf(Array);
    })
});
