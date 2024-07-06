// Importa las bibliotecas necesarias
const boom = require('@hapi/boom'); // Para manejar errores HTTP
const { models } = require('./../libs/sequelize'); // Importa los modelos de Sequelize desde el archivo sequelize en la carpeta libs
const { createPostSchema, updatePostSchema, getPostSchema } = require('./../schemas/post.schema'); // Importa los esquemas de validación para operaciones CRUD en la entidad de publicación (post)

// Define la clase PostService
class PostService {
  constructor() {}

  // Método para crear una nueva publicación en la base de datos
  async create(data) {
    try {
      // Validar los datos de entrada con el esquema Joi
      await createPostSchema.validateAsync(data);

      // Crear una nueva publicación en la base de datos
      const newPost = await models.Post.create(data);

      // Retorna la nueva publicación creada
      return newPost;
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }

  // Método para buscar todas las publicaciones en la base de datos
  async find() {
    try {
      // Busca todas las publicaciones en la base de datos, incluyendo las relaciones 'topic' y 'user'
      const posts = await models.Post.findAll({
        include: [{ model: models.Topic, as: 'topic' }, { model: models.User, as: 'user' }]
      });

      // Retorna la lista de publicaciones encontradas
      return posts;
    } catch (error) {
      throw boom.badImplementation(error.message);
    }
  }

  // Método para buscar una publicación por su ID en la base de datos
  async findOne(id) {
    try {
      // Validar el ID con el esquema Joi
      await getPostSchema.validateAsync({ id });

      // Buscar una publicación por su ID en la base de datos
      const post = await models.Post.findByPk(id, {
        include: [{ model: models.Topic, as: 'topic' }, { model: models.User, as: 'user' }]
      });

      // Si no se encuentra la publicación, lanzar un error
      if (!post) {
        throw boom.notFound('Post not found');
      }

      // Retorna la publicación encontrada
      return post;
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  // Método para actualizar una publicación en la base de datos
  async update(id, changes) {
    try {
      // Validar los cambios con el esquema Joi
      await updatePostSchema.validateAsync(changes);

      // Buscar la publicación por su ID y actualizarla con los cambios proporcionados
      const [rowsAffected, updatedPost] = await models.Post.update(changes, {
        where: { id },
        returning: true // Devolver el registro actualizado
      });

      // Si no se actualiza ningún registro, lanzar un error
      if (rowsAffected === 0) {
        throw boom.notFound('Post not found');
      }

      // Retorna la publicación actualizada
      return updatedPost[0];
    } catch (error) {
      throw boom.boomify(error);
    }
  }

  // Método para eliminar una publicación de la base de datos
  async delete(id) {
    try {
      // Buscar la publicación por su ID
      const post = await this.findOne(id);

      // Eliminar la publicación de la base de datos
      await post.destroy();

      // Retorna un objeto indicando el ID de la publicación eliminada
      return { id };
    } catch (error) {
      throw boom.boomify(error);
    }
  }
}

// Exporta la clase PostService para ser utilizada en otras partes de la aplicación
module.exports = PostService;
