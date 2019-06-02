const { LightNovel, Author, Publisher, Category } = require('../../../models');
var Sequelize = require('sequelize')
exports.list = async (ctx) => {
    try {
        const Op = Sequelize.Op
        const lastId = parseInt(ctx.query.last_id || 0, 10);
        const query = ctx.query.query;
        const limit = 10;
        const list = await LightNovel.findAll({
            attributes: { exclude: ['hit_rank', 'link', 'isbn', 'isbn13', 'aladin_id', 'adult', 'sales_point', 'sales_price', 'standard_price'] },
            include: [Author, Publisher, Category],
            where: {
                id: {
                    [Op.gt]: lastId
                },
                title: {
                    [Op.substring]: query
                }
            },
            order: [
                ['publication_date', 'DESC']
            ],
            limit: limit + 1
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