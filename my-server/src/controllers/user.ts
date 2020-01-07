import express from 'express';
const { User } = require('../models/user.model');
export const router = express.Router();

router.get('/users', async(req, res) => {
    try {
        const users = await User.find({}).exec();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});


