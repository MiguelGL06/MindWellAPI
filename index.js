// Importa el módulo express, que es un framework web para Node.js
const express = require('express');

const mainDocs = require("./swagger/mainDocs");

const swaggerUi = require("swagger-ui-express");


// Importa el módulo routerAPI desde el archivo routes.js ubicado en la misma carpeta
const routerAPI = require('./routes');

// Importa los manejadores de errores desde el archivo error.handler.js ubicado en la carpeta middlewares
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

// Importa la función checkApiKey desde el archivo auth.handler.js ubicado en la carpeta middlewares
const { checkApiKey } = require('./middlewares/auth.handler');

// Crea una instancia de la aplicación express
const app = express();

// Define el número de puerto en el que se ejecutará el servidor
const port = 3000;

// Agrega un middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(mainDocs, {
          customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css",
          customCss: ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }"
      }
  )
);

// Importa y ejecuta el archivo auth.js ubicado en la carpeta utils
require('./utils/auth');

// Maneja las solicitudes GET en la ruta raíz ("/") con el middleware checkApiKey
app.get('/', checkApiKey ,(req, res) => {
  res.send('Hello World!');
});

// Llama al enrutador definido en routes.js y pasa la instancia de la aplicación express como argumento
routerAPI(app);

// Agrega los middlewares de manejo de errores en el orden especificado
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Inicia el servidor y hace que escuche las solicitudes en el puerto especificado
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
