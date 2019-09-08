const { LightNovel, Author, Publisher, Category, LightNovelSeries, LightNovelSeriesCategory, sequelize } = require('../../../models');
var Sequelize = require('sequelize')

const lightNovelSeriesDTO = (lightNovelSeries) => {
    return {
        id: lightNovelSeries.id,
        title: lightNovelSeries.title,
        aladin_id: lightNovelSeries.aladin_id,
        created_at: lightNovelSeries.created_at,
        updated_at: lightNovelSeries.updated_at,
        // thumbnail: lightNovelSeries.light_novels[0].thumbnail
    }
}

exports.read = async (ctx) => {
    const { id } = ctx.params;
    try {
        const Op = Sequelize.Op
        const lightNovelSeries = await LightNovelSeries.findOne({
            where: {
                id: id
            },
            include: [
                Category
            ]
            // include: [
            //     {
            //         model: LightNovel,
            //         require: false,
            //         attributes: ['thumbnail'],
            //         limit: 1,
            //         order: [[
            //             'publication_date', 'DESC',
            //             'id', 'DESC'
            //         ]]
            //     }
            // ]
        });
        const body = {
            code: 200,
            message: "Success",
            data: {
                light_novel_series: lightNovelSeriesDTO(lightNovelSeries),
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

        const series = await LightNovelSeries.findAll({
            where: {
                last_publication_date: {
                    // "$eq" changes to "[Op.eq]"
                    [Op.eq]: null
                }
            },
            limit: 1000,
            offset: 0
        })

        series.map(async data => {
            const lightnovel = await LightNovel.findOne({
                where: {
                    series_aladin_id: data.aladin_id
                },
                order: [[
                    'publication_date', 'DESC'
                ], [
                    'id', 'DESC'
                ]]
            })

            console.log(lightnovel.publication_date)
            data.last_publication_date = lightnovel.publication_date
            data.save()
        })


        console.log(series)
        const offset = parseInt(ctx.query.offset || 0, 10);
        const limit = 10;
        const list = await sequelize.query(
            `
          SELECT lns.*, (SELECT ln.thumbnail
            FROM light_novel AS ln
            WHERE ln.series_aladin_id = X.series_aladin_id
            ORDER BY ln.publication_date DESC, ln.id DESC
            LIMIT 1) AS thumbnail
            FROM (SELECT series_aladin_id, MAX(publication_date) AS publication_date
            FROM light_novel
            GROUP BY light_novel.series_aladin_id
            HAVING series_aladin_id > 0
            ORDER BY MAX(publication_date) DESC, series_aladin_id DESC
            LIMIT 10) AS X
                INNER JOIN light_novel_series AS lns ON lns.aladin_id = X.series_aladin_id
          `, { raw: true }
        )
        var is_last_page = true;
        const length = list.length;
        if (length == limit + 1) {
            is_last_page = false;
            list.pop()
        }
        const body = {
            code: 200,
            message: "Success",
            data: {
                list: list,
                is_last_page: is_last_page
            }
        }
        ctx.body = body;
    } catch (e) {
        console.log(e);
    }
}