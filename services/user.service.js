// Importa las bibliotecas necesarias
const boom = require('@hapi/boom'); // Para manejar errores HTTP
const bcrypt = require('bcrypt'); // Para el hash de contraseñas

// Importa los modelos de Sequelize desde el archivo sequelize en la carpeta libs
const { models } = require('./../libs/sequelize');

// Define la clase UserService
class UserService {
  constructor() {}

  // Método para crear un nuevo usuario en la base de datos
  async create(data) {
    // Genera un hash de la contraseña del usuario utilizando bcrypt
    const hash = await bcrypt.hash(data.password, 10);

    // Crea un nuevo usuario en la base de datos con la contraseña hasheada
    const newUser = await models.User.create({
      ...data,
      password: hash
    });

    // Elimina la contraseña del objeto de usuario para no enviarla en la respuesta
    delete newUser.dataValues.password;

    // Retorna el nuevo usuario creado
    return newUser;
  }

  // Método para buscar todos los usuarios en la base de datos
  async find() {
    // Busca todos los usuarios en la base de datos, incluyendo la relación 'customer'
    const rta = await models.User.findAll({
      include: ['customer']
    });

    // Retorna la respuesta de la consulta
    return rta;
  }

  // Método para buscar un usuario por su dirección de correo electrónico en la base de datos
  async findByEmail(email) {
    // Busca un usuario por su dirección de correo electrónico en la base de datos
    const rta = await models.User.findOne({
      where: { email }
    });

    // Retorna el resultado de la consulta
    return rta;
  }

  // Método para buscar un usuario por su ID en la base de datos
  async findOne(id) {
    // Busca un usuario por su ID en la base de datos
    const user = await models.User.findByPk(id);

    // Si no se encuentra el usuario, lanza un error de "not found"
    if (!user) {
      throw boom.notFound('user not found');
    }

    // Retorna el usuario encontrado
    return user;
  }

  // Método para actualizar un usuario en la base de datos
  async update(id, changes) {
    // Busca el usuario por su ID
    const user = await this.findOne(id);

    // Actualiza el usuario con los cambios proporcionados
    const rta = await user.update(changes);

    // Retorna el resultado de la actualización
    return rta;
  }

  // Método para eliminar un usuario de la base de datos
  async delete(id) {
    // Busca el usuario por su ID
    const user = await this.findOne(id);

    // Elimina el usuario de la base de datos
    await user.destroy();

    // Retorna un objeto indicando el ID del usuario eliminado
    return { id };
  }
}

// Exporta la clase UserService para ser utilizada en otras partes de la aplicación
module.exports = UserService;
