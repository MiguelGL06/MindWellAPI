const express = require('express');
const router = express.Router();
const ProfileService = require('../services/profile.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProfileSchema, updateProfileSchema, getProfileSchema } = require('../schemas/profile.schema');
const boom = require('@hapi/boom');

const service = new ProfileService();
// Ruta para obtener todos los perfiles
router.get('/', async (req, res, next) => {
  try {
    const profiles = await service.find();
    res.json(profiles);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener un perfil por su ID
router.get('/:id',
  validatorHandler(getProfileSchema, 'params'), // Validamos el parámetro de ID utilizando el esquema correspondiente
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const profile = await service.findById(id);
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }
);

// Ruta para crear un nuevo perfil
router.post('/',
  validatorHandler(createProfileSchema, 'body'), // Validamos el cuerpo de la solicitud utilizando el esquema correspondiente
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProfile = await service.create(body);
      res.status(201).json(newProfile);
    } catch (error) {
      next(error);
    }
  }
);

// Ruta para actualizar un perfil existente por su ID
router.patch('/:id',
  validatorHandler(getProfileSchema, 'params'), // Validamos el parámetro de ID utilizando el esquema correspondiente
  validatorHandler(updateProfileSchema, 'body'), // Validamos el cuerpo de la solicitud utilizando el esquema correspondiente
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedProfile = await service.update(id, body);
      res.json(updatedProfile);
    } catch (error) {
      next(error);
    }
  }
);

// Ruta para eliminar un perfil existente por su ID
router.delete('/:id',
  validatorHandler(getProfileSchema, 'params'), // Validamos el parámetro de ID utilizando el esquema correspondiente
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
