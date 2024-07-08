module.exports = {
  '/api/v1/users': {
    post: {
      tags: ['user controllers'],
      summary: 'Crear nuevo usuario',
      description: 'Creacion de usuario',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'Correo electrónico del usuario',
                },
                password: {
                  type: 'string',
                  description: 'Contraseña del usuario',
                },
              },
              example: {
                email: 'john.doe@example.com',
                password: 'secretpassword',
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Usuario creado exitosamente.',
        },
        500: {
          description: 'Error al crear el usuario.',
        },
        400: {
          description: 'Los datos de creación del usuario son incorrectos.',
        },
      },
    },
  },
  '/api/v1/users/{id}': {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ['user controllers'],
      summary: 'Buscar usuario',
      description: 'Busca el usuario por su id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Id del usuario',
          required: true,
          type: 'string',
        }],
      responses: {
        404: {
          description: 'Usuario no encontrado.',
        },
      },
    },
    patch: {
      tags: ['user controllers'],
      summary: 'Actualizar usuario',
      description: 'Actualizar usuario',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'Correo electrónico del usuario',
                },
              },
              example: {
                email: 'john.doe@example.com',
              },
            },
          },
        },
      },
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Id del usuario',
          required: true,
          type: 'string',
        }],
      responses: {
        201: {
          description: 'Usuario actualizado exitosamente.',
        },
        500: {
          description: 'Error al actualizar el usuario.',
        },
        400: {
          description: 'Los datos de actualización del usuario son incorrectos.',
        },
      },
    },
    delete: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ['user controllers'],
      summary: 'Borrar usuario',
      description: 'Borra el usuario por su id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Id del usuario',
          required: true,
          type: 'string',
        }],
      responses: {
        201: {
          description: 'Usuario eliminado exitosamente.',
        },
        404: {
          description: 'Usuario no encontrado.',
        },
      },
    },
  },

  '/api/v1/users/': {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ['user controllers'],
      summary: 'Buscar usuarios',
      description: 'Busca todos los usuarios',
      responses: {
        404: {
          description: 'Usuarios nos encontrados.',
        },
      },
    },
  },

};
