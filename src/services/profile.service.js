// Importa las bibliotecas necesarias
const Joi = require('joi'); // Para la validación de esquemas
const boom = require('@hapi/boom'); // Para manejar errores HTTP

// Importa los modelos de Sequelize desde el archivo sequelize en la carpeta libs
const { models } = require('./../libs/sequelize');

// Importa los esquemas de validación
const { createProfileSchema, updateProfileSchema, getProfileSchema } = require('./../schemas/profile.schema');

// Define la clase ProfileService
class ProfileService {
  constructor() {}

  // Método para crear un nuevo perfil en la base de datos
  async create(data) {
    // Valida los datos de entrada utilizando Joi
    await createProfileSchema.validateAsync(data);

    // Crea el nuevo perfil en la base de datos
    const newProfile = await models.Profile.create(data);

    // Retorna el nuevo perfil creado
    return newProfile;
  }

  // Método para buscar todos los perfiles en la base de datos
  async find() {
    // Busca todos los perfiles en la base de datos
    const profiles = await models.Profile.findAll();

    // Retorna la respuesta de la consulta
    return profiles;
  }

  // Método para buscar un perfil por su ID en la base de datos
  async findOne(id) {
    // Valida el ID utilizando Joi
    await getProfileSchema.validateAsync({ id });

    // Busca el perfil en la base de datos por su ID
    const profile = await models.Profile.findByPk(id);

    // Si no se encuentra el perfil, lanza un error de "not found"
    if (!profile) {
      throw boom.notFound('Profile not found');
    }

    // Retorna el perfil encontrado
    return profile;
  }

  // Método para actualizar un perfil en la base de datos
  async update(id, data) {
    // Valida los datos de entrada utilizando Joi
    await updateProfileSchema.validateAsync(data);

    // Busca el perfil en la base de datos por su ID
    const profile = await this.findOne(id);

    // Actualiza el perfil con los datos proporcionados
    const updatedProfile = await profile.update(data);

    // Retorna el perfil actualizado
    return updatedProfile;
  }

  // Método para eliminar un perfil de la base de datos
  async delete(id) {
    // Busca el perfil en la base de datos por su ID
    const profile = await this.findOne(id);

    // Elimina el perfil de la base de datos
    await profile.destroy();

    // Retorna un objeto indicando el ID del perfil eliminado
    return { id };
  }
}

// Exporta la clase ProfileService para ser utilizada en otras partes de la aplicación
module.exports = ProfileService;
