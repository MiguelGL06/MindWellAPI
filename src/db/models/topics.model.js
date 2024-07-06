// topic.model.js
const { Model, DataTypes, Sequelize } = require('sequelize');

const TOPIC_TABLE = 'topics';

const TopicSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  forumId: {
    field: 'forum_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'forums', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING
  },
  content: {
    allowNull: false,
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

class Topic extends Model {
  static associate(models) {
    this.belongsTo(models.Forum, { as: 'forum' });
    this.belongsTo(models.User, { as: 'user' });
    this.hasMany(models.Post, { as: 'posts', foreignKey: 'topicId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TOPIC_TABLE,
      modelName: 'Topic',
      timestamps: false
    };
  }
}

module.exports = { Topic, TopicSchema, TOPIC_TABLE };
