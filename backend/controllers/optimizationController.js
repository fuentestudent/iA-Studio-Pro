const asyncHandler = require('express-async-handler');
const optimizationService = require('../services/optimizationService');

// @desc    Run the 4-D optimization process
// @route   POST /api/optimize/4d
// @access  Private (will add authentication later)
const run4DOptimization = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  const userId = req.user ? req.user._id : 'guest'; // Assuming user is attached to req by auth middleware

  if (!prompt) {
    res.status(400);
    throw new Error('Please provide a prompt for optimization');
  }

  const result = await optimizationService.run4DProcess(prompt, userId);

  res.json({
    status: 'success',
    message: '4-D Optimization process completed',
    data: result,
  });
});

module.exports = { run4DOptimization };