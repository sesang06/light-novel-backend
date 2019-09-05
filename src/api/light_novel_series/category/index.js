const Router = require('koa-router');

const lightNovelSeries = new Router();
const lightNovelSeriesCtrl = require('./light_novel_series.ctrl');

lightNovelSeries.get('/', lightNovelSeriesCtrl.list);
lightNovelSeries.get('/:id', lightNovelSeriesCtrl.read);

module.exports = lightNovelSeries;