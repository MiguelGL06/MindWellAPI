const express = require('express'); // Importa Express para crear un enrutador
const CustomerService = require('../services/customers.service'); // Importa el servicio de clientes para realizar operaciones relacionadas con los clientes
const validationHandler = require('../middlewares/validator.handler'); // Importa el middleware para manejar la validación de datos de entrada
const { createCustomerSchema, getCustomerSchema, updateCustomerSchema } = require('../schemas/customer.schema'); // Importa los esquemas de validación para los clientes

const router = express.Router(); // Crea un enrutador de Express
const service = new CustomerService(); // Crea una instancia del servicio de clientes

// Maneja las solicitudes GET para obtener todos los clientes
router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find()); // Obtiene todos los clientes y envía la respuesta
  } catch (error) {
    next(error); // Pasa cualquier error al siguiente middleware de manejo de errores
  }
});

// Maneja las solicitudes POST para crear un nuevo cliente
router.post('/', validationHandler(createCustomerSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body; // Obtiene los datos del cliente del cuerpo de la solicitud
    res.status(201).json(await service.create(body)); // Crea un nuevo cliente y envía la respuesta con el cliente creado
  } catch (error) {
    next(error); // Pasa cualquier error al siguiente middleware de manejo de errores
  }
});

// Maneja las solicitudes PATCH para actualizar un cliente existente
router.patch('/:id', validationHandler(getCustomerSchema, 'params'), validationHandler(updateCustomerSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params; // Obtiene el ID del cliente de los parámetros de la solicitud
    const body = req.body; // Obtiene los datos actualizados del cliente del cuerpo de la solicitud
    res.status(201).json(await service.update(id, body)); // Actualiza el cliente existente y envía la respuesta con el cliente actualizado
  } catch (error) {
    next(error); // Pasa cualquier error al siguiente middleware de manejo de errores
  }
});

// Maneja las solicitudes DELETE para eliminar un cliente existente
router.delete('/:id', validationHandler(getCustomerSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params; // Obtiene el ID del cliente de los parámetros de la solicitud
    res.status(200).json(await service.delete(id)); // Elimina el cliente existente y envía la respuesta con el resultado
  } catch (error) {
    next(error); // Pasa cualquier error al siguiente middleware de manejo de errores
  }
});

module.exports = router; // Exporta el enrutador para su uso en otras partes de la aplicación
