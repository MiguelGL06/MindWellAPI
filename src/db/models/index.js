const { Sequelize } = require('sequelize');
const { User, UserSchema } = require('./user.model');
const { Forum, ForumSchema } = require('./forum.model');
const { Topic, TopicSchema } = require('./topic.model');
const { Post, PostSchema } = require('./post.model');

const sequelize = new Sequelize(/* tus configuraciones */);

User.init(UserSchema, User.config(sequelize));
Forum.init(ForumSchema, Forum.config(sequelize));
Topic.init(TopicSchema, Topic.config(sequelize));
Post.init(PostSchema, Post.config(sequelize));

User.associate(sequelize.models);
Forum.associate(sequelize.models);
Topic.associate(sequelize.models);
Post.associate(sequelize.models);

module.exports = sequelize;
