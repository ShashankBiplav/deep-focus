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

module.exports = router;