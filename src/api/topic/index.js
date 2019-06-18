const Router = require('koa-router');

const topic = new Router();
const topicCtrl = require('./topic.ctrl');

topic.get('/', topicCtrl.list);
topic.get('/:id', topicCtrl.read);
topic.post('/', topicCtrl.write);
module.exports = topic;