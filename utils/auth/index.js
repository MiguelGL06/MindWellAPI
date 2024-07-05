// Importa la biblioteca 'passport'
const passport = require('passport');

// Importa las estrategias de autenticación local y JWT
const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');

// Configura Passport.js para usar la estrategia de autenticación local
passport.use(LocalStrategy);

// Configura Passport.js para usar la estrategia de autenticación JWT
passport.use(JwtStrategy);
