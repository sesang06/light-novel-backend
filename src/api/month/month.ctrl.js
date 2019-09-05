const { LightNovel, Author, Publisher, LightNovelCollection, Recommend } = require('../../../models');
var Sequelize = require('sequelize')
exports.list = async (ctx) => {
    try {
        const Op = Sequelize.Op 
        
       
        const currentTime = new Date();
        
        const year = parseInt(ctx.query.year || currentTime.getFullYear(), 10);
        const month = parseInt(ctx.query.month || (currentTime.getMonth() + 1), 10);
        
        const offset = parseInt(ctx.query.offset || 0, 10);
        const limit = 10;
        

        var beginMonth = year+'-'+month+'-'+'01'
        var endMonth = year+'-'+(month+1)+'-'+'01'
        if (month == 11) {
            var endMonth = (year+1)+'-'+1+'-'+'01'
        }
        
        const list = await LightNovel.findAll({
            attributes: { exclude: ['recommend_rank', 'link', 'isbn', 'isbn13', 'aladin_id', 'adult', 'sales_point', 'sales_price', 'standard_price', 'index_description', 'publisher_description'] },
            include: [Author, Publisher],
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
            limit: limit + 1,
            offset: offset
        });
        var is_last_page = true;
        const length = list.length;
        if (length == limit + 1) {
            is_last_page = false;
            list.pop()
        } 
        const body = {
            code: 200,
            message: "Success",
            data: {
                list: list,
                is_last_page: is_last_page
            }
        }
        ctx.body = body;
    } catch (e) {
        console.log(e);
    }
}