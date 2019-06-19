const { LightNovel, Author, Publisher, Category, LightNovelSeries } = require('../../../models');
var Sequelize = require('sequelize')

exports.read = async (ctx) => {
    const { id } = ctx.params;
    try {
        const Op = Sequelize.Op
        const lightNovel = await LightNovel.findOne({
            include: [Author, Publisher, Category],
            where: {
                id: id
            }
        });
        series_aladin_id = lightNovel["series_aladin_id"]
        if (series_aladin_id == 0) {
            lightNovel.setDataValue("series", {})
        } else {
            const seriesLightNovels = await LightNovel.findAll({
                // attributes: { exclude: ['recommen] },
                include: [Author, Publisher, Category],
                where: {
                    id: {
                        [Op.ne] :id
                    },
                    series_aladin_id : series_aladin_id
                }
            });
            const series = await LightNovelSeries.findOne({
                where: {
                    aladin_id : series_aladin_id
                }
            })
            series.setDataValue("light_novels", seriesLightNovels)
            lightNovel.setDataValue("series", series)
        }
        const body = {
            code: 200,
            message: "Success",
            data: {
                light_novel: lightNovel,
            }
        }
        ctx.body = body;

    } catch (e) {
        console.log(e);
    }
}

exports.list = async (ctx) => {
    try {
        const Op = Sequelize.Op
        const id = parseInt(ctx.query.id || 0, 10);
        const lightNovel = await LightNovel.findOne({
            // attributes: { exclude: ['recommen] },
            include: [Author, Publisher, Category],
            where: {
                id: id
            }
        });
        series_aladin_id = lightNovel["series_aladin_id"]
        if (series_aladin_id == 0) {
            lightNovel.setDataValue("series", {})
        } else {
            const seriesLightNovels = await LightNovel.findAll({
                // attributes: { exclude: ['recommen] },
                include: [Author, Publisher, Category],
                where: {
                    id: {
                        [Op.ne] :id
                    },
                    series_aladin_id : series_aladin_id
                }
            });
            const series = await LightNovelSeries.findOne({
                where: {
                    aladin_id : series_aladin_id
                }
            })
            series.setDataValue("light_novels", seriesLightNovels)
            lightNovel.setDataValue("series", series)
        }
        const body = {
            code: 200,
            message: "Success",
            data: {
                light_novel: lightNovel,
            }
        }
        ctx.body = body;
    } catch (e) {
        console.log(e);
    }
}