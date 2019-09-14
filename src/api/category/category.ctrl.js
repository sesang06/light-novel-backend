const { LightNovel, Author, Publisher, Category, LightNovelSeries } = require('../../../models');
var Sequelize = require('sequelize')

exports.read = async (ctx) => {
    const { id } = ctx.params;
    try {
        const Op = Sequelize.Op
        const category = await Category.findOne({
            where: {
                id: id
            }
        });
        const body = {
            code: 200,
            message: "Success",
            data: {
                category: category,
            }
        }
        ctx.body = body;

    } catch (e) {
        console.log(e);
    }
}

exports.list = async (ctx) => {
    try {

        const isDTO = ctx.query.view_type !== "detail";

        var categories = await Category.findAll({
            attributes: [
                'id', 'title'
            ]
        });
        if (isDTO) {
            categories = categories.map(category => {
                return category.title
            })
        }
        const body = {
            code: 200,
            message: "Success",
            data: {
                categories: categories,
            }
        }
        ctx.body = body;
    } catch (e) {
        console.log(e);
    }
}

exports.write = async (ctx) => {
    try {
        const { title } = ctx.request.body
        const [category, created] = await Category.findOrCreate({
            where: {
                title: title
            }
        })
        const body = {
            code: 200,
            message: "Success",
            data: {
                category: category,
            }
        }
        ctx.body = body;
    } catch (e) {
        console.log(e);
    }
}

exports.delete = async (ctx) => {
    try {
        const { title } = ctx.request.body
        await Category.destroy({
            where: {
                title: title
            }
        })
        const body = {
            code: 200,
            message: "Success",
            data: {
            }
        }
        ctx.body = body;
    } catch (e) {
        console.log(e);
    }
}