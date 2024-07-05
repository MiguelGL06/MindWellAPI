// Importa las clases necesarias de Sequelize
const { Model, DataTypes, Sequelize } = require('sequelize');

// Nombre de la tabla de usuarios en la base de datos
const USER_TABLE = 'users';

// Esquema del modelo de usuario
const UserSchema = {
  // Definición de la columna 'id'
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  // Definición de la columna 'email'
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  // Definición de la columna 'password'
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  // Definición de la columna 'recoveryToken'
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING
  },
  // Definición de la columna 'role'
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  // Definición de la columna 'createdAt'
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'createAt',
    defaultValue: Sequelize.NOW
  }
}

// Definición del modelo de usuario
class User extends Model {
  // Método estático para asociar este modelo con otros modelos
  static associate(models) {
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId'
    });
  }

  // Método estático para configurar el modelo
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

// Exporta el nombre de la tabla, el esquema y el modelo de usuario
module.exports = { USER_TABLE, UserSchema, User }
