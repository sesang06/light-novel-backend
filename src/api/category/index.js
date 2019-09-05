const Router = require('koa-router');

const category = new Router();
const categoryCtrl = require('./category');

category.get('/', categoryCtrl.list);
category.get('/add', categoryCtrl.write);
category.post('/add', categoryCtrl.write);
category.get('/delete', categoryCtrl.delete);
category.post('/delete', categoryCtrl.delete);
category.get('/:id', categoryCtrl.read);


module.exports = category;