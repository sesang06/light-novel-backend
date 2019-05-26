const Koa = require('koa');
const Router = require('koa-router');
const api = require('./api');

var sequelize = require('../models').sequelize;

const app = new Koa();
const router = new Router();
sequelize.sync();
router.use('/api', api.routes());

app.use(router.routes()).use(router.allowedMethods());
app.use((ctx) => {
    ctx.body = 'hello world';
});

app.listen(4000, () => {
    console.log('listening')
});
