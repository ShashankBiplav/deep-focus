const expressValidator = require('express-validator');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const Administrator = require('../models/administrator');

exports.administratorSignup = async (req, res, next) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation Failed');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const preExistingAdmin = await Administrator.findOne({email: email});
    if (preExistingAdmin) {
        const error = new Error('Admin with this email already exists');
        error.statusCode = 422;
        return next(error);
    }
    try {
        const hashedPwd = await bcrypt.hash(password, 12);
        const admin = new Administrator({
            email: email,
            password: hashedPwd,
            name: name
        });
        const result = await admin.save();
        res.status(201).json({
            message: 'Admin Created',
            userId: result._id
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.administratorLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedAdmin;
    try {
        const admin = await Administrator.findOne({email: email});
        if (!admin) {
            const error = new Error('Admin with this email doesn\'t exist');
            error.statusCode = 401;
            throw error;
        }
        loadedAdmin = admin;
        const isPwdEqual = await bcrypt.compare(password, admin.password);
        if (!isPwdEqual) {
            const error = new Error('Wrong Password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: loadedAdmin.email,
            userId: loadedAdmin._id.toString()
        }, 'yoursuperdupersecretkeythatisknownonlytoyouandtheserver', {
            expiresIn: '24h'
        });
        res.status(200).json({
            token: token,
            userId: loadedAdmin._id.toString()
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
