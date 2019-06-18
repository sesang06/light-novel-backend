const Router = require('koa-router');

const lightNovel = new Router();
const lightNovelCtrl = require('./light_novel.ctrl');

lightNovel.get('/', lightNovelCtrl.list);
lightNovel.get('/:id', lightNovelCtrl.read);

module.exports = lightNovel;