const fs = require('fs');

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
    try {
        const result = await background.save();
        res.status(201).json({
            message: 'Background added to DB',
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateBackground = async (req, res, next) => {
    const backgroundId = req.params.backgroundId;
    let imageUrl = req.body.imageUrl;
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
    try {
        const background = await Background.findById(backgroundId);
        if (!background) {
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
    } catch (err) {
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
        if (!background) {
            const error = new Error('Could not find background.');
            error.statusCode = 404;
            throw error;
        }
        clearImage(background.imageUrl);
        await Background.findByIdAndRemove(backgroundId);
        res.status(200).json({
            message: 'Background deleted.'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postMeditation = async (req, res, next) => {
    let illustrationImageUrl = req.body.illustrationImageUrl;
    const name = req.body.name;
    const description = req.body.description;
    const baseQuote = req.body.baseQuote;
    const colorA = req.body.colorA;
    const colorB = req.body.colorB;
    if (req.file) {
        illustrationImageUrl = req.file.path;
    }
    if (!req.file) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        return next(error);
    }
    const meditation = new Meditation({
        name: name,
        description: description,
        illustrationImageUrl: illustrationImageUrl,
        baseQuote: baseQuote,
        colorA: colorA,
        colorB: colorB
    });
    try {
        const result = await meditation.save();
        res.status(201).json({
            message: 'Meditation added to DB',
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateMeditation = async (req, res, next) => {
    const meditationId = req.params.meditationId;
    let illustrationImageUrl = req.body.illustrationImageUrl;
    const name = req.body.name;
    const description = req.body.description;
    const baseQuote = req.body.baseQuote;
    const colorA = req.body.colorA;
    const colorB = req.body.colorB;
    if (req.file) {
        illustrationImageUrl = req.file.path;
    }
    if (!req.file) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        return next(error);
    }
    try {
        const meditation = await Meditation.findById(meditationId);
        if (!meditation) {
            const error = new Error('Could not find meditation.');
            error.statusCode = 404;
            throw error;
        }
        if (illustrationImageUrl !== meditation.illustrationImageUrl) { //new image was uploaded
            clearImage(meditation.illustrationImageUrl);
        }
        meditation.name = name;
        meditation.description = description;
        meditation.illustrationImageUrl = illustrationImageUrl;
        meditation.baseQuote = baseQuote;
        meditation.colorA = colorA;
        meditation.colorB = colorB;
        const result = await meditation.save();
        res.status(201).json({
            message: 'Meditation updated',
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteMeditation = async (req, res, next) => {
    const meditationId = req.params.meditationId;
    try {
        const meditation = await Meditation.findById(meditationId);
        if (!meditation) {
            const error = new Error('Could not find meditation.');
            error.statusCode = 404;
            throw error;
        }
        clearImage(meditation.illustrationImageUrl);
        await Meditation.findByIdAndRemove(meditationId);
        res.status(200).json({
            message: 'Meditation removed'
        });
    } catch (err) {
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