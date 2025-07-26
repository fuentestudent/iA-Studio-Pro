const express = require('express');
const router = express.Router();
const llmController = require('../controllers/llmController');

router.post('/process', llmController.processLLMRequest);

module.exports = router;