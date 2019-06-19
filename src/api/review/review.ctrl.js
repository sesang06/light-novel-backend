const { Review, LightNovel } = require('../../../models');
var Sequelize = require('sequelize')

exports.read = async (ctx) => {
    const { id } = ctx.params;
    try {
        const review = await Review.findOne({
            include: [
                LightNovel,
            ],
            where: {
                id: id
            },
        })
        if (!review) {
            
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
                review: review
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
    
        const review_list = await Review.findAll({
                include: [
                    LightNovel,
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
                review_list: review_list
            }
        }
        ctx.body = body;
    } catch (e) {
        console.log(e);
    }
}

/* POST /api/topic
    { title, description, light_novel_id }
*/
exports.write = async (ctx) => {
    console.log(ctx.request);
    const { title, description, light_novel_id } = ctx.request.body;
    try {
        const review = Review.create({
            title: title,
            description: description,
            light_novel_id: light_novel_id,
            visible: true,
            order: 0
        }, {
            include: LightNovel
        })
        if (!review) {
            
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
                review: review
            }
        }
        ctx.body = body;  

    } catch (e) {
        console.log(e);
    }
}