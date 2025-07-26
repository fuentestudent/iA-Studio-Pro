const express = require('express');
const router = express.Router();
const gatewayController = require('../controllers/gatewayController');

router.post('/chatgpt', gatewayController.chatgpt);
router.post('/claude', gatewayController.claude);
router.post('/gemini', gatewayController.gemini);

module.exports = router;