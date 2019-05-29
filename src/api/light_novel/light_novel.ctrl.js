const { LightNovel, Author, Publisher, Category } = require('../../../models');
var Sequelize = require('sequelize')
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