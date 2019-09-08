const Router = require('koa-router');

const lightNovelSeries = new Router();
const lightNovelSeriesCtrl = require('./light_novel_series.ctrl');
const categoryRouter = require('./category');


lightNovelSeries.get('/', lightNovelSeriesCtrl.list);
lightNovelSeries.get('/:id', lightNovelSeriesCtrl.read);
lightNovelSeries.use('/:id/category', categoryRouter.routes());

module.exports = lightNovelSeries;