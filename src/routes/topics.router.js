const express = require('express');
const router = express.Router();
const TopicService = require('../services/topic.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createTopicSchema, updateTopicSchema, getTopicSchema } = require('../schemas/topic.schema');
const boom = require('@hapi/boom');

const service = new TopicService();
// Ruta para obtener todos los temas
router.get('/', async (req, res, next) => {
  try {
    const topics = await service.find();
    res.json(topics);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener un tema por su ID
router.get('/:id',
  validatorHandler(getTopicSchema, 'params'), // Validamos el parámetro de ID utilizando el esquema correspondiente
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const topic = await service.findOne(id);
      res.json(topic);
    } catch (error) {
      next(error);
    }
  }
);

// Ruta para crear un nuevo tema
router.post('/',
  validatorHandler(createTopicSchema, 'body'), // Validamos el cuerpo de la solicitud utilizando el esquema correspondiente
  async (req, res, next) => {
    try {
      const body = req.body;
      const newTopic = await service.create(body);
      res.status(201).json(newTopic);
    } catch (error) {
      next(error);
    }
  }
);

// Ruta para actualizar un tema existente por su ID
router.patch('/:id',
  validatorHandler(getTopicSchema, 'params'), // Validamos el parámetro de ID utilizando el esquema correspondiente
  validatorHandler(updateTopicSchema, 'body'), // Validamos el cuerpo de la solicitud utilizando el esquema correspondiente
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedTopic = await service.update(id, body);
      res.json(updatedTopic);
    } catch (error) {
      next(error);
    }
  }
);

// Ruta para eliminar un tema existente por su ID
router.delete('/:id',
  validatorHandler(getTopicSchema, 'params'), // Validamos el parámetro de ID utilizando el esquema correspondiente
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router; // Exportamos el enrutador para su uso en otras partes de la aplicación
