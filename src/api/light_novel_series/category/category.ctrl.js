const { LightNovel, Author, Publisher, Category, LightNovelSeries, LightNovelSeriesCategory } = require('../../../../models');
var Sequelize = require('sequelize')
const models = require('../../../../models');

exports.list = async (ctx) => {
    const { id } = ctx.params;
    try {
        const Op = Sequelize.Op
        const lightNovelSeriesCategories = await LightNovelSeries.findOne({
            where: {
                id: id
            },
            include: [Category]
        });
        const body = {
            code: 200,
            message: "Success",
            data: {
                lightNovelSeriesCategories: lightNovelSeriesCategories,
            }
        }
        ctx.body = body;

    } catch (e) {
        console.log(e);
    }
}


exports.write = async (ctx) => {
    const { id } = ctx.params;

    try {
        const title = ctx.query.title
        const category = await Category.findOne({
            where: {
                title: title
            }
        })

        const lightNovelSeries = await LightNovelSeries.findOne({
            where: {
                id: id
            }
        })

        if (category != null && lightNovelSeries != null) {
            await lightNovelSeries.addCategory(category)
        }


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


exports.writes = async (ctx) => {
    const { id } = ctx.params;

    try {
        const titles = ctx.query.titles.split(',')

        const categories = await Category.findAll({
            where: {
                title: titles
            }
        })

        console.log(categories)
        const lightNovelSeries = await LightNovelSeries.findOne({
            where: {
                id: id
            }
        })

        if (categories != null && lightNovelSeries != null) {
            await lightNovelSeries.addCategories(categories)
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


exports.delete = async (ctx) => {
    const { id } = ctx.params;

    try {
        const title = ctx.query.title
        const category = await Category.findOne({
            where: {
                title: title
            }
        })

        const lightNovelSeries = await LightNovelSeries.findOne({
            where: {
                id: id
            }
        })


        if (category != null && lightNovelSeries != null) {
            await lightNovelSeries.removeCategory(category)
        }
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


exports.deletes = async (ctx) => {
    const { id } = ctx.params;

    try {
        const titles = ctx.query.titles.split(',')

        const categories = await Category.findAll({
            where: {
                title: titles
            }
        })


        const lightNovelSeries = await LightNovelSeries.findOne({
            where: {
                id: id
            }
        })


        if (categories != null && lightNovelSeries != null) {
            await lightNovelSeries.removeCategories(categories)
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