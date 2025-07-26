const express = require('express');
const router = express.Router();
const gatewayController = require('../controllers/gatewayController');

router.post('/llm-process', gatewayController.processLLMRequest);

module.exports = router;