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

        const categories = await Category.findAll({
         
        });
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
        const title = ctx.query.title
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
        const title = ctx.query.title
        const [category, created] = await Category.destroy({
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