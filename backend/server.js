const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const gatewayRoutes = require('./routes/gatewayRoutes'); // Import gatewayRoutes
const authenticate = require('./middleware/authMiddleware'); // Import authMiddleware

app.use(express.json());

// Use the Gateway routes with authentication
app.use('/api/gateway', authenticate, gatewayRoutes);

app.get('/', (req, res) => {
  res.send('API Gateway para Optimización de Proyectos con IA');
});

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});