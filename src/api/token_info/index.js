const Router = require('koa-router');

const tokenInfo = new Router();
const tokenInfoCtrl = require('./token_info.ctrl');

tokenInfo.get('/', tokenInfoCtrl.list);
tokenInfo.get('/:id', tokenInfoCtrl.read);
tokenInfo.post('/', tokenInfoCtrl.write);
module.exports = tokenInfo;