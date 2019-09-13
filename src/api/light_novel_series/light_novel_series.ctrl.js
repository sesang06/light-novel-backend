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
        const offset = parseInt(ctx.query.offset || 0, 10);
        const limit = parseInt(ctx.query.limit || 10, 10);;

        const list = await LightNovelSeries.findAll({
            attributes: [
                [sequelize.literal(
                    "(SELECT `thumbnail` FROM `light_novel` WHERE `light_novel`.`series_aladin_id` = `light_novel_series`.`aladin_id` ORDER BY `publication_date` DESC, `id` DESC LIMIT 1)"
                ),
                    'thumbnail'],
                [sequelize.literal(
                    "(SELECT `description` FROM `light_novel` WHERE `light_novel`.`series_aladin_id` = `light_novel_series`.`aladin_id` ORDER BY `id` ASC LIMIT 1)"
                ),
                    'description'],
                'id',
                'title',
                'last_publication_date'
            ],
            include: [
                Category
            ],
            order: [
                ['last_publication_date', 'DESC'],
                ['id', 'ASC']
            ],
            limit: limit + 1,
            offset: offset
        });

        const count = await LightNovelSeries.count();
        const lastPage = Math.ceil(count / limit);
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
                is_last_page: is_last_page,
                last_page: lastPage
            }
        }
        ctx.body = body;
    } catch (e) {
        console.log(e);
    }
}