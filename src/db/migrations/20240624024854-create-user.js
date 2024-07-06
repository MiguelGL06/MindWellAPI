'use strict';

const { UserSchema, USER_TABLE } = require('./../models/user.model');
const { ProfileSchema, PROFILE_TABLE } = require('./../models/profile.model');
const { ForumSchema, FORUM_TABLE } = require('./../models/forum.model');
const { TopicSchema, TOPIC_TABLE } = require('./../models/topic.model');
const { PostSchema, POST_TABLE } = require('./../models/post.model');


module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(PROFILE_TABLE, ProfileSchema);
    await queryInterface.createTable(FORUM_TABLE, ForumSchema);
    await queryInterface.createTable(TOPIC_TABLE, TopicSchema);
    await queryInterface.createTable(POST_TABLE, PostSchema);

  },

  down: async (queryInterface) => {
    await queryInterface.drop(USER_TABLE);
    await queryInterface.drop(PROFILE_TABLE);
    await queryInterface.drop(FORUM_TABLE);
    await queryInterface.drop(TOPIC_TABLE);
    await queryInterface.drop(POST_TABLE);

  }
};
