const asyncHandler = require('express-async-handler');
const { OpenAI, Anthropic, GoogleAI } = require('../services/ai-providers'); // Importar los proveedores de IA

// @desc    Process LLM request
// @route   POST /api/llm/process
// @access  Private (will add authentication later)
const processLLMRequest = asyncHandler(async (req, res) => {
  const { model, prompt, options } = req.body;

  let result;

  try {
    switch (model) {
      case 'gpt-4':
        result = await OpenAI.optimize(prompt, options);
        break;
      case 'claude-3':
        result = await Anthropic.optimize(prompt, options);
        break;
      case 'gemini-pro':
        result = await GoogleAI.optimize(prompt, options);
        break;
      default:
        res.status(400);
        throw new Error('Modelo de LLM no soportado');
    }

    res.json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    console.error('Error en LLM Gateway:', error);
    res.status(500);
    throw new Error('Error al procesar la solicitud LLM');
  }
});

module.exports = { processLLMRequest };