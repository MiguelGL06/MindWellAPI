module.exports = {
  '/api/v1/forums': {
    post: {
      tags: ['forum controllers'],
      summary: 'Crear nuevo foro',
      description: 'Creación de foro',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  description: 'Titulo del foro',
                },
                description: {
                  type: 'string',
                  description: 'Descripción del foro',
                },
              },
              example: {
                title: 'Foro de tecnología',
                description: 'Un foro para discutir sobre tecnología...',
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Foro creado exitosamente.',
        },
        500: {
          description: 'Error al crear el foro.',
        },
        400: {
          description: 'Los datos de creación del foro son incorrectos.',
        },
      },
    },
    '/api/v1/forums/': {
      get: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ['user controllers'],
        summary: 'Buscar foros',
        description: 'Busca todos los foros',
        responses: {
          404: {
            description: 'foros no encontrados.',
          },
        },
      },
    },

  },
  '/api/v1/forums/{id}': {
    get: {
      tags: ['forum controllers'],
      summary: 'Buscar foro',
      description: 'Busca el foro por su id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Id del foro',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        404: {
          description: 'Foro no encontrado.',
        },
      },
    },
    patch: {
      tags: ['forum controllers'],
      summary: 'Actualizar foro',
      description: 'Actualizar foro',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  description: 'Nombre del foro',
                },
                description: {
                  type: 'string',
                  description: 'Descripción del foro',
                },
              },
              example: {
                title: 'Foro de tecnología',
                description: 'Descripción actualizada del foro...',
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Foro actualizado exitosamente.',
        },
        500: {
          description: 'Error al actualizar el foro.',
        },
        400: {
          description: 'Los datos de actualización del foro son incorrectos.',
        },
      },
    },
    delete: {
      tags: ['forum controllers'],
      summary: 'Borrar foro',
      description: 'Borra el foro por su id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          description: 'Id del foro',
          required: true,
          type: 'string',
        },
      ],
      responses: {
        201: {
          description: 'Foro eliminado exitosamente.',
        },
        404: {
          description: 'Foro no encontrado.',
        },
      },
    },
  },
};
