const { LightNovel, Author, Publisher, Category } = require('../../../models');
var Sequelize = require('sequelize')
var axios = require('axios')
const { Map, fromJS, toJS } = require('immutable');

var options = {
    host: 'htt'
}
const url = 'http://localhost:9200/test-migrate/_search'

const fetch = async (query) => {
    try {
        const response = await axios.get(url, {
            params: {
                q: "title:" + query
            }
        })
        const data = response.data
        const results = data.hits.hits
        const lightNovelInfos = results.map(getLightNovelInfo)
        return JSON.stringify(lightNovelInfos)
    } catch (e) {
        console.log(e);
    }
} 

const getLightNovelInfo = (result) => {
    delete result._index
    delete result._type
    delete result._id
    delete result._score
    const source = result._source
    const data = fromJS(source)
    
    return  data.appendAuthorInfo().toJS()
  
}

Map.prototype.appendAuthorInfo = function() {
    const id = this.get("author.id")
    const name = this.get("author.name")
    const created_at = this.get("author.created_at")
    const updated_at = this.get("author.updated_at")

    const author = Map({
        id: id,
    name: name,
    created_at: created_at,
    updated_at: updated_at })

    // delete lightNovel["author.id"]
    // delete lightNovel["author.name"] 
    // delete lightNovel["author.created_at"]
    // delete lightNovel["author.updated_at"]

    return this
        .delete("author.id")
        .delete("author.name")
        .delete("author.created_at")
        .delete("author.updated_at")
        .set("author", author)
};
exports.list = async (ctx) => {
    try {
        // const Op = Sequelize.Op
        // const lastId = parseInt(ctx.query.last_id || 0, 10);
        // const query = ctx.query.query;
        // const limit = 10;
        // const list = await LightNovel.findAll({
        //     attributes: { exclude: ['hit_rank', 'link', 'isbn', 'isbn13', 'aladin_id', 'adult', 'sales_point', 'sales_price', 'standard_price'] },
        //     include: [Author, Publisher, Category],
        //     where: {
        //         id: {
        //             [Op.gt]: lastId
        //         },
        //         title: {
        //             [Op.substring]: query
        //         }
        //     },
        //     order: [
        //         ['publication_date', 'DESC']
        //     ],
        //     limit: limit + 1
        // });
        // var is_last_page = true;
        // const length = list.length;
        // if (length == limit + 1) {
        //     is_last_page = false;
        //     list.pop()
        // } 
        // const body = {
        //     code: 200,
        //     message: "Success",
        //     data: {
        //         list: list,
        //         is_last_page: is_last_page
        //     }
        // }
        body = await fetch('여동생')
        ctx.body = body;
    } catch (e) {
        console.log(e);
    }
}