const { LightNovel, Author, Publisher, Category } = require('../../../models');

exports.list = async (ctx) => {
    try {
        const list = await LightNovel.findAll({ include: [Author, Publisher, Category] });
        console.log(list);
        const body = {
            code : 200,
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