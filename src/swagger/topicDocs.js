module.exports = {
  '/api/v1/topics': {
    post: {
      tags: ['topic controllers'],
      summary: 'Crear nuevo tema',
      description: 'Creación de tema',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                forumId: {
                  type: 'string',
                  description: 'ID del foro asociado al tema',
                },
                userId: {
                  type: 'string',
                  description: 'ID del usuario que crea el tema',
                },
                title: {
                  type: 'string',
                  description: 'Título del tema',
                },
                content: {
                  type: 'string',
                  description: 'Contenido del tema',
                },
              },
              example: {
                forumId: '1234567890',
                userId: '0987654321',
                title: 'Nuevo tema de discusión',
                content: 'Contenido del nuevo tema...',
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Tema creado exitosamente.',
        },
        500: {
          description: 'Error al crear el tema.',
        },
        400: {
          description: 'Los datos de creación del tema son incorrectos.',
        },
      },
    },
  },
  '/api/v1/topics/{id}': {
    get: {
      tags: ['topic controllers'],
      summary: 'Buscar tema',
      description: 'Busca el tema por su id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Id del tema',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        404: {
          description: 'Tema no encontrado.',
        },
      },
    },
    patch: {
      tags: ['topic controllers'],
      summary: 'Actualizar tema',
      description: 'Actualizar tema',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  description: 'Título del tema',
                },
                content: {
                  type: 'string',
                  description: 'Contenido del tema',
                },
              },
              example: {
                title: 'Título actualizado del tema',
                content: 'Contenido actualizado del tema...',
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Tema actualizado exitosamente.',
        },
        500: {
          description: 'Error al actualizar el tema.',
        },
        400: {
          description: 'Los datos de actualización del tema son incorrectos.',
        },
      },
    },
    delete: {
      tags: ['topic controllers'],
      summary: 'Borrar tema',
      description: 'Borra el tema por su id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Id del tema',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        201: {
          description: 'Tema eliminado exitosamente.',
        },
        404: {
          description: 'Tema no encontrado.',
        },
      },
    },
  },
};
