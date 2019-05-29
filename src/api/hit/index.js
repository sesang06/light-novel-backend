const Router = require('koa-router');

const hit = new Router();
const hitCtrl = require('./hit.ctrl');
const LightNovel = require('../../../models').LightNovel;

hit.get('/', hitCtrl.list);

module.exports = hit;