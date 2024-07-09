// Importa las bibliotecas necesarias
const boom = require('@hapi/boom'); // Para manejar errores HTTP
const bcrypt = require('bcryptjs'); // Para el hash de contraseñas
const { Profile } = require('../db/models/profile.model'); // Importa el modelo Profile
const { models, sequelize } = require('./../libs/sequelize'); // Importa los modelos y sequelize desde el archivo sequelize en la carpeta libs

// Define la clase UserService
class UserService {
  constructor() {}

  // Método para crear un nuevo usuario en la base de datos
  async create(data) {
    const trans = await sequelize.transaction();
    try {
      // Primero crea el perfil
      const profileData = {
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        bio: data.bio || '',
        avatarUrl: data.avatarUrl || ''
      };

      const newProfile = await Profile.create(profileData, { transaction: trans });

      // Genera un hash de la contraseña del usuario utilizando bcrypt
      const hash = await bcrypt.hash(data.password, 10);

      // Crea un nuevo usuario en la base de datos con la contraseña hasheada y el ID del perfil asociado
      const newUser = await models.User.create({
        email: data.email,
        password: hash,
        profileId: newProfile.id // Asociar el perfil con el usuario
      }, { transaction: trans });

      // Elimina la contraseña del objeto de usuario para no enviarla en la respuesta
      delete newUser.dataValues.password;

      await trans.commit();
      // Retorna el nuevo usuario creado
      return newUser;

    } catch (error) {
      await trans.rollback();
      throw error; // Lanza el error para que pueda ser manejado por el llamador
    }
  }

  // Método para buscar todos los usuarios en la base de datos
  async find() {
    // Busca todos los usuarios en la base de datos
    const rta = await models.User.findAll();

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
