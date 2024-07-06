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
const URI = 'postgresql://admin:vT6ElDfTZ4Lr496AvVpSSgPeBtN35PEA@dpg-cq44pquehbks73b6rin0-a/my_db_6tno'

// Crea una instancia de Sequelize con la URI de conexión y la configuración proporcionada
/*const sequelize = new Sequelize(URI, {
  dialectModule: require('pg'), // Especifica el dialecto de la base de datos como PostgreSQL
  logging: false, // Habilita el registro de consultas SQL
});
setupModels(sequelize);

*/
// Configura los modelos de Sequelize llamando a la función setupModels con la instancia de Sequelize

// Exporta la instancia de Sequelize configurada para que pueda ser utilizada en otros archivos
module.exports = sequelize;
