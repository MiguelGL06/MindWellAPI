// Importa la clase Strategy desde el módulo passport-local
const { Strategy } = require('passport-local');

// Importa el servicio AuthService desde el archivo auth.service ubicado en services/auth.service
const AuthService = require('./../../../services/auth.service');

// Crea una nueva instancia del servicio AuthService
const service = new AuthService();

// Define una nueva estrategia de autenticación local
const LocalStrategy = new Strategy({
    // Define el campo que se utilizará como nombre de usuario (en este caso, 'email')
    usernameField: 'email',

    // Define el campo que se utilizará como contraseña (en este caso, 'password')
    passwordField: 'password'
  },
  // La función de verificación de la estrategia
  async (email, password, done) => {
    try {
      // Intenta autenticar al usuario utilizando el servicio AuthService
      const user = await service.getUser(email, password);

      // Si se encuentra un usuario correspondiente con el email y la contraseña proporcionados, se pasa como usuario autenticado
      done(null, user);
    } catch (error) {
      // Si ocurre algún error durante el proceso de autenticación, se pasa como error al callback 'done'
      // El segundo argumento 'false' indica que no se ha autenticado ningún usuario
      done(error, false);
    }
  }
);

// Exporta la estrategia de autenticación local para ser utilizada en otras partes de la aplicación
module.exports = LocalStrategy;
