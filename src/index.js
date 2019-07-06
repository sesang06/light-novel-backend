const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cron = require('node-cron');
const api = require('./api');
const cronTabJobs = require('./cron');

var sequelize = require('../models').sequelize;

const app = new Koa();
const router = new Router();
sequelize.sync();
router.use('/api', api.routes());

cron.schedule("* * * * *", cronTabJobs.notifiyNewlyPublishedBooks);
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use((ctx) => {
    ctx.body = 'hello world';
});

app.listen(4000, () => {
    console.log('listening')
});
