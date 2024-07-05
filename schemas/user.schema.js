// Importa la biblioteca Joi para la validación de esquemas
const Joi = require('joi');

// Define esquemas de validación para diferentes operaciones CRUD en la entidad de usuario

// Define un esquema de validación para crear un nuevo usuario
const createUserSchema = Joi.object({
  email: Joi.string().email().required(), // El correo electrónico debe ser una cadena válida y obligatoria
  password: Joi.string().min(8).required(), // La contraseña debe ser una cadena de al menos 8 caracteres y obligatoria
});

// Define un esquema de validación para actualizar un usuario existente
const updateUserSchema = Joi.object({
  email: Joi.string().email(), // El correo electrónico debe ser una cadena válida (opcional)
});

// Define un esquema de validación para obtener un usuario por su ID
const getUserSchema = Joi.object({
  id: Joi.number().integer().required(), // El ID debe ser un número entero y obligatorio
});

// Exporta los esquemas de validación para ser utilizados en otras partes de la aplicación
module.exports = { createUserSchema, updateUserSchema, getUserSchema };
