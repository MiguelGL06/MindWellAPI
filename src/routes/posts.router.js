const express = require('express'); // Importa Express para crear un enrutador
const PostService = require('../services/post.service'); // Importa el servicio de publicación para realizar operaciones CRUD en las publicaciones
const validatorHandler = require('../middlewares/validator.handler'); // Importa el middleware para manejar la validación de esquemas
const { createPostSchema, updatePostSchema, getPostSchema } = require('../schemas/post.schema'); // Importa los esquemas de validación para las publicaciones
// Importa la función checkApiKey desde el archivo auth.handler.js ubicado en la carpeta middlewares
const { checkApiKey } = require('../middlewares/auth.handler');

const router = express.Router(); // Crea un enrutador de Express
const service = new PostService(); // Crea una instancia del servicio de publicación

// Maneja las solicitudes GET para obtener todas las publicaciones
router.get('/', async (req, res, next) => {
  try {
    const posts = await service.find(); // Obtiene todas las publicaciones utilizando el servicio
    res.json(posts); // Envía la respuesta con las publicaciones en formato JSON
  } catch (error) {
    next(error); // Pasa cualquier error al siguiente middleware de manejo de errores
  }
});

// Maneja las solicitudes GET para obtener una publicación por su ID
router.get('/:id',
  validatorHandler(getPostSchema, 'params'), // Valida el parámetro de ID utilizando el esquema correspondiente
  async (req, res, next) => {
    try {
      const { id } = req.params; // Obtiene el ID del parámetro de la solicitud
      const post = await service.findOne(id); // Busca una publicación por su ID utilizando el servicio
      res.json(post); // Envía la respuesta con la publicación encontrada en formato JSON
    } catch (error) {
      next(error); // Pasa cualquier error al siguiente middleware de manejo de errores
    }
  }
);

// Maneja las solicitudes POST para crear una nueva publicación
router.post('/',
  validatorHandler(createPostSchema, 'body'), // Valida el cuerpo de la solicitud utilizando el esquema correspondiente
  async (req, res, next) => {
    try {
      const body = req.body; // Obtiene los datos de la publicación del cuerpo de la solicitud
      const newPost = await service.create(body); // Crea una nueva publicación utilizando el servicio
      res.status(201).json(newPost); // Envía la respuesta con la nueva publicación creada en formato JSON y con el código de estado 201 (Creado)
    } catch (error) {
      next(error); // Pasa cualquier error al siguiente middleware de manejo de errores
    }
  }
);

// Maneja las solicitudes PATCH para actualizar una publicación existente por su ID
router.patch('/:id', checkApiKey,
  validatorHandler(getPostSchema, 'params'), // Valida el parámetro de ID utilizando el esquema correspondiente
  validatorHandler(updatePostSchema, 'body'), // Valida el cuerpo de la solicitud utilizando el esquema correspondiente
  async (req, res, next) => {
    try {
      const { id } = req.params; // Obtiene el ID del parámetro de la solicitud
      const body = req.body; // Obtiene los datos actualizados de la publicación del cuerpo de la solicitud
      const updatedPost = await service.update(id, body); // Actualiza la publicación utilizando el servicio
      res.json(updatedPost); // Envía la respuesta con la publicación actualizada en formato JSON
    } catch (error) {
      next(error); // Pasa cualquier error al siguiente middleware de manejo de errores
    }
  }
);

// Maneja las solicitudes DELETE para eliminar una publicación existente por su ID
router.delete('/:id',
  validatorHandler(getPostSchema, 'params'), // Valida el parámetro de ID utilizando el esquema correspondiente
  async (req, res, next) => {
    try {
      const { id } = req.params; // Obtiene el ID del parámetro de la solicitud
      await service.delete(id); // Elimina la publicación utilizando el servicio
      res.status(201).json({ id }); // Envía la respuesta con el ID de la publicación eliminada en formato JSON y con el código de estado 201 (Creado)
    } catch (error) {
      next(error); // Pasa cualquier error al siguiente middleware de manejo de errores
    }
  }
);

module.exports = router; // Exporta el enrutador para su uso en otras partes de la aplicación
