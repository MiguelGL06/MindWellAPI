module.exports = {
  '/api/v1/customers': {
    post: {
      tags: ['customer controllers'],
      summary: 'Crear nuevo custom user',
      description: 'Creacion de custom user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Nombre del usuario',
                },
                user: {
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
              },
              example: {
                name: 'John Smith',
                user: {
                  email: 'john.smith@example.com',
                  password: 'secretpassword',
                },
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

  '/api/v1/customers/{id}': {
    get: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ['customer controllers'],
      summary: 'Buscar usuario',
      description: 'Busca el usuario por su id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Id del usuario',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        404: {
          description: 'Usuario no encontrado.',
        },
      },
    },
    patch: {
      tags: ['customer controllers'],
      summary: 'Actualizar usuario',
      description: 'Actualizar usuario',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Nombre del usuario',
                },
                user: {
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
              },
              example: {
                name: 'John Smith',
                user: {
                  email: 'john.smith@example.com',
                  password: 'secretpassword',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Usuario actualizado exitosamente.',
        },
        500: {
          description: 'Error al actualizar el usuario.',
        },
        400: {
          description:
            'Los datos de actualización del usuario son incorrectos.',
        },
      },
    },
    delete: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ['customer controllers'],
      summary: 'Borrar usuario',
      description: 'Borra el usuario por su id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Id del usuario',
          required: true,
          type: 'string',
        },
      ],
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
};
