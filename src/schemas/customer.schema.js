// Importa la biblioteca Joi para la validación de esquemas
const Joi = require('joi');

// Define esquemas de validación para diferentes operaciones CRUD en la entidad de cliente

// Define esquema de validación para obtener un cliente por su ID
const getCustomerSchema = Joi.object({
  id: Joi.number().integer().required(), // El ID debe ser un número entero y obligatorio
});

// Define esquema de validación para crear un nuevo cliente
const createCustomerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(), // El nombre debe ser una cadena de entre 3 y 30 caracteres y obligatorio
  user: Joi.object({ // El objeto de usuario debe contener un correo electrónico y una contraseña
    email: Joi.string().email().required(), // El correo electrónico debe ser una dirección de correo electrónico válida y obligatorio
    password: Joi.string().required() // La contraseña debe ser una cadena y obligatoria
  })
});

// Define esquema de validación para actualizar un cliente existente
const updateCustomerSchema = Joi.object({
  name: Joi.string().min(3).max(30), // El nombre debe ser una cadena de entre 3 y 30 caracteres (opcional)
  userId: Joi.number().integer() // El ID de usuario debe ser un número entero (opcional)
});

// Exporta los esquemas de validación para ser utilizados en otras partes de la aplicación
module.exports = { getCustomerSchema, createCustomerSchema, updateCustomerSchema };
