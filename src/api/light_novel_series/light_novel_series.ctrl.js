const { LightNovel, Author, Publisher, Category, LightNovelSeries, LightNovelSeriesCategory, sequelize } = require('../../../models');
var Sequelize = require('sequelize')

const lightNovelSeriesDTO = (lightNovelSeries) => {
    return {
        id: lightNovelSeries.id,
        title: lightNovelSeries.title,
        thumbnail: lightNovelSeries.get('thumbnail'),
        categories: lightNovelSeries.categories.map(category => {
            return category.title
        }),
        light_novels: lightNovelSeries.light_novels
    }
}

exports.read = async (ctx) => {
    const { id } = ctx.params;
    try {

        const isDTO = ctx.query.view_type !== "detail";
        var lightNovelSeries = await LightNovelSeries.findOne({
            where: {
                id: id
            },
            attributes: [
                [sequelize.literal(
                    "(SELECT `thumbnail` FROM `light_novel` WHERE `light_novel`.`series_aladin_id` = `light_novel_series`.`aladin_id` ORDER BY `publication_date` DESC, `id` DESC LIMIT 1)"
                ),
                    'thumbnail'],
                'id',
                'title',
                'last_publication_date'
            ],
            include: [{
                model: Category,
                attributes: [
                    'id', 'title'
                ]
            }, {
                model: LightNovel,
                attributes: [
                    'id', 'title', 'thumbnail'
                ]
            }
            ]
        });
        if (isDTO) {
            lightNovelSeries = lightNovelSeriesDTO(lightNovelSeries);
        }
        const body = {
            code: 200,
            message: "Success",
            data: {
                light_novel_series: lightNovelSeries
            }
        }
        ctx.body = body;

    } catch (e) {
        console.log(e);
    }
}


const getAllList = async ({ limit, offset }) => {
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
        include: [{
            model: Category,

        }],
        order: [
            ['last_publication_date', 'DESC'],
            ['id', 'ASC']
        ],
        limit: limit + 1,
        offset: offset
    });

    const count = await LightNovelSeries.count();
    return {
        list: list,
        count: count
    }
}


const getFilteredList = async ({ categoryTitles, limit, offset }) => {
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
        include: [{
            model: Category,
            where: { title: categoryTitles }
        }],
        order: [
            ['last_publication_date', 'DESC'],
            ['id', 'ASC']
        ],
        limit: limit + 1,
        offset: offset
    });

    const count = await LightNovelSeries.count({
        include: [{
            model: Category,
            where: { title: categoryTitles }
        }]
    });
    return {
        list: list,
        count: count
    }
}

exports.list = async (ctx) => {
    try {
        const Op = Sequelize.Op
        const offset = parseInt(ctx.query.offset || 0, 10);
        const limit = parseInt(ctx.query.limit || 10, 10);;
        const isDTO = ctx.query.view_type !== "detail";

        var list;
        var count;
        if (ctx.query.categories != undefined) {
            const categoryTitles = ctx.query.categories
                .split(',')
                .filter(title => {
                    return title.length !== 0
                })
            if (categoryTitles.length === 0) {
                const result = await getAllList({ limit, offset });
                list = result.list;
                count = result.count;
            } else {
                const result = await getFilteredList({ limit, offset, categoryTitles });
                list = result.list;
                count = result.count;
            }
        } else {
            const result = await getAllList({ limit, offset });
            list = result.list;
            count = result.count;
        }

        const lastPage = Math.ceil(count / limit);
        var is_last_page = true;
        const length = list.length;
        if (length == limit + 1) {
            is_last_page = false;
            list.pop()
        }
        if (isDTO) {
            list = list.map(series => lightNovelSeriesDTO(series));
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