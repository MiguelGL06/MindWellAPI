// Importa las bibliotecas necesarias
const boom = require('@hapi/boom'); // Para manejar errores HTTP
const { models } = require('../libs/sequelize'); // Importa los modelos de Sequelize desde el archivo sequelize en la carpeta libs
const { createForumSchema, updateForumSchema, getForumSchema } = require('./../schemas/forums.schema'); // Importa los esquemas de validación para operaciones CRUD en la entidad de foro (forum)

// Define la clase ForumService
class ForumService {
  constructor() {}

  // Método para crear un nuevo foro en la base de datos
  async create(data) {
    try {
      // Validar los datos de entrada con el esquema Joi
      await createForumSchema.validateAsync(data);

      // Crear un nuevo foro en la base de datos
      const newForum = await models.Forum.create(data);

      // Retorna el nuevo foro creado
      return newForum;
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }

  // Método para buscar todos los foros en la base de datos
  async find() {
    try {
      // Busca todos los foros en la base de datos
      const forums = await models.Forum.findAll();

      // Retorna la lista de foros encontrados
      return forums;
    } catch (error) {
      throw boom.badImplementation(error.message);
    }
  }

  // Método para buscar un foro por su ID en la base de datos
  async findOne(id) {
    try {
      // Validar el ID con el esquema Joi
      await getForumSchema.validateAsync({ id });

      // Buscar un foro por su ID en la base de datos
      const forum = await models.Forum.findByPk(id);

      // Si no se encuentra el foro, lanzar un error
      if (!forum) {
        throw boom.notFound('Forum not found');
      }

      // Retorna el foro encontrado
      return forum;
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  // Método para actualizar un foro en la base de datos
  async update(id, changes) {
    try {
      // Validar los cambios con el esquema Joi
      await updateForumSchema.validateAsync(changes);

      // Buscar el foro por su ID y actualizarlo con los cambios proporcionados
      const [rowsAffected, updatedForum] = await models.Forum.update(changes, {
        where: { id },
        returning: true // Devolver el registro actualizado
      });

      // Si no se actualiza ningún registro, lanzar un error
      if (rowsAffected === 0) {
        throw boom.notFound('Forum not found');
      }

      // Retorna el foro actualizado
      return updatedForum[0];
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  // Método para eliminar un foro de la base de datos
  async delete(id) {
    try {
      // Buscar el foro por su ID
      const forum = await this.findOne(id);

      // Eliminar el foro de la base de datos
      await forum.destroy();

      // Retorna un objeto indicando el ID del foro eliminado
      return { id };
    } catch (error) {
      throw boom.boomify(error);
    }
  }
}

// Exporta la clase ForumService para ser utilizada en otras partes de la aplicación
module.exports = ForumService;
