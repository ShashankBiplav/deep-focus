const express = require('express');

const router = express.Router();

const adminController = require('../controllers/administrator');

const isAdmin = require('../middleware/is-admin');

//create a new background image
router.post('/background', isAdmin, adminController.postBackground);

//create meditation
router.post('/meditation', isAdmin, adminController.postMeditation);

//create melody
router.post('/melody', isAdmin, adminController.postMelody);

//create quote
router.post('/quote', isAdmin, adminController.postQuote);

//create quote category
router.post('/quoteCategory', isAdmin, adminController.postQuoteCategory);

//edit or update a pre-existing background
router.put('/background/:backgroundId', isAdmin, adminController.updateBackground);

//edit or update a pre-existing meditation
router.put('/meditation/:meditationId', isAdmin, adminController.updateMeditation);

//edit or update a pre-existing melody
router.put('/melody/:melodyId', isAdmin, adminController.updateMelody);

//edit or update a pre-existing quote
router.put('/quote/:quoteId', isAdmin, adminController.updateQuote);

//edit or update a pre-existing quote category
router.put('/quoteCategory/:quoteCategoryId', isAdmin, adminController.updateQuoteCategory);

//delete background
router.delete('/delete-background/:backgroundId', isAdmin ,adminController.deleteBackground);

//delete meditation
router.delete('/delete-meditation/:meditationId', isAdmin, adminController.deleteMeditation);

//delete melody
router.delete('/delete-melody/:melodyId', isAdmin, adminController.deleteMelody);

//delete quote
router.delete('/delete-quote/:quoteId', isAdmin, adminController.deleteQuote);

//delete quote category
router.delete('/delete-quoteCategory/:quoteCategoryId', isAdmin, adminController.deleteQuoteCategory);

module.exports = router;