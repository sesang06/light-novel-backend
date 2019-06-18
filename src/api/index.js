const Router = require('koa-router');
const hot = require('./hit');
const newRouter = require('./new');
const recommendRouter = require('./recommend');
const searchRouter = require('./search');
const lightNovelRouter = require('./light_novel');
const featuredRouter = require('./featured');
const topicRouter = require('./topic');
const api = new Router();

api.use('/hit', hot.routes());
api.use('/new', newRouter.routes());
api.use('/recommend', recommendRouter.routes());
api.use('/search', searchRouter.routes());
api.use('/light_novel', lightNovelRouter.routes());
api.use('/featured', featuredRouter.routes());
api.use('/topic', topicRouter.routes());
module.exports = api;
