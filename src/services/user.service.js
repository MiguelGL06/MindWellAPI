const boom = require('@hapi/boom'); // Para manejar errores HTTP
const { models } = require('../libs/sequelize'); // Importa los modelos de Sequelize desde el archivo sequelize en la carpeta libs

class ProfileService {
  constructor() {}

  // Método para crear un nuevo perfil de usuario en la base de datos
  async create(data) {
    try {
      const newProfile = await models.Profile.create(data);
      return newProfile;
    } catch (error) {
      throw boom.badImplementation('Error creating profile', error);
    }
  }

  // Método para buscar todos los perfiles de usuarios en la base de datos
  async find() {
    try {
      const profiles = await models.Profile.findAll();
      return profiles;
    } catch (error) {
      throw boom.badImplementation('Error fetching profiles', error);
    }
  }

  // Método para buscar un perfil de usuario por su ID en la base de datos
  async findOne(id) {
    try {
      const profile = await models.Profile.findByPk(id);
      if (!profile) {
        throw boom.notFound('Profile not found');
      }
      return profile;
    } catch (error) {
      throw boom.badImplementation(`Error fetching profile with id ${id}`, error);
    }
  }

  // Método para actualizar un perfil de usuario en la base de datos
  async update(id, changes) {
    try {
      const profile = await this.findOne(id);
      const updatedProfile = await profile.update(changes);
      return updatedProfile;
    } catch (error) {
      throw boom.badImplementation(`Error updating profile with id ${id}`, error);
    }
  }

  // Método para eliminar un perfil de usuario de la base de datos
  async delete(id) {
    try {
      const profile = await this.findOne(id);
      await profile.destroy();
      return { id };
    } catch (error) {
      throw boom.badImplementation(`Error deleting profile with id ${id}`, error);
    }
  }
}

module.exports = ProfileService;
