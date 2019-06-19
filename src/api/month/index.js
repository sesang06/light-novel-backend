const Router = require('koa-router');

const month = new Router();
const monthCtrl = require('./month.ctrl');

month.get('/', monthCtrl.list);

module.exports = month;