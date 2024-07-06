// Importa las bibliotecas necesarias
const boom = require('@hapi/boom'); // Para manejar errores HTTP
const { models } = require('./../libs/sequelize'); // Importa los modelos de Sequelize desde el archivo sequelize en la carpeta libs
const { createTopicSchema, updateTopicSchema, getTopicSchema } = require('./../schemas/topic.schema'); // Importa los esquemas de validación para operaciones CRUD en la entidad de tema (topic)

// Define la clase TopicService
class TopicService {
  constructor() {}

  // Método para crear un nuevo tema en la base de datos
  async create(data) {
    try {
      // Validar los datos de entrada con el esquema Joi
      await createTopicSchema.validateAsync(data);

      // Crear un nuevo tema en la base de datos
      const newTopic = await models.Topic.create(data);

      // Retorna el nuevo tema creado
      return newTopic;
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }

  // Método para buscar todos los temas en la base de datos
  async find() {
    try {
      // Busca todos los temas en la base de datos, incluyendo las relaciones 'forum' y 'user'
      const topics = await models.Topic.findAll({
        include: [{ model: models.Forum, as: 'forum' }, { model: models.User, as: 'user' }]
      });

      // Retorna la lista de temas encontrados
      return topics;
    } catch (error) {
      throw boom.badImplementation(error.message);
    }
  }

  // Método para buscar un tema por su ID en la base de datos
  async findOne(id) {
    try {
      // Validar el ID con el esquema Joi
      await getTopicSchema.validateAsync({ id });

      // Buscar un tema por su ID en la base de datos
      const topic = await models.Topic.findByPk(id, {
        include: [{ model: models.Forum, as: 'forum' }, { model: models.User, as: 'user' },{ model: models.Post, as: 'post' }]

      });

      // Si no se encuentra el tema, lanzar un error
      if (!topic) {
        throw boom.notFound('Topic not found');
      }

      // Retorna el tema encontrado
      return topic;
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  // Método para actualizar un tema en la base de datos
  async update(id, changes) {
    try {
      // Validar los cambios con el esquema Joi
      await updateTopicSchema.validateAsync(changes);

      // Buscar el tema por su ID y actualizarlo con los cambios proporcionados
      const [rowsAffected, updatedTopic] = await models.Topic.update(changes, {
        where: { id },
        returning: true // Devolver el registro actualizado
      });

      // Si no se actualiza ningún registro, lanzar un error
      if (rowsAffected === 0) {
        throw boom.notFound('Topic not found');
      }

      // Retorna el tema actualizado
      return updatedTopic[0];
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  // Método para eliminar un tema de la base de datos
  async delete(id) {
    try {
      // Buscar el tema por su ID
      const topic = await this.findOne(id);

      // Eliminar el tema de la base de datos
      await topic.destroy();

      // Retorna un objeto indicando el ID del tema eliminado
      return { id };
    } catch (error) {
      throw boom.boomify(error);
    }
  }
}

// Exporta la clase TopicService para ser utilizada en otras partes de la aplicación
module.exports = TopicService;
