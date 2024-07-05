// Importa las clases Strategy y ExtractJwt desde el módulo passport-jwt
const { Strategy, ExtractJwt } = require('passport-jwt');

// Importa la configuración del módulo config ubicado en ../../../config/config
const { config } = require('../../../config/config');

// Define las opciones para la estrategia de autenticación
const options = {
  // Indica a Passport cómo extraer el token JWT de la solicitud
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

  // Clave secreta utilizada para verificar la firma del token JWT
  secretOrKey: config.jwtSecret
};

// Crea una nueva instancia de la estrategia de autenticación JWT
const JwtStrategy = new Strategy(options, (payload, done) => {
  // La función callback se llama cuando se autentica y decodifica correctamente el token JWT
  // Aquí, simplemente se pasa el payload decodificado como argumento del callback 'done'

  // El primer argumento de 'done' es un error (si lo hay). En este caso, no hay error, por lo que se pasa 'null'.
  // El segundo argumento es el usuario autenticado (o en este caso, el payload del token). Se pasa 'payload'.
  return done(null, payload);
});

// Exporta la estrategia de autenticación JWT para ser utilizada en otras partes de la aplicación
module.exports = JwtStrategy;
