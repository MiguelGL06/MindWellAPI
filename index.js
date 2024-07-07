// Importa los módulos necesarios
const express = require('express');
const mainDocs = require('./src/swagger/mainDocs');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./src/libs/sequelize');
const cors = require('cors');
const routerAPI = require('./src/routes/index');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./src/middlewares/error.handler');
const { checkApiKey } = require('./src/middlewares/auth.handler');

// Crea una instancia de la aplicación express
const app = express();

// Configura CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Cambia esto a la URL de tu front-end
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Métodos permitidos
};
app.use(cors(corsOptions));

// Define el número de puerto en el que se ejecutará el servidor
const port = 3000;

// Agrega un middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Configura Swagger UI para la documentación de la API
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(mainDocs, {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css',
    customCss: '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
  })
);

// Importa y ejecuta el archivo auth.js ubicado en la carpeta utils
require('./src/utils/auth/core');

// Define la ruta raíz
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Configura las rutas de la API
routerAPI(app);

// Agrega los middlewares de manejo de errores en el orden especificado
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Inicia el servidor y hace que escuche las solicitudes en el puerto especificado
app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(`API documentation at http://localhost:${port}/api-docs`);
  try {
    // Ejecuta las migraciones al iniciar la aplicación
    await sequelize.sync({ force: false }); // Cambia a true si deseas forzar la sincronización (eliminar y recrear tablas)
    console.log('Sequelize sync successful.');
  } catch (error) {
    console.error('Sequelize sync error:', error);
  }
});
