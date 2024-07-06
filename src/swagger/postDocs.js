module.exports = {
  '/api/v1/posts': {
    post: {
      tags: ['post controllers'],
      summary: 'Crear nueva respuesta',
      description: 'Creación de respuesta',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                topicId: {
                  type: 'string',
                  description: 'ID del tema asociado a la respuesta',
                },
                userId: {
                  type: 'string',
                  description: 'ID del usuario que crea la respuesta',
                },
                content: {
                  type: 'string',
                  description: 'Contenido de la respuesta',
                },
              },
              example: {
                topicId: '1234567890',
                userId: '0987654321',
                content: 'Contenido de la respuesta...',
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Respuesta creada exitosamente.',
        },
        500: {
          description: 'Error al crear la respuesta.',
        },
        400: {
          description: 'Los datos de creación de la respuesta son incorrectos.',
        },
      },
    },
  },
  '/api/v1/posts/{id}': {
    get: {
      tags: ['post controllers'],
      summary: 'Buscar respuesta',
      description: 'Busca la respuesta por su id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Id de la respuesta',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        404: {
          description: 'Respuesta no encontrada.',
        },
      },
    },
    patch: {
      tags: ['post controllers'],
      summary: 'Actualizar respuesta',
      description: 'Actualizar respuesta',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                content: {
                  type: 'string',
                  description: 'Contenido de la respuesta',
                },
              },
              example: {
                content: 'Contenido actualizado de la respuesta...',
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Respuesta actualizada exitosamente.',
        },
        500: {
          description: 'Error al actualizar la respuesta.',
        },
        400: {
          description: 'Los datos de actualización de la respuesta son incorrectos.',
        },
      },
    },
    delete: {
      tags: ['post controllers'],
      summary: 'Borrar respuesta',
      description: 'Borra la respuesta por su id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Id de la respuesta',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        201: {
          description: 'Respuesta eliminada exitosamente.',
        },
        404: {
          description: 'Respuesta no encontrada.',
        },
      },
    },
  },
};
