const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const llmRoutes = require('./routes/llmRoutes');
const authRoutes = require('./routes/authRoutes'); // Importar las rutas de autenticación

dotenv.config({ path: './.env' });

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

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

// Middleware para manejar errores (debe ir al final de las rutas)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});