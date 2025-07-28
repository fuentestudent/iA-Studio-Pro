const express = require('express');
const router = express.Router();
const { run4DOptimization } = require('../controllers/optimizationController');
const { protect } = require('../middleware/authMiddleware'); // Assuming protect middleware exists

router.post('/4d', protect, run4DOptimization); // Protect this route with authentication

module.exports = router;