import {expect} from 'chai';
import config = require('config');
import listen from "../src/index";

// console.log(app.get('port'))

describe('Server', () => {
    it('Tests that server is running current port', async () => {
        expect(3000).to.equal(config.get('port'))
    })
});