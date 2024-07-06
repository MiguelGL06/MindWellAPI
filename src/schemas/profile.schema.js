// Importa la biblioteca Joi para la validación de esquemas
const Joi = require('joi');

// Define esquemas de validación para diferentes operaciones CRUD en la entidad de perfil

// Define un esquema de validación para crear un nuevo perfil
const createProfileSchema = Joi.object({
  firstName: Joi.string().allow('', null).optional(), // El nombre puede ser una cadena opcional
  lastName: Joi.string().allow('', null).optional(), // El apellido puede ser una cadena opcional
  bio: Joi.string().allow('', null).optional(), // La biografía puede ser una cadena opcional
  avatarUrl: Joi.string().allow('', null).optional(), // La URL del avatar puede ser una cadena opcional
});

// Define un esquema de validación para actualizar un perfil existente
const updateProfileSchema = Joi.object({
  firstName: Joi.string().allow('', null).optional(), // El nombre puede ser una cadena opcional
  lastName: Joi.string().allow('', null).optional(), // El apellido puede ser una cadena opcional
  bio: Joi.string().allow('', null).optional(), // La biografía puede ser una cadena opcional
  avatarUrl: Joi.string().allow('', null).optional(), // La URL del avatar puede ser una cadena opcional
});

// Define un esquema de validación para obtener un perfil por su ID
const getProfileSchema = Joi.object({
  id: Joi.number().integer().required(), // El ID debe ser un número entero y obligatorio
});

// Exporta los esquemas de validación para ser utilizados en otras partes de la aplicación
module.exports = { createProfileSchema, updateProfileSchema, getProfileSchema };
