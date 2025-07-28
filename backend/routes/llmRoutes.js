const express = require('express');
const router = express.Router();
const { processLLMRequest } = require('../controllers/llmGatewayController'); // Importar el controlador correcto

router.post('/process', processLLMRequest); // La ruta ya está definida, solo aseguro el controlador

module.exports = router;