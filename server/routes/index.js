const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/', controller.welcome);
router.post('/login', controller.auth.authenticate);
router.post('/register', controller.auth.register);

module.exports = router;
