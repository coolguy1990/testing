const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.get('/', controller.welcome);
router.post('/login', controller.auth.authenticate);
router.post('/register', controller.auth.register);

module.exports = router;
