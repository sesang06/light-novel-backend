const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cron = require('node-cron');
const api = require('./api');
const cronTabJobs = require('./cron');

const admin = require("firebase-admin");

const serviceAccount = require('./../config/firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lightnovellist-850e9.firebaseio.com"
});

var sequelize = require('../models').sequelize;

const app = new Koa();
const router = new Router();
sequelize.sync();
router.use('/api', api.routes());

cron.schedule("0 10 * * *", cronTabJobs.notifiyNewlyPublishedBooks);

cron.schedule("15 22 * * *", cronTabJobs.testCrontabs);
cron.schedule("14 22 * * *", cronTabJobs.testCrontabs);
cron.schedule("13 22 * * *", cronTabJobs.testCrontabs);
cron.schedule("12 22 * * *", cronTabJobs.testCrontabs);
cron.schedule("11 22 * * *", cronTabJobs.testCrontabs);
cron.schedule("10 22 * * *", cronTabJobs.testCrontabs);
cron.schedule("9 22 * * *", cronTabJobs.testCrontabs);
cron.schedule("8 22 * * *", cronTabJobs.testCrontabs);
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use((ctx) => {
    ctx.body = 'hello world';
});

app.listen(4000, () => {
    console.log('listening')
});
