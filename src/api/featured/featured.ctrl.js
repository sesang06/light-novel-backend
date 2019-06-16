const { LightNovel, Author, Publisher, Category, LightNovelRecommend, Recommend } = require('../../../models');
var Sequelize = require('sequelize')
exports.list = async (ctx) => {
    try {
        const Op = Sequelize.Op 
        
        const featured_list = [
            {
                thumbnail: "",
                title: "무직전생 18",
                type: "novel",
                id: 1
            },
            {
                thumbnail: "",
                title: "무직전생  18",
                type: "novel",
                id: 2
            },
            {
                thumbnail: "",
                title: "무직 전생 18",
                type: "editor_choice_list",
                id: 123
            }
        ]
        var currentTime = new Date();
        var year = currentTime.getFullYear()
        var month = currentTime.getMonth() + 1;
        var beginMonth = year+'-'+month+'-'+'01'
        var endMonth = year+'-'+(month+1)+'-'+'01'
        
        if (month == 11) {
            var endMonth = (year+1)+'-'+1+'-'+'01'
        }
        
        const new_month_list = await LightNovel.findAll({
            attributes: { exclude: ['recommend_rank', 'link', 'isbn', 'isbn13', 'aladin_id', 'adult', 'sales_point', 'sales_price', 'standard_price', 'index_description', 'publisher_description'] },
            include: [Author, Publisher, Category],
            order: [
                ['publication_date', 'DESC']
            ],
            where: {
                publication_date: {
                    [Op.between] : [
                        beginMonth, endMonth
                    ]
                }
            },
            limit: 10
        });
        const recommend_list = await Recommend.findAll({
                include: [
                    LightNovel,
                ],
                where: {
                    visible: 1
                },
                order: [
                    ['order', 'ASC'],
                    [Sequelize.literal('`light_novels->light_novel_recommend`.`order`'), 'ASC']
                ]
            });

        // const list = await LightNovel.findAll({
        //     attributes: { exclude: ['recommend_rank', 'link', 'isbn', 'isbn13', 'aladin_id', 'adult', 'sales_point', 'sales_price', 'standard_price', 'index_description', 'publisher_description'] },
        //     include: [Author, Publisher, Category],
        //     where: {
        //         hit_rank: {
        //             [Op.ne]: 0
        //         }
        //     },
        //     order: [
        //         ['hit_rank', 'ASC']
        //     ],
        //     limit: limit + 1,
        //     offset: offset
        // });
   
        const body = {
            code: 200,
            message: "Success",
            data: {
                featured_list: featured_list,
                new_month_list: new_month_list,
                recommend_list: recommend_list 
            }
        }
        ctx.body = body;
    } catch (e) {
        console.log(e);
    }
}