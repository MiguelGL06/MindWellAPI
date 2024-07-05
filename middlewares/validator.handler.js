// Importa el paquete boom para generar errores HTTP de manera fácil y consistente
const boom = require('@hapi/boom');

// Define una función middleware llamada validatorHandler que toma un esquema de validación Joi y una propiedad de la solicitud como parámetros
function validatorHandler(schema, property) {
  // Retorna una función de middleware que se ejecutará cuando se utilice en una ruta
  return (req, res, next) => {
    // Obtiene los datos de la solicitud utilizando la propiedad especificada (por ejemplo, 'body', 'params', 'query')
    const data = req[property];
    // Valida los datos utilizando el esquema de validación Joi y almacena el resultado en la variable 'error'
    const { error } = schema.validate(data, { abortEarly: false });
    // Verifica si hay errores de validación
    if (error) {
      // Si hay errores de validación, crea un objeto de error Boom con un código de estado 400 (Bad Request) y los detalles del error de validación
      next(boom.badRequest(error));
    }
    // Si no hay errores de validación, pasa al siguiente middleware utilizando 'next()'
    next();
  };
}

// Exporta la función validatorHandler para que pueda ser utilizada en otros archivos
module.exports = validatorHandler;
