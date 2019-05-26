const Router = require('koa-router');

const recommend = new Router();
const recommendCtrl = require('./recommend.ctrl');
const LightNovel = require('../../../models').LightNovel;

const printInfo = (ctx) => {
    ctx.body = {
        method: ctx.method
    };
};
recommend.get('/', recommendCtrl.list);

module.exports = recommend;