// profile.model.js
const { Model, DataTypes, Sequelize } = require('sequelize');

const PROFILE_TABLE = 'profile';

const ProfileSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  firstName: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'first_name'
  },
  lastName: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'last_name'
  },
  bio: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  avatarUrl: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'avatar_url'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW
  }
};

class Profile extends Model {
  static associate(models) {
    this.hasOne(models.User, {
      foreignKey: 'profileId', // Aquí indicamos la clave foránea en el modelo User
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROFILE_TABLE,
      modelName: 'Profile', // Nombre del modelo en singular
      timestamps: false
    };
  }
}
module.exports = { PROFILE_TABLE, ProfileSchema, Profile };
