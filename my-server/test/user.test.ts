import {expect} from 'chai';
const request = require('supertest');
import { User, UserDocument } from '../src/models/user.model';
import doc = Mocha.reporters.doc;
const app = require('../src/index');

const SERVER_URL = 'http://localhost:3000';
const ENDPOINT = '/api/users/';

describe('User API tests', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    // after(async () => {
    //     server.close();
    // })

    describe('GET /', () => {
        it('should return all users', async () => {
            const users = [
                { email: 'test@gmail.com', password: 'test', salt: '12345' },
                { email: 'test2@gmail.com', password: 'test2', salt: 'abcde' }
            ];
            await User.insertMany(users);
            console.log(users);
            const res = await request(SERVER_URL).get('/api/users');
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an.instanceOf(Array);
            expect(res.body.length).to.equal(2);
        })
    })

    describe('GET /:id', () => {
        it('should return a user if a valid id is passed', async () => {
            const user: any = new User({
                email: 'test@gmail.com',
                password: 'test',
                salt: '123abc'
            });
            await user.save((err: any, document: any) => {
                if(err) return console.error(err);
                console.log(document.email + ' saved to collection with ID ' + document._id);
            });
            const res = await request(SERVER_URL).get(ENDPOINT + user._id);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('email', user.email);
        });
    });
});
