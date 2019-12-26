import {expect} from 'chai';
import config = require('config');
import { app as server, port } from "../src/index";

console.log(port)

describe('Server', () => {
    it('tests that server is running current port', async () => {
        expect(port).to.equal(config.get('port'))
    })
});