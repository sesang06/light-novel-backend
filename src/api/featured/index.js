const Router = require('koa-router');

const featured = new Router();
const featuredCtrl = require('./featured.ctrl');

featured.get('/', featuredCtrl.list);

module.exports = featured;