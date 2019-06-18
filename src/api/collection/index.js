const Router = require('koa-router');

const collection = new Router();
const collectionCtrl = require('./collection.ctrl');

collection.get('/', collectionCtrl.list);
collection.get('/:id', collectionCtrl.read);
collection.post('/', collectionCtrl.write);
module.exports = collection;