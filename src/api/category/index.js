const Router = require('koa-router');

const category = new Router();
const categoryCtrl = require('./category.ctrl');

category.get('/', categoryCtrl.list);
category.get('/add', categoryCtrl.write);
category.post('/add', categoryCtrl.write);
category.post('/delete', categoryCtrl.delete);


module.exports = category;