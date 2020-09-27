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

exports.postMelody = async (req, res, next) => {
    const name = req.body.name;
    const artist = req.body.artist;
    const duration = req.body.duration;
    const streamUrl = req.body.streamUrl;
    let albumArtUrl = req.body.image;
    if (req.file) {
        albumArtUrl = req.file.path;
    }
    if (!req.file) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        return next(error);
    }
    const melody = new Melody({
        name: name,
        artist: artist,
        duration: duration,
        streamUrl: streamUrl,
        albumArtUrl: albumArtUrl
    });
    try {
        const result = await melody.save();
        res.status(201).json({
            message: 'melody added successfully',
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateMelody = async (req, res, next) => {
    const melodyId = req.params.melodyId;
    const name = req.body.name;
    const artist = req.body.artist;
    const duration = req.body.duration;
    const streamUrl = req.body.streamUrl;
    let albumArtUrl = req.body.image;
    if (req.file) {
        albumArtUrl = req.file.path;
    }
    if (!req.file) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        return next(error);
    }
    try {
        const melody = await Melody.findById(melodyId);
        if (!melody) {
            const error = new Error('Could not find melody.');
            error.statusCode = 404;
            throw error;
        }
        if (albumArtUrl !== melody.albumArtUrl) {
            clearImage(melody.albumArtUrl);
        }
        melody.name = name;
        melody.artist = artist;
        melody.duration = duration;
        melody.streamUrl = streamUrl;
        melody.albumArtUrl = albumArtUrl;
        const result = await melody.save();
        res.status(201).json({
            message: 'melody updated successfully',
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteMelody = async (req, res, next) => {
    const melodyId = req.params.melodyId;
    try {
        const melody = await Melody.findById(melodyId);
        if (!melody) {
            const error = new Error('Could not find melody.');
            error.statusCode = 404;
            throw error;
        }
        clearImage(melody.albumArtUrl);
        await Melody.findByIdAndRemove(melodyId);
        res.status(200).json({
            message: 'melody removed'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postQuote = async (req, res, next) => {
    const quoteLine = req.body.quoteLine;
    const author = req.body.author;
    const quoteCategoryIds = req.body.quoteCategoryIds;
    const quote = new Quote({
        quoteLine: quoteLine,
        author: author,
        category: quoteCategoryIds
    });
    try {
        const result = await quote.save();

        async function saveIds() {
            for (const id of quoteCategoryIds) {
                const quoteCategory = await QuoteCategory.findById(id);
                quoteCategory.quotes.push(quote);
                await quoteCategory.save();
            }
        }

        await saveIds();
        res.status(201).json({
            message: 'Quote added successfully',
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateQuote = async (req, res, next) => {
    const quoteId = req.params.quoteId;
    const quoteLine = req.body.quoteLine;
    const author = req.body.author;
    const quoteCategoryIds = req.body.quoteCategoryIds;
    try {
        const quote = await Quote.findById(quoteId);
        if (!quote) {
            const error = new Error('Could not find quote.');
            error.statusCode = 404;
            throw error;
        }
        for (const id of quote.category) {
            const category = await QuoteCategory.findById(id);
            category.quotes.pull(quote);
            await category.save();
        }
        quote.quoteLine = quoteLine;
        quote.author = author;
        quote.category = quoteCategoryIds;
        const result = await quote.save();

        async function saveIds() {
            for (const id of quoteCategoryIds) {
                const quoteCategory = await QuoteCategory.findById(id);
                quoteCategory.quotes.push(quote);
                await quoteCategory.save();
            }
        }

        await saveIds();
        res.status(201).json({
            message: 'Quote updated successfully',
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteQuote = async (req, res, next) => {
    const quoteId = req.params.quoteId;
    try {
        const quote = await Quote.findById(quoteId);
        if (!quote) {
            const error = new Error('Could not find quote.');
            error.statusCode = 404;
            throw error;
        }
        await Quote.findByIdAndRemove(quoteId);
        for (const id of quote.category) {
            const category = await QuoteCategory.findById(id);
            category.quotes.pull(quote);
            await category.save();
        }
        res.status(200).json({
            message: 'Quote removed'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.postQuoteCategory = async (req, res, next) => {
    const name = req.body.name;
    const quoteCategory = new QuoteCategory({
        name: name
    });
    try {
        const result = await quoteCategory.save();
        res.status(201).json({
            message: 'Quote Category added successfully',
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateQuoteCategory = async (req, res, next) => {
    const quoteCatId = req.params.quoteCategoryId;
    const name = req.body.name;
    const quotesIds = req.body.quotesIds;
    try {
        const quoteCategory = await QuoteCategory.findById(quoteCatId);
        if (!quoteCategory) {
            const error = new Error('Could not find Quote Category.');
            error.statusCode = 404;
            throw error;
        }
        for (const id of quoteCategory.quotes) {
            const quote = await Quote.findById(id);
            quote.category.pull(quoteCategory);
            await quote.save();
        }
        quoteCategory.name = name;
        quoteCategory.quotes = quotesIds;
        const result = await quoteCategory.save();

        async function saveIds() {
            for (const id of quotesIds) {
                const quote = await Quote.findById(id);
                quote.category.push(quoteCategory);
                await quote.save();
            }
        }

        await saveIds();
        res.status(201).json({
            message: 'Quote Category updated successfully',
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteQuoteCategory = async (req, res, next) => {
    const quoteCatId = req.params.quoteCategoryId;
    try {
        const quoteCategory = await QuoteCategory.findById(quoteCatId);
        if (!quoteCategory) {
            const error = new Error('Could not find quote category.');
            error.statusCode = 404;
            throw error;
        }
        await QuoteCategory.findByIdAndRemove(quoteCatId);
        for (const id of quoteCategory.quotes) {
            const quote = await Quote.findById(id);
            quote.category.pull(quoteCategory);
            await quote.save();
        }
        res.status(200).json({
            message: 'Quote Category removed'
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