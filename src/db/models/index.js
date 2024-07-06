const { Sequelize } = require('sequelize');
const { User, UserSchema } = require('./user.model');
const { Forum, ForumSchema } = require('./forums.model');
const { Topic, TopicSchema } = require('./topics.model');
const { Post, PostSchema } = require('./posts.model');
const { Profile, ProfileSchema } = require('./profile.model');


function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Forum.init(ForumSchema, Forum.config(sequelize));
  Topic.init(TopicSchema, Topic.config(sequelize));
  Post.init(PostSchema, Post.config(sequelize));
  Profile.init(ProfileSchema, Profile.config(sequelize));

  User.associate(sequelize.models);
  Forum.associate(sequelize.models);
  Topic.associate(sequelize.models);
  Post.associate(sequelize.models);
  Profile.associate(sequelize.models);
}


module.exports = setupModels;
