const Router = require('koa-router');
const hot = require('./hit');

const api = new Router();

api.use('/hit', hot.routes());

module.exports = api;
