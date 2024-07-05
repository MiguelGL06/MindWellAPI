// Importa las clases necesarias de Sequelize
const { Model, DataTypes, Sequelize } = require('sequelize');

// Importa el nombre de la tabla de usuarios desde su respectivo modelo
const { USER_TABLE } = require('./user.model');

// Define el nombre de la tabla de clientes en la base de datos
const CUSTOMER_TABLE = 'customers';

// Esquema del modelo de cliente
const CustomerSchema = {
  // Definición de la columna 'id'
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  // Definición de la columna 'name'
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  // Definición de la columna 'createdAt'
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  // Definición de la columna 'userId' como clave foránea referenciando a la tabla de usuarios
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: { model: USER_TABLE, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};

// Definición del modelo de cliente
class Customer extends Model {
  // Método estático para asociar este modelo con otros modelos
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
  }

  // Método estático para configurar el modelo
  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    };
  }
}

// Exporta el modelo de cliente, el esquema y el nombre de la tabla
module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE };
