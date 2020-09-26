const express = require('express');

const router = express.Router();

const adminController = require('../controllers/administrator');

const isAdmin = require('../middleware/is-admin');

//create a new background image
router.post('/background', isAdmin, adminController.postBackground);

//edit or update a pre-existing background
router.put('/background/:backgroundId', isAdmin, adminController.updateBackground);

//delete background
router.delete('/delete-background/:backgroundId', adminController.deleteBackground);

module.exports = router;