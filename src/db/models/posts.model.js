// post.model.js
const { Model, DataTypes, Sequelize } = require('sequelize');

const POST_TABLE = 'posts';

const PostSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  topicId: {
    field: 'topic_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'topics', key: 'id' },
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

class Post extends Model {
  static associate(models) {
    this.belongsTo(models.Topic, { as: 'topic' });
    this.belongsTo(models.User, { as: 'user' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: POST_TABLE,
      modelName: 'Post',
      timestamps: false
    };
  }
}

module.exports = { Post, PostSchema, POST_TABLE };
