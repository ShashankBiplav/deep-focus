const express = require('express');

const expressValidator = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

//ADMINISTRATOR SIGNUP
router.post('/administrator/signup',[expressValidator.check('name').trim().not().isEmpty(),
    expressValidator.check('email').isEmail().withMessage('Invalid Email').normalizeEmail(),
    expressValidator.check('password').trim().isLength({
        min: 10
    })
], authController.administratorSignup);

//ADMINISTRATOR LOGIN
router.post('/administrator/login', [expressValidator.check('email').isEmail().normalizeEmail()],
    authController.administratorLogin);

module.exports = router;