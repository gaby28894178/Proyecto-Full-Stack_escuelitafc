const express = require('express');
const cors = require('cors');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const { sequelize, ensureDatabaseExists } = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mapeo de rutas
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

async function startServer() {
  try {
    await ensureDatabaseExists();
    await sequelize.authenticate();
    console.log('Conexión con PostgreSQL validada.');

    // Sincroniza las tablas y interconexiones en la BD
    await sequelize.sync({ alter: true });
    console.log('Tablas y relaciones sincronizadas.');

    app.listen(PORT, () => {
      console.log(`Servidor activo en el puerto ${PORT}`);
      console.log(`Documentación interactiva disponible en: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Error crítico al encender el backend:', error.message);
    process.exit(1);
  }
}

startServer();
