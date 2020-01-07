import { Request, Response } from 'express';
import { Document } from 'mongoose';
const mongoose = require('mongoose');
const { User } = require('../models/user.model');

module.exports.getAllUsers = async (req: Request, res: Response) => {
    let users = await User.find({});
    return res.send(users);
};

module.exports.getUser = async (req: Request, res: Response) => {
    let userId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send('Invalid object id');
    }
    let user = await User.findById(userId);
    if(!user) {
        return res.status(404).send('User not found');
    }
    return res.send(user);
};

module.exports.createUser = async (req: Request, res: Response) => {
    console.log(req.body);
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        salt: req.body.salt
    });
    await user.save();
    return res.send(user);
};

module.exports.updateUser = async (req: Request, res: Response) => {
    let userId = req.params.id;
    User.findOneAndUpdate(userId, req.body, { new: true })
        .then((user: Document) => {
            return res.send(user);
        })
        .catch((err: string) => {
            return res.status(500).send(err);
        });
};

module.exports.deleteUser = async (req: Request, res: Response) => {
    let userId = req.params.id;
    await User.findByIdAndDelete(userId);
    return res.send('User deleted');
};

