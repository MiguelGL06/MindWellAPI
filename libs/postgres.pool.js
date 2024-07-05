// Importa la clase Pool de la biblioteca pg para gestionar conexiones a la base de datos PostgreSQL
const { Pool } = require('pg');
// Importa la configuración de la aplicación, que incluye la configuración de la base de datos
const { config } = require('./../config/config');

// Codifica el nombre de usuario y la contraseña para su uso en la URI de conexión
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
// Construye la URI de conexión a la base de datos PostgreSQL
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Crea una instancia de Pool de PostgreSQL con la URI de conexión
const pool = new Pool({ connectionString: URI });

// Exporta la instancia de Pool para que pueda ser utilizada en otros archivos
module.exports = pool;
