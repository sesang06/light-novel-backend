const Router = require('koa-router');

const recommend = new Router();
const recommendCtrl = require('./recommend.ctrl');

recommend.get('/', recommendCtrl.list);

module.exports = recommend;