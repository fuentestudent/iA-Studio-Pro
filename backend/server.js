const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const llmRoutes = require('./routes/llmRoutes'); // Importar las rutas de LLM

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Gateway para Optimización de Proyectos con IA');
});

// Usar las rutas de LLM
app.use('/api/llm', llmRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});