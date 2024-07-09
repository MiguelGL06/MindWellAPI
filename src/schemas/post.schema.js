// Importa la biblioteca Joi para la validación de esquemas
const Joi = require('joi');

// Define esquemas de validación para diferentes operaciones CRUD en la entidad de publicación (post)

// Define un esquema de validación para crear una nueva publicación
const createPostSchema = Joi.object({
  topicId: Joi.number().integer().required(), // ID del tema al que pertenece la publicación (obligatorio)
  userId: Joi.number().integer().required(), // ID del usuario que crea la publicación (obligatorio)
  content: Joi.string().required() // Contenido de la publicación (obligatorio)
});

// Define un esquema de validación para actualizar una publicación existente
const updatePostSchema = Joi.object({
  topicId: Joi.number().integer(), // ID del tema al que pertenece la publicación (opcional)
  userId: Joi.number().integer(), // ID del usuario que crea la publicación (opcional)
  content: Joi.string() // Contenido de la publicación (opcional)
});

// Define un esquema de validación para obtener una publicación por su ID
const getPostSchema = Joi.object({
  id: Joi.number().integer().required() // El ID de la publicación debe ser un número entero y obligatorio
});

// Exporta los esquemas de validación para ser utilizados en otras partes de la aplicación
module.exports = { createPostSchema, updatePostSchema, getPostSchema };
