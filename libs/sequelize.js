// Importa la clase Sequelize de la biblioteca Sequelize
const { Sequelize } = require('sequelize');
// Importa la configuración de la aplicación, que incluye la configuración de la base de datos
const { config } = require('./../config/config');
// Importa la función setupModels para configurar los modelos de Sequelize
const setupModels = require('./../db/models/index');

// Codifica el nombre de usuario y la contraseña para su uso en la URI de conexión
const USER =  encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
// Construye la URI de conexión a la base de datos PostgreSQL
//const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const URI = 'postgres://default:WleRLy01zZci@ep-lucky-smoke-a4o405k1-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require'

// Crea una instancia de Sequelize con la URI de conexión y la configuración proporcionada
const sequelize = new Sequelize(URI, {
  dialect: 'postgres', // Especifica el dialecto de la base de datos como PostgreSQL
  logging: true, // Habilita el registro de consultas SQL
});

// Configura los modelos de Sequelize llamando a la función setupModels con la instancia de Sequelize
setupModels(sequelize);

// Exporta la instancia de Sequelize configurada para que pueda ser utilizada en otros archivos
module.exports = sequelize;
