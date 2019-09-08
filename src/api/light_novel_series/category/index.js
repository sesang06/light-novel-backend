const Router = require('koa-router');

const lightNovelSeries = new Router();
const lightNovelSeriesCtrl = require('./category.ctrl');

lightNovelSeries.get('/', lightNovelSeriesCtrl.list);
lightNovelSeries.get('/add', lightNovelSeriesCtrl.write);
lightNovelSeries.post('/add', lightNovelSeriesCtrl.write);
lightNovelSeries.get('/delete', lightNovelSeriesCtrl.delete);
lightNovelSeries.post('/delete', lightNovelSeriesCtrl.delete);
lightNovelSeries.get('/adds', lightNovelSeriesCtrl.writes);
lightNovelSeries.post('/adds', lightNovelSeriesCtrl.writes);
lightNovelSeries.get('/deletes', lightNovelSeriesCtrl.deletes);
lightNovelSeries.post('/deletes', lightNovelSeriesCtrl.deletes);


module.exports = lightNovelSeries;