const express = require('express');

const topicsRouter = require('./topics.router');
const topicsRouter = require('./profiles.router');
const postsRouter = require('./posts.router');
const forumsRouter = require('./forums.router');
const usersRouter = require('./users.router');
const authRouter = require('./auth.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
  router.use('/topic', topicsRouter);
  router.use('/forums', forumsRouter);
  router.use('/profile', profilesRouter);
  router.use('/post', postsRouter);

}

module.exports = routerApi;
