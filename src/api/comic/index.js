const Router = require('koa-router');

const comic = new Router();
const comicCtrl = require('./comic.ctrl');

comic.get('/', comicCtrl.list);
comic.get('/:id', comicCtrl.read);

module.exports = comic;