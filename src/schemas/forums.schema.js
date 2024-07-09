// Importa la biblioteca Joi para la validación de esquemas
const Joi = require('joi');

// Define esquemas de validación para diferentes operaciones CRUD en la entidad de foro (forum)

// Define un esquema de validación para crear un nuevo foro
const createForumSchema = Joi.object({
  title: Joi.string().required(), // Título del foro (obligatorio)
  description: Joi.string().allow('', null).optional() // Descripción del foro (opcional)
});

// Define un esquema de validación para actualizar un foro existente
const updateForumSchema = Joi.object({
  title: Joi.string(), // Título del foro (opcional)
  description: Joi.string().allow('', null).optional() // Descripción del foro (opcional)
});

// Define un esquema de validación para obtener un foro por su ID
const getForumSchema = Joi.object({
  id: Joi.number().integer().required() // El ID del foro debe ser un número entero y obligatorio
});

// Exporta los esquemas de validación para ser utilizados en otras partes de la aplicación
module.exports = { createForumSchema, updateForumSchema, getForumSchema };
