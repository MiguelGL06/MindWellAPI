const express = require('express'); // Importa Express para crear un enrutador
const ForumService = require('../services/forums.service'); // Importa el servicio de foro para realizar operaciones CRUD en los foros
const validatorHandler = require('../middlewares/validator.handler'); // Importa el middleware para manejar la validación de esquemas
const { createForumSchema, updateForumSchema, getForumSchema } = require('./../schemas/forums.schema'); // Importa los esquemas de validación para los foros
// Importa la función checkApiKey desde el archivo auth.handler.js ubicado en la carpeta middlewares
const { checkApiKey } = require('../middlewares/auth.handler');

const router = express.Router(); // Crea un enrutador de Express
const service = new ForumService(); // Crea una instancia del servicio de foro

// Maneja las solicitudes GET para obtener todos los foros
router.get('/', async (req, res, next) => {
  try {
    const forums = await service.find(); // Obtiene todos los foros utilizando el servicio
    res.json(forums); // Envía la respuesta con los foros en formato JSON
  } catch (error) {
    next(error); // Pasa cualquier error al siguiente middleware de manejo de errores
  }
});

// Maneja las solicitudes GET para obtener un foro por su ID
router.get('/:id', checkApiKey,
  validatorHandler(getForumSchema, 'params'), // Valida el parámetro de ID utilizando el esquema correspondiente
  async (req, res, next) => {
    try {
      const { id } = req.params; // Obtiene el ID del parámetro de la solicitud
      const forum = await service.findOne(id); // Busca un foro por su ID utilizando el servicio
      res.json(forum); // Envía la respuesta con el foro encontrado en formato JSON
    } catch (error) {
      next(error); // Pasa cualquier error al siguiente middleware de manejo de errores
    }
  }
);

// Maneja las solicitudes POST para crear un nuevo foro
router.post('/',
  validatorHandler(createForumSchema, 'body'), // Valida el cuerpo de la solicitud utilizando el esquema correspondiente
  async (req, res, next) => {
    try {
      const body = req.body; // Obtiene los datos del foro del cuerpo de la solicitud
      const newForum = await service.create(body); // Crea un nuevo foro utilizando el servicio
      res.status(201).json(newForum); // Envía la respuesta con el nuevo foro creado en formato JSON y con el código de estado 201 (Creado)
    } catch (error) {
      next(error); // Pasa cualquier error al siguiente middleware de manejo de errores
    }
  }
);

// Maneja las solicitudes PATCH para actualizar un foro existente por su ID
router.patch('/:id', checkApiKey,
  validatorHandler(getForumSchema, 'params'), // Valida el parámetro de ID utilizando el esquema correspondiente
  validatorHandler(updateForumSchema, 'body'), // Valida el cuerpo de la solicitud utilizando el esquema correspondiente
  async (req, res, next) => {
    try {
      const { id } = req.params; // Obtiene el ID del parámetro de la solicitud
      const body = req.body; // Obtiene los datos actualizados del foro del cuerpo de la solicitud
      const updatedForum = await service.update(id, body); // Actualiza el foro utilizando el servicio
      res.json(updatedForum); // Envía la respuesta con el foro actualizado en formato JSON
    } catch (error) {
      next(error); // Pasa cualquier error al siguiente middleware de manejo de errores
    }
  }
);

// Maneja las solicitudes DELETE para eliminar un foro existente por su ID
router.delete('/:id',
  validatorHandler(getForumSchema, 'params'), // Valida el parámetro de ID utilizando el esquema correspondiente
  async (req, res, next) => {
    try {
      const { id } = req.params; // Obtiene el ID del parámetro de la solicitud
      await service.delete(id); // Elimina el foro utilizando el servicio
      res.status(201).json({ id }); // Envía la respuesta con el ID del foro eliminado en formato JSON y con el código de estado 201 (Creado)
    } catch (error) {
      next(error); // Pasa cualquier error al siguiente middleware de manejo de errores
    }
  }
);

module.exports = router; // Exporta el enrutador para su uso en otras partes de la aplicación
