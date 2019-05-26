const Router = require('koa-router');
const hot = require('./hit');
const newRouter = require('./new');
const recommendRouter = require('./recommend');

const api = new Router();

api.use('/hit', hot.routes());
api.use('/new', newRouter.routes());
api.use('/recommend', recommendRouter.routes());
module.exports = api;
