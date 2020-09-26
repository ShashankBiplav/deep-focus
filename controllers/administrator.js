const fs =require('fs');

const path = require('path');

const Background = require('../models/background');

const Meditation = require('../models/meditation');

const Melody = require('../models/melody');

const Quote = require('../models/Quote');

const QuoteCategory = require('../models/QuoteCategory');

exports.postBackground = async (req, res, next) => {
    let imageUrl = req.file.path;
    const blurHashString = req.body.blurHashString;
    const creator = req.body.creator;
    const reference = req.body.reference;
    if (req.file) {
        imageUrl = req.file.path;
    }
    if (!req.file) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        return next(error);
    }
    const background = new Background({
        imageUrl: imageUrl,
        blurHashString: blurHashString,
        creator: creator,
        reference: reference
    });
    try{
        const result = await background.save();
        res.status(201).json({
            message: 'Background added to DB',
            result: result
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateBackground = async (req, res, next) => {
    const backgroundId = req.params.backgroundId;
    let imageUrl = req.file.path;
    const blurHashString = req.body.blurHashString;
    const creator = req.body.creator;
    const reference = req.body.reference;
    if (req.file) {
        imageUrl = req.file.path;
    }
    if (!req.file) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        return next(error);
    }
    try{
        const background = await Background.findById(backgroundId);
        if (!background){
            const error = new Error('Could not find background.');
            error.statusCode = 404;
            throw error;
        }
        if (imageUrl !== background.imageUrl) { //new image was uploaded
            clearImage(background.imageUrl);
        }
        background.imageUrl = imageUrl;
        background.blurHashString = blurHashString;
        background.creator = creator;
        background.reference = reference;
        const result = await background.save();
        res.status(201).json({
            message: 'Background updated',
            result: result
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteBackground = async (req, res, next) => {
    const backgroundId = req.params.backgroundId;
    try {
        const background = await Background.findById(backgroundId);
        if (!background){
            const error = new Error('Could not find background.');
            error.statusCode = 404;
            throw error;
        }
        clearImage(background.imageUrl);
        await Background.findByIdAndRemove(backgroundId);
        res.status(200).json({
            message: 'Background deleted.'
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//helper function to delete image
const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};