const Router = require('koa-router');

const search = new Router();
const searchCtrl = require('./search.ctrl');

search.get('/', searchCtrl.list);

module.exports = search;