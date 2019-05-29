const Router = require('koa-router');

const lightNovel = new Router();
const lightNovelCtrl = require('./light_novel.ctrl');
const LightNovel = require('../../../models').LightNovel;

const printInfo = (ctx) => {
    ctx.body = {
        method: ctx.method
    };
};
lightNovel.get('/', lightNovelCtrl.list);

module.exports = lightNovel;