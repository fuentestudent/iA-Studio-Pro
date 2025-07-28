const express = require('express');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/authController');

router.post('/login', authUser);
router.post('/', registerUser);

module.exports = router;