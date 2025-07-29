const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const llmRoutes = require('./routes/llmRoutes');
const authRoutes = require('./routes/authRoutes'); // Importar las rutas de autenticación

dotenv.config({ path: './.env' });

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Gateway para Optimización de Proyectos con IA');
});

app.use('/api/llm', llmRoutes);
app.use('/api/users', authRoutes);
const projectRoutes = require('./routes/projectRoutes'); // Importar las rutas de proyectos
const optimizationRoutes = require('./routes/optimizationRoutes'); // Importar las rutas de optimización

app.use('/api/projects', projectRoutes); // Usar las rutas de proyectos
app.use('/api/optimize', optimizationRoutes); // Usar las rutas de optimización

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

app.use(notFound);
app.use(errorHandler);

if (require.main === module) {
  connectDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;