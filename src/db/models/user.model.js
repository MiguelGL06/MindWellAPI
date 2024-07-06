// user.model.js
const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  profileId: {
    field: 'profile_id',
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'profile', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'custom'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'createAt',
    defaultValue: Sequelize.NOW
  }
};

class User extends Model {
  static associate(models) {
    this.belongsTo(models.Profile, {
      as: 'profile',
      foreignKey: 'profileId'
    });
    this.hasMany(models.Topic, {
      as: 'topics',
      foreignKey: 'userId'
    });
    this.hasMany(models.Post, {
      as: 'posts',
      foreignKey: 'userId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };
