import mongoose from 'mongoose';
import {pbkdf2, pbkdf2Sync} from "crypto";
const crypto = require('crypto');

export type UserDocument = mongoose.Document & {
    email: string;
    password: string;
    salt: string;
    passwordResetToken: string;
    passwordResetExpires: Date;

    facebook: string;
    tokens: AuthToken[];

    profile: {
        name: string;
        gender: string;
        location: string;
        birthday: Date;
    };

};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

export interface AuthToken {
    accessToken: string;
    kind: string;
}

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: String,
    salt: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    facebook: String,
    google: String,
    tokens: Array,

    profile: {
        name: String,
        gender: String,
        location: String,
        birthday: Date
    }
}, { timestamps: true });

userSchema.pre("save", function save(next) {
    const user = this as UserDocument;
    if(!user.isModified("password")) { return next(); }
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = 10000;
    var hash = pbkdf2(user.password, salt, iterations, 64, 'sha512', (err, derivedKey) => {
        if (err) throw err;
        console.log(derivedKey.toString('hex'));
        user.password = derivedKey.toString('hex');
        user.salt = salt;
    });
})

userSchema.methods.setPassword = function (password: string) {
    this.salt = crypto.randomBytes(128).toString('base64');
    this.hash = pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.verifyPassword = function (password: string) {
    var hash = pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
}

const User = module.exports = mongoose.model<UserDocument>('User', userSchema);