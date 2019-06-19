const { LightNovel, Author, Publisher, Category, LightNovelCollection, Collection } = require('../../../models');
var Sequelize = require('sequelize')
exports.list = async (ctx) => {
    try {
        const Op = Sequelize.Op


        const collection_list = await Collection.findAll({
            include: [
                LightNovel,
            ],
            where: {
                visible: 1
            },
            order: [
                ['order', 'ASC'],
                [Sequelize.literal('`light_novels->light_novel_collection`.`order`'), 'ASC']
            ]
        });


        const body = {
            code: 200,
            message: "Success",
            data: {
                collection_list: collection_list
            }
        }
        ctx.body = body;
    } catch (e) {
        console.log(e);
    }
}

exports.read = async (ctx) => {
    try {
        const Op = Sequelize.Op
        const { id } = ctx.params;

        const collection = await Collection.findOne({
            include: [
                LightNovel,
            ],
            where: {
                visible: 1,
                id: id
            },
            order: [
                ['order', 'ASC'],
                [Sequelize.literal('`light_novels->light_novel_collection`.`order`'), 'ASC']
            ]
        });

        
        const body = {
            code: 200,
            message: "Success",
            data: {
                collection: collection
            }
        }
        ctx.body = body;
    } catch (e) {
        console.log(e);
    }
}

exports.write = async (ctx) => {
    const { title, description, light_novels } = ctx.request.body;
    try {
        const light_novel_ids = light_novels.split(',');
        const collection = await Collection.create({
            title: title,
            description: description,
            visible: true,
            order: 0
        })
        if (!collection) {
            
            const body = {
                code: 404,
                message: "Not Found",
            }
            ctx.body = body;   
            return;
        }
        light_novel_ids.forEach(async id => {
            console.log(id)
            await LightNovelCollection.create({
                collectionId: collection.id,
                lightNovelId: id
            })
        });
        const body = {
            code: 200,
            data: {
                collection: collection
            }
        }
        ctx.body = body;  

    } catch (e) {
        console.log(e);
    }
}