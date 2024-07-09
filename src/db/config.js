// Importa la configuración de la base de datos desde el archivo de configuración
const { config } = require('./../config/config');

// Codifica el nombre de usuario y la contraseña para ser utilizados en la URL de conexión
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

// Construye la URL de conexión a la base de datos PostgreSQL utilizando la configuración y las credenciales codificadas
//const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const URI = 'postgresql://postgres_ilts_user:GTsd4xHKkeX5zxtDJ7yL2Fs0h02OEjo7@dpg-cq4hldmehbks73bbqbag-a/postgres_ilts'

// Exporta un objeto que contiene la configuración de Sequelize para diferentes entornos (desarrollo y producción)
module.exports = {
  // Configuración para el entorno de desarrollo
  development: {
    // URL de conexión a la base de datos
    url: URI,
    // Dialecto de la base de datos (PostgreSQL en este caso)
    dialect: 'postgres',
  },
  // Configuración para el entorno de producción
  production: {
    // URL de conexión a la base de datos
    url: URI,
    // Dialecto de la base de datos (PostgreSQL en este caso)
    dialect: 'postgres',
  },
};
