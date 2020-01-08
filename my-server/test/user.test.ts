import {expect} from 'chai';
const request = require('supertest');
import { User } from '../src/models/user.model';
const app = require('../src/index');

const SERVER_URL = 'http://localhost:3000';

describe('User API tests', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('GET /api/users/ returns an array of users', async () => {
        const response = await request(SERVER_URL).get('/api/users/');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an.instanceOf(Array);
    });

    describe('GET /', () => {
        it('should return all users', async () => {
            const users = [
                { name: 'test', email: 'test@gmail.com', salt: '12345' },
                { name: 'test2', email: 'test2@gmail.com', salt: 'abcde' }
            ];
            await User.insertMany(users);
            console.log(users);
            const res = await request(SERVER_URL).get('/api/users');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an.instanceOf(Array);
            expect(res.body.length).to.equal(2);
        })
    })
});
