const Router = require('koa-router');

const review = new Router();
const reviewCtrl = require('./review.ctrl');

review.get('/', reviewCtrl.list);
review.get('/:id', reviewCtrl.read);
review.post('/', reviewCtrl.write);
module.exports = review;