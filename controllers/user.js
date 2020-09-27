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

exports.getAllQuoteCategories = async (req, res, next) => {
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

exports.getRandomBackgrounds = async (req, res, next) => {
    try {
        const randomBackgrounds = await Background.aggregate([{$sample: {size: 10}}]);
        res.status(200).json({
            message: 'Random Backgrounds fetched Successfully.',
            randomBackground: randomBackgrounds
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getRandomQuotes = async (req, res, next) => {
    try {
        const randomQuotes = await Quote.aggregate([{$sample: {size: 10}}]);
        res.status(200).json({
            message: 'Random Quotes fetched Successfully.',
            randomQuotes: randomQuotes
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getBackground = async (req, res, next) => {
    const backgroundId = req.params.backgroundId;
    try {
        const background = await Background.findById(backgroundId);
        if (!background) {
            const error = new Error('No background with this ID found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Background fetched Successfully.',
            background: background
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getMeditation = async (req, res, next) => {
    const meditationId = req.params.meditationId;
    try {
        const meditation = await Meditation.findById(meditationId).populate('melodies');
        if (!meditation) {
            const error = new Error('No meditation with this ID found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Meditation fetched Successfully.',
            meditation: meditation
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getMelody = async (req, res, next) => {
    const melodyId = req.params.melodyId;
    try {
        const melody = await Melody.findById(melodyId);
        if (!melody) {
            const error = new Error('No melody with this ID found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Melody fetched Successfully.',
            melody: melody
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getQuote = async (req, res, next) => {
    const quoteId = req.params.quoteId;
    try {
        const quote = await Quote.findById(quoteId);
        if (!quote) {
            const error = new Error('No Quote with this ID found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Quote fetched Successfully.',
            quote: quote
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getWholeQuoteCategory = async (req, res, next) => {
    const quoteCatId = req.params.quoteCategoryId;
    try {
        const quoteCategory = await Quote.findById(quoteCatId).populate('quotes');
        if (!quoteCategory) {
            const error = new Error('No Quote Category with this ID found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Quote Category fetched Successfully.',
            quoteCategory: quoteCategory
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getRandomQuotesFromQuoteCategory = async (req, res, next) => {
    // TODO
};