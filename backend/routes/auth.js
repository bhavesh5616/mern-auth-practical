const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/verify', authController.verify);
router.post('/admin-login', authController.adminLogin);

module.exports = router;