const express = require('express');

const router = express.Router();

const adminController = require('../controllers/administrator');

const isAdmin = require('../middleware/is-admin');

//create a new background image
router.post('/background', isAdmin, adminController.postBackground);

//edit or update a pre-existing background
router.put('/background/:backgroundId', isAdmin, adminController.updateBackground);

//delete background
router.delete('/delete-background/:backgroundId', isAdmin ,adminController.deleteBackground);

//create meditation
router.post('/meditation', isAdmin, adminController.postMeditation);

//edit or update a pre-existing meditation
router.put('/meditation/:meditationId', isAdmin, adminController.updateMeditation);

//delete meditation
router.delete('/delete-meditation/:meditationId', isAdmin, adminController.deleteMeditation);

//create melody
router.post('/melody', isAdmin, adminController.postMelody);

//edit or update a pre-existing melody
router.put('/melody/:melodyId', isAdmin, adminController.updateMelody);

//delete melody
router.delete('/delete-melody/:melodyId', isAdmin, adminController.deleteMelody);

module.exports = router;