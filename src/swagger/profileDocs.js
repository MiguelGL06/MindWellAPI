module.exports = {
  '/api/v1/profile': {
    post: {
      tags: ['profile controllers'],
      summary: 'Crear nuevo perfil',
      description: 'Creación de perfil',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                userId: {
                  type: 'string',
                  description: 'ID del usuario asociado al perfil',
                },
                firstName: {
                  type: 'string',
                  description: 'Nombre del usuario',
                },
                lastName: {
                  type: 'string',
                  description: 'Apellido del usuario',
                },
                bio: {
                  type: 'string',
                  description: 'Biografía del usuario',
                },
                avatarUrl: {
                  type: 'string',
                  format: 'uri',
                  description: 'URL de la imagen de avatar',
                },
              },
              example: {
                firstName: 'John',
                lastName: 'Doe',
                bio: 'Biografía del usuario...',
                avatarUrl: 'https://example.com/avatar.jpg',
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Perfil creado exitosamente.',
        },
        400: {
          description: 'Los datos de creación del perfil son incorrectos.',
        },
        500: {
          description: 'Error al crear el perfil.',
        },
      },
    },
  },
  '/api/v1/profile/{id}': {
    get: {
      tags: ['profile controllers'],
      summary: 'Buscar perfil',
      description: 'Busca el perfil por su id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Id del perfil',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Perfil encontrado exitosamente.',
        },
        404: {
          description: 'Perfil no encontrado.',
        },
      },
    },
    patch: {
      tags: ['profile controllers'],
      summary: 'Actualizar perfil',
      description: 'Actualizar perfil',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Id del perfil',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                userId: {
                  type: 'string',
                  description: 'ID del usuario asociado al perfil',
                },
                firstName: {
                  type: 'string',
                  description: 'Nombre del usuario',
                },
                lastName: {
                  type: 'string',
                  description: 'Apellido del usuario',
                },
                bio: {
                  type: 'string',
                  description: 'Biografía del usuario',
                },
                avatarUrl: {
                  type: 'string',
                  format: 'uri',
                  description: 'URL de la imagen de avatar',
                },
              },
              example: {
                firstName: 'John',
                lastName: 'Doe',
                bio: 'Biografía del usuario...',
                avatarUrl: 'https://example.com/avatar.jpg',
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Perfil actualizado exitosamente.',
        },
        400: {
          description: 'Los datos de actualización del perfil son incorrectos.',
        },
        500: {
          description: 'Error al actualizar el perfil.',
        },
      },
    },
    delete: {
      tags: ['profile controllers'],
      summary: 'Borrar perfil',
      description: 'Borra el perfil por su id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Id del perfil',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Perfil eliminado exitosamente.',
        },
        404: {
          description: 'Perfil no encontrado.',
        },
      },
    },
  },
};
