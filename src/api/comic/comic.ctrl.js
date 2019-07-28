const { Comic, Author, Publisher, ComicSeries } = require('../../../models');
var Sequelize = require('sequelize')

exports.read = async (ctx) => {
    const { id } = ctx.params;
    try {
        const Op = Sequelize.Op
        const comic = await Comic.findOne({
            include: [Author, Publisher],
            where: {
                id: id
            }
        });
        series_aladin_id = comic["series_aladin_id"]
        if (series_aladin_id == 0) {
            comic.setDataValue("series", {})
        } else {
            const seriesComics = await Comic.findAll({
                include: [Author, Publisher],
                where: {
                    id: {
                        [Op.ne] :id
                    },
                    series_aladin_id : series_aladin_id
                }
            });
            const series = await ComicSeries.findOne({
                where: {
                    aladin_id : series_aladin_id
                }
            })
            series.setDataValue("comics", seriesComics)
            comic.setDataValue("series", series)
        }
        const body = {
            code: 200,
            message: "Success",
            data: {
                comic: comic,
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
        const orderQuery = ctx.query.order;

        var order = [];
        switch (orderQuery) {
            case 'new':
                order = [
                        ['publication_date', 'ASC']
                    ];
                break;
            case 'hit':
                order = [ 
                    ['hit_rank', 'ASC']
                ];
                break;
            default:
                order = [

                ]
        }
        const limit = 10;
        const list = await Comic.findAll({
            attributes: { exclude: ['recommend_rank', 'link', 'isbn', 'isbn13', 'aladin_id', 'adult', 'sales_point', 'sales_price', 'standard_price', 'index_description', 'publisher_description'] },
            include: [Author, Publisher],
            where: {
                hit_rank: {
                    [Op.ne]: 0
                }
            },
            order: order,
            limit: limit + 1,
            offset: offset
        });
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