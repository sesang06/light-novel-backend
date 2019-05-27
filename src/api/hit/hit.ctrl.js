const { LightNovel, Author, Publisher, Category } = require('../../../models');
var Sequelize = require('sequelize')
exports.list = async (ctx) => {
    try {
        const Op = Sequelize.Op
        const lastId = parseInt(ctx.query.last_id || 0, 10);
        const list = await LightNovel.findAll({
            include: [Author, Publisher, Category],
            where: {
                id: {
                    [Op.gt]: lastId
                }
            },
            limit: 10
        });
        const body = {
            code: 200,
            message: "Success",
            data: {
                list: list
            }
        }
        ctx.body = body;
    } catch (e) {
        console.log(e);
    }
}