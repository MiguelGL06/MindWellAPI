// Importa la clase Client de la biblioteca pg para gestionar la conexión a la base de datos PostgreSQL
const { Client } = require('pg');

// Define una función asíncrona llamada getConection que devuelve una conexión a la base de datos
async function getConection() {
  // Crea una instancia de Client con la configuración de conexión
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'admin',
    password: 'root123',
    database: 'postgres'
  });

  // Establece la conexión con la base de datos
  await client.connect();

  // Devuelve la conexión establecida
  return client;
}

// Exporta la función getConection para que pueda ser utilizada en otros archivos
module.exports = getConection;
