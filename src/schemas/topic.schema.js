// Importa la biblioteca Joi para la validación de esquemas
const Joi = require('joi');

// Define esquemas de validación para diferentes operaciones CRUD en la entidad de tema (topic)

// Define un esquema de validación para crear un nuevo tema
const createTopicSchema = Joi.object({
  forumId: Joi.number().integer().required(), // ID del foro al que pertenece el tema (obligatorio)
  userId: Joi.number().integer().required(), // ID del usuario que crea el tema (obligatorio)
  title: Joi.string().required(), // Título del tema (obligatorio)
  content: Joi.string().required() // Contenido del tema (obligatorio)
});

// Define un esquema de validación para actualizar un tema existente
const updateTopicSchema = Joi.object({
  forumId: Joi.number().integer(), // ID del foro al que pertenece el tema (opcional)
  userId: Joi.number().integer(), // ID del usuario que crea el tema (opcional)
  title: Joi.string(), // Título del tema (opcional)
  content: Joi.string() // Contenido del tema (opcional)
});

// Define un esquema de validación para obtener un tema por su ID
const getTopicSchema = Joi.object({
  id: Joi.number().integer().required() // El ID del tema debe ser un número entero y obligatorio
});

// Exporta los esquemas de validación para ser utilizados en otras partes de la aplicación
module.exports = { createTopicSchema, updateTopicSchema, getTopicSchema };
