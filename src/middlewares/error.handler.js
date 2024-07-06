// Importa la clase ValidationError de Sequelize para manejar errores de validación de la base de datos
const { ValidationError } = require('sequelize');
// Importa el paquete boom para generar errores HTTP de manera fácil y consistente
const boom = require('@hapi/boom');

// Middleware para registrar errores en la consola
function logErrors(err, req, res, next) {
  // Imprime el error en la consola
  console.error(err);
  // Pasa al siguiente middleware
  next(err);
}

// Middleware para manejar errores generales
function errorHandler(err, req, res, next) {
  // Envía una respuesta con un código de estado 500 (Internal Server Error) y los detalles del error
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

// Middleware para manejar errores generados por el paquete boom
function boomErrorHandler(err, req, res, next) {
  // Verifica si el error es de tipo boom
  if (err.isBoom) {
    // Si es un error boom, obtiene los detalles del error y los envía como respuesta
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    // Si no es un error boom, pasa al siguiente middleware
    next(err);
  }
}

// Middleware para manejar errores de validación de Sequelize
function ormErrorHandler(err, req, res, next) {
  // Verifica si el error es una instancia de ValidationError de Sequelize
  if (err instanceof ValidationError) {
    // Si es un error de validación de Sequelize, envía una respuesta con un código de estado 409 (Conflict) y los detalles del error
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  }
  // Pasa al siguiente middleware
  next(err);
}

// Exporta todos los middlewares para que puedan ser utilizados en otros archivos
module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
