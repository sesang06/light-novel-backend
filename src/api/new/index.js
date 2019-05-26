const Router = require('koa-router');

const newRouter = new Router();
const newCtrl = require('./new.ctrl');
const LightNovel = require('../../../models').LightNovel;

const printInfo = (ctx) => {
    ctx.body = {
        method: ctx.method
    };
};
newRouter.get('/', newCtrl.list);

module.exports = newRouter;