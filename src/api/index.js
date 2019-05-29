const Router = require('koa-router');
const hot = require('./hit');
const newRouter = require('./new');
const recommendRouter = require('./recommend');
const lightNovelRouter = require('./light_novel');
const api = new Router();

api.use('/hit', hot.routes());
api.use('/new', newRouter.routes());
api.use('/recommend', recommendRouter.routes());
api.use('/light_novel', lightNovelRouter.routes());
module.exports = api;
