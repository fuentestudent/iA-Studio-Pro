const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const llmRoutes = require('./routes/llmRoutes'); // Import llmRoutes

app.use(express.json());

// Use the LLM routes
app.use('/api/llm', llmRoutes);

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