module.exports = {
  '/api/v1/auth/login': {
    post: {
      tags: ['Auth controllers'],
      summary: 'Iniciar Sesión',
      description: 'Inicio de sesión',
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
          description: 'Inicio de sesión exitoso.',
        },
        500: {
          description: 'Error al iniciar sesión.',
        },
        400: {
          description: 'Los datos de inicio de sesión son incorrectos.',
        },
      },
    },
  },
  '/api/v1/auth/change-password': {
    post: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ['Auth controllers'],
      summary: 'Cambiar Contraseña de usuario.',
      description: 'Cambia la contraseña del usuario',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type:'string',
                  description: 'Token de recuperación de contraseña',
                },
                newPassword: {
                  type: 'string',
                  description: 'Nueva contraseña',
                },
              },
              example: {
                token: 'abc123',
                newPassword: 'secretpassword',
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Contraseña cambiada exitosamente.',
        },
        500: {
          description: 'Error al cambiar contraseña.',
        },
        400: {
          description: 'Los datos ingresados son incorrectos.',
        },
      },
    },
  },
  '/api/v1/auth/recovery': {
    post: {
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: ['Auth controllers'],
      summary: 'Crear token de recuperación de contraseña.',
      description: 'Generar token de recuperación de contraseña',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  description: 'correo del usuario',
                },
              },
              example: {
                email: 'john.doe@example.com',
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Token enviado exitosamente.',
        },
        500: {
          description: 'Error en el servidor.',
        },
        400: {
          description: 'Los datos ingresados son incorrectos.',
        },
      },
    },
  },
};
