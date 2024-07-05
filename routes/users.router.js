const express = require('express'); // Importa Express para crear un enrutador
const UserService = require('../services/user.service'); // Importa el servicio de usuario para realizar operaciones CRUD en los usuarios
const validatorHandler = require('../middlewares/validator.handler'); // Importa el middleware para manejar la validación de esquemas
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema'); // Importa los esquemas de validación para los usuarios
// Importa la función checkApiKey desde el archivo auth.handler.js ubicado en la carpeta middlewares
const { checkApiKey } = require('../middlewares/auth.handler');

const router = express.Router(); // Crea un enrutador de Express
const service = new UserService(); // Crea una instancia del servicio de usuario

// Maneja las solicitudes GET para obtener todos los usuarios
router.get('/', async (req, res, next) => {
  try {
    const users = await service.find(); // Obtiene todos los usuarios utilizando el servicio
    res.json(users); // Envía la respuesta con los usuarios en formato JSON
  } catch (error) {
    next(error); // Pasa cualquier error al siguiente middleware de manejo de errores
  }
});

// Maneja las solicitudes GET para obtener un usuario por su ID
router.get('/:id', checkApiKey, //
  validatorHandler(getUserSchema, 'params'), // Valida el parámetro de ID utilizando el esquema correspondiente
  async (req, res, next) => {
    try {
      const { id } = req.params; // Obtiene el ID del parámetro de la solicitud
      const user = await service.findOne(id); // Busca un usuario por su ID utilizando el servicio
      res.json(user); // Envía la respuesta con el usuario encontrado en formato JSON
    } catch (error) {
      next(error); // Pasa cualquier error al siguiente middleware de manejo de errores
    }
  }
);

// Maneja las solicitudes POST para crear un nuevo usuario
router.post('/',
  validatorHandler(createUserSchema, 'body'), // Valida el cuerpo de la solicitud utilizando el esquema correspondiente
  async (req, res, next) => {
    try {
      const body = req.body; // Obtiene los datos del usuario del cuerpo de la solicitud
      const newUser = await service.create(body); // Crea un nuevo usuario utilizando el servicio
      res.status(201).json(newUser); // Envía la respuesta con el nuevo usuario creado en formato JSON y con el código de estado 201 (Creado)
    } catch (error) {
      next(error); // Pasa cualquier error al siguiente middleware de manejo de errores
    }
  }
);

// Maneja las solicitudes PATCH para actualizar un usuario existente por su ID
router.patch('/:id',
  validatorHandler(getUserSchema, 'params'), // Valida el parámetro de ID utilizando el esquema correspondiente
  validatorHandler(updateUserSchema, 'body'), // Valida el cuerpo de la solicitud utilizando el esquema correspondiente
  async (req, res, next) => {
    try {
      const { id } = req.params; // Obtiene el ID del parámetro de la solicitud
      const body = req.body; // Obtiene los datos actualizados del usuario del cuerpo de la solicitud
      const updatedUser = await service.update(id, body); // Actualiza el usuario utilizando el servicio
      res.json(updatedUser); // Envía la respuesta con el usuario actualizado en formato JSON
    } catch (error) {
      next(error); // Pasa cualquier error al siguiente middleware de manejo de errores
    }
  }
);

// Maneja las solicitudes DELETE para eliminar un usuario existente por su ID
router.delete('/:id',
  validatorHandler(getUserSchema, 'params'), // Valida el parámetro de ID utilizando el esquema correspondiente
  async (req, res, next) => {
    try {
      const { id } = req.params; // Obtiene el ID del parámetro de la solicitud
      await service.delete(id); // Elimina el usuario utilizando el servicio
      res.status(201).json({id}); // Envía la respuesta con el ID del usuario eliminado en formato JSON y con el código de estado 201 (Creado)
    } catch (error) {
      next(error); // Pasa cualquier error al siguiente middleware de manejo de errores
    }
  }
);

module.exports = router; // Exporta el enrutador para su uso en otras partes de la aplicación
