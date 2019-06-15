const { LightNovel, Author, Publisher, Category } = require('../../../models');
var Sequelize = require('sequelize')
var axios = require('axios')
const { Map, fromJS, toJS } = require('immutable');

var options = {
    host: 'htt'
}
const url = 'http://localhost:9200/light_novel/_search'

const fetch = async (query) => {
    try {
        const response = await axios.post(url, {
            query : {
                multi_match: {
                    fields: [ 
                        "title",
                        "description", 
                        "author.name", 
                        "publisher.name" 
                    ],
                    query: query
                }
            }
        })
        const data = response.data
        const results = data.hits.hits
        const lightNovelInfos = results.map(getLightNovelInfo)
        return lightNovelInfos
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
    delete source["@timestamp"]
    delete source["@version"]
    const data = fromJS(source)
    
    return data
    .appendAuthorInfo()
    .appendPublisherInfo()
    .toJS()
  
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

    return this
        .delete("author.id")
        .delete("author.name")
        .delete("author.created_at")
        .delete("author.updated_at")
        .set("author", author)
};

Map.prototype.appendPublisherInfo = function() {
    const id = this.get("publisher.id")
    const name = this.get("publisher.name")
    const created_at = this.get("publisher.created_at")
    const updated_at = this.get("publisher.updated_at")

    const publisher = Map({
        id: id,
    name: name,
    created_at: created_at,
    updated_at: updated_at })

    return this
        .delete("publisher.id")
        .delete("publisher.name")
        .delete("publisher.created_at")
        .delete("publisher.updated_at")
        .set("publisher", publisher)
};



exports.list = async (ctx) => {
    try {
        const lastId = parseInt(ctx.query.last_id || 0, 10);
        const query = ctx.query.query;
        const limit = 10;
        const list = await fetch(query)
        const body = {
            code: 200,
            message: "Success",
            data: {
                list: list,
                is_last_page: false
            }
        }
        ctx.body = body;
    } catch (e) {
        console.log(e);
    }
}