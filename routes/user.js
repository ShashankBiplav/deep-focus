const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

//get all backgrounds
router.get('/backgrounds', userController.getAllBackgrounds);

//get all meditations
router.get('/meditations', userController.getAllMeditations);

//get all melodies
router.get('/melodies', userController.getAllMelodies);

//get all quotes
router.get('/quotes', userController.getAllQuotes);

//get all backgrounds
router.get('/quoteCategories', userController.getAllQuoteCategories);

//get random backgrounds
router.get('/randomBackgrounds', userController.getRandomBackgrounds);

//get random quotes
router.get('/randomQuotes', userController.getRandomQuotes);

//get a single background
router.get('/background/:backgroundId', userController.getBackground);

//get a single meditation
router.get('/meditation/:meditationId', userController.getMeditation);

//get a single melody
router.get('/melody/:melodyId', userController.getMelody);

//get a single quote
router.get('/quote/:quoteId', userController.getQuote);

//get a single quote
router.get('/quoteCategory/:quoteCategoryId', userController.getWholeQuoteCategory);

module.exports = router;