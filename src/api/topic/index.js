const Router = require('koa-router');

const recent = new Router();
const recentCtrl = require('./recent.ctrl');

recent.get('/', recentCtrl.list);

module.exports = recent;