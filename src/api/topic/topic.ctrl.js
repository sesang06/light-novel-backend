
const { Topic, Review } = require('../../../models');
var Sequelize = require('sequelize')

exports.read = async (ctx) => {
    const { id } = ctx.params;
    try {
        const topic = await Topic.findOne({
            include: [
                Review,
            ],
            where: {
                id: id
            },
        })
        if (!topic) {
            
            const body = {
                code: 404,
                message: "Not Found",
            }
            ctx.body = body;   
            return;
        }
        const body = {
            code: 404,
            data: {
                topic: topic
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
    
        const topic_list = await Topic.findAll({
                include: [
                    Review,
                ],
                where: {
                    visible: 1
                },
                order: [
                    ['order', 'ASC']
                ]
            });

     
        const body = {
            code: 200,
            message: "Success",
            data: {
                topic_list: topic_list
            }
        }
        ctx.body = body;
    } catch (e) {
        console.log(e);
    }
}

/* POST /api/topic
    { title, thumbnail }
*/
exports.write = async (ctx) => {
    const { title, thumbnail } = ctx.request.body;
    try {
        const topic = Topic.create({
            title: title,
            thumbnail: thumbnail,
            visible: true,
            order: 0
        })
        if (!topic) {
            
            const body = {
                code: 404,
                message: "Not Found",
            }
            ctx.body = body;   
            return;
        }
        const body = {
            code: 404,
            data: {
                topic: topic
            }
        }
        ctx.body = body;  

    } catch (e) {
        console.log(e);
    }
}