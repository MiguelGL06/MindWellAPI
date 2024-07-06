// forum.model.js
const { Model, DataTypes, Sequelize } = require('sequelize');

const FORUM_TABLE = 'forums';

const ForumSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: true,
    type: DataTypes.TEXT
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

class Forum extends Model {
  static associate(models) {
    this.hasMany(models.Topic, {
      as: 'topics',
      foreignKey: 'forumId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FORUM_TABLE,
      modelName: 'Forum',
      timestamps: false
    };
  }
}

module.exports = { Forum, ForumSchema, FORUM_TABLE };
