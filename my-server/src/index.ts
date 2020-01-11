import config from 'config';
import express, { Application } from 'express';
const mongoose = require('mongoose');

const debug = require('debug')('server:debug');
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// export const port = config.get('port');

//Routers
let router = express.Router();
router.get('/', (req, res) => {
    res.json('Sample text');
});
const userRouter = require('./routes/user.route');

app.use('/', router);
app.use('/api/users', userRouter);

mongoose
    .connect('mongodb://localhost:27017/27017', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDB at mongodb://localhost/27017')
    })
    .catch((err: any) => {
        console.log('Failed to connect to MongoDB', err);
        process.exit();
    });

const server = app.listen(config.get('port'),() => {
    debug(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
    console.log(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
});


export default app
// module.exports = app;
// module.exports.port=config.get('port');