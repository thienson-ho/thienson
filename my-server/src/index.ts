import config from 'config';
import express from 'express';

const debug = require('debug')('server:debug');
export const app = express();
export const port = config.get('port');

const listen = app.listen(config.get('port'),() => {
    debug(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
    console.log(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
})



// module.exports = app;
// module.exports.port=config.get('port');