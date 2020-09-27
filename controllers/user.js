const Background = require('../models/background');

const Meditation = require('../models/meditation');

const Melody = require('../models/melody');

const Quote = require('../models/Quote');

const QuoteCategory = require('../models/QuoteCategory');

exports.getAllBackgrounds = async (req, res, next) => {
    try {
        const totalBackgrounds = await Background.find().countDocuments();
        const backgrounds = await Background.find();
        res.status(200).json({
            message: 'All Backgrounds Fetched Successfully.',
            backgrounds: backgrounds,
            totalItems: totalBackgrounds
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAllMeditations = async (req, res, next) => {
    try {
        const totalMeditations = await Meditation.find().countDocuments();
        const meditations = await Meditation.find();
        res.status(200).json({
            message: 'All Meditations Fetched Successfully.',
            meditations: meditations,
            totalItems: totalMeditations
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAllMelodies = async (req, res, next) => {
    try {
        const totalMelodies = await Melody.find().countDocuments();
        const melodies = await Melody.find();
        res.status(200).json({
            message: 'All Melodies Fetched Successfully.',
            melodies: melodies,
            totalItems: totalMelodies
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAllQuotes = async (req, res, next) => {
    try {
        const totalQuotes = await Quote.find().countDocuments();
        const quotes = await Quote.find();
        res.status(200).json({
            message: 'All Quotes Fetched Successfully.',
            quotes: quotes,
            totalItems: totalQuotes
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAllQuoteCategories = async(req, res, next) => {
    try {
        const totalQuotesCats = await QuoteCategory.find().countDocuments();
        const quoteCategories = await QuoteCategory.find();
        res.status(200).json({
            message: 'All Quote Categories Fetched Successfully.',
            quoteCategories: quoteCategories,
            totalItems: totalQuotesCats
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};