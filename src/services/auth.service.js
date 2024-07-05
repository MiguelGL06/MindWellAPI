// Importa las bibliotecas necesarias
const boom = require('@hapi/boom'); // Para manejar errores HTTP
const bcrypt = require('bcrypt'); // Para el hash de contraseñas
const jwt = require('jsonwebtoken'); // Para generar y verificar tokens JWT
const nodemailer = require('nodemailer'); // Para enviar correos electrónicos

// Importa la configuración de la aplicación y el servicio de usuario
const { config } = require('./../config/config');
const UserService = require('./user.service');
const service = new UserService();

// Define la clase AuthService
class AuthService {

  // Método para autenticar un usuario
  async getUser(email, password) {
    // Busca al usuario por su email en la base de datos
    const user = await service.findByEmail(email);

    // Si no se encuentra al usuario, lanza un error de "unauthorized" (no autorizado)
    if (!user) {
      throw boom.unauthorized();
    }

    // Compara la contraseña proporcionada con la contraseña almacenada del usuario
    const isMatch = await bcrypt.compare(password, user.password);

    // Si las contraseñas no coinciden, lanza un error de "unauthorized"
    if (!isMatch) {
      throw boom.unauthorized();
    }

    // Elimina la contraseña del objeto usuario para no enviarla en la respuesta
    delete user.dataValues.password;

    // Retorna el usuario autenticado
    return user;
  }

  // Método para firmar un token JWT con los datos del usuario
  signToken(user) {
    // Define el payload del token con el ID del usuario y su rol
    const payload = {
      sub: user.id,
      role: user.role
    };

    // Genera el token JWT utilizando el payload y la clave secreta de la aplicación
    const token = jwt.sign(payload, config.jwtSecret);

    // Retorna tanto el usuario como el token JWT
    return {
      user,
      token
    };
  }

  // Método para enviar un correo electrónico de recuperación de contraseña
  async sendRecovery(email) {
    // Busca al usuario por su email en la base de datos
    const user = await service.findByEmail(email);
    // Si no se encuentra al usuario, lanza un error de "unauthorized"
    if (!user) {
      throw boom.unauthorized();
    }
    // Crea un payload con el ID del usuario
    const payload = { sub: user.id };
    // Genera un token JWT de recuperación de contraseña válido por 15 minutos
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    // Construye el enlace de recuperación de contraseña
    const link = `http://myfrontend.com/recovery?token=${token}`;
    // Actualiza el token de recuperación de contraseña del usuario en la base de datos
    await service.update(user.id, {recoveryToken: token});
    // Configura los detalles del correo electrónico
    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: "Email para recuperar contraseña",
      html: `<b>Ingresa a este link => ${link}</b>`,
    };

    // Envía el correo electrónico de recuperación de contraseña
    const rta = await this.sendMail(mail);

    // Retorna la respuesta del envío del correo electrónico
    return rta;
  }

  // Método para cambiar la contraseña del usuario utilizando un token de recuperación de contraseña
  async changePassword(token, newPassword) {
    try {
      // Verifica el token de recuperación de contraseña y obtiene el ID de usuario del payload
      const payload = jwt.verify(token, config.jwtSecret);

      // Busca al usuario por su ID en la base de datos
      const user = await service.findOne(payload.sub);

      // Si el token de recuperación de contraseña almacenado en el usuario no coincide con el token proporcionado, lanza un error de "unauthorized"
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }

      // Genera un hash de la nueva contraseña
      const hash = await bcrypt.hash(newPassword, 10);

      // Actualiza el token de recuperación de contraseña del usuario y su contraseña en la base de datos
      await service.update(user.id, {recoveryToken: null, password: hash});

      // Retorna un mensaje indicando que la contraseña ha sido cambiada exitosamente
      return { message: 'password changed' };
    } catch (error) {
      // Si ocurre algún error durante el proceso, lanza un error de "unauthorized"
      throw boom.unauthorized();
    }
  }

  // Método para enviar un correo electrónico utilizando el servicio de nodemailer
  async sendMail(infoMail) {
    // Configura el transportador de nodemailer con los detalles de la cuenta SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
      }
    });

    // Envía el correo electrónico utilizando el transportador configurado
    await transporter.sendMail(infoMail);

    // Retorna un mensaje indicando que el correo electrónico ha sido enviado exitosamente
    return { message: 'mail sent' };
  }
}

// Exporta la clase AuthService para ser utilizada en otras partes de la aplicación
module.exports = AuthService;
