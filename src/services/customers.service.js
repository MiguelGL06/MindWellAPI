// Importa la biblioteca 'boom' para manejar errores HTTP
const boom = require('@hapi/boom');
// Importa los modelos de Sequelize desde el archivo sequelize en la carpeta libs
const { models } = require('../libs/sequelize');
// Importa la biblioteca 'bcrypt' para el hash de contraseñas
const bcrypt = require('bcrypt');

// Define la clase CustomerService
class CustomerService {

  constructor() {}

  // Método para buscar todos los clientes en la base de datos
  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  // Método para buscar un cliente por su ID en la base de datos
  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  // Método para crear un nuevo cliente en la base de datos
  async create(data) {
    // Genera un hash de la contraseña del usuario utilizando bcrypt
    const hash = await bcrypt.hash(data.user.password, 10);
    // Modifica los datos de entrada para incluir la contraseña hasheada
    const newData = {
      ...data,
      user:{
        ...data.user,
        password:  hash
      }
    }
    // Crea un nuevo cliente en la base de datos, incluyendo el usuario asociado
    const newCustomer = await models.Customer.create(newData, {
      include: ['user']
    });
    return newCustomer;
  }

  // Método para actualizar un cliente en la base de datos
  async update(id, changes) {
    // Busca el cliente por su ID
    const model = await this.findOne(id);
    // Actualiza el cliente con los cambios proporcionados
    const rta = await model.update(changes);
    return rta;
  }

  // Método para eliminar un cliente de la base de datos
  async delete(id) {
    // Busca el cliente por su ID
    const model = await this.findOne(id);
    // Elimina el cliente de la base de datos
    await model.destroy();
    // Retorna un objeto indicando el éxito de la operación
    return { rta: true };
  }
}

// Exporta la clase CustomerService para ser utilizada en otras partes de la aplicación
module.exports = CustomerService;
