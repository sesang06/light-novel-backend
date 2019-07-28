const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.LightNovel = require('./light_novel')(sequelize, Sequelize);
db.Comic = require('./comic')(sequelize, Sequelize);
db.Author = require('./author')(sequelize, Sequelize);
db.Publisher = require('./publisher')(sequelize, Sequelize);
db.Category = require('./category')(sequelize, Sequelize);
db.LightNovelSeries = require('./light_novel_series')(sequelize, Sequelize);
db.ComicSeries = require('./comic_series')(sequelize, Sequelize);
db.Collection = require('./collection')(sequelize, Sequelize);
db.LightNovelCollection = require('./light_novel_collection')(sequelize, Sequelize);
db.Review = require('./review')(sequelize, Sequelize);
db.Topic = require('./topic')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.TokenInfo = require('./token_info')(sequelize, Sequelize);

db.Author.hasMany(db.LightNovel, { foreignKey: 'author_id', sourceKey: 'id' });
db.LightNovel.belongsTo(db.Author, { foreignKey: 'author_id', targetKey: 'id' });

db.Author.hasMany(db.Comic, { foreignKey: 'author_id', sourceKey: 'id' });
db.Comic.belongsTo(db.Author, { foreignKey: 'author_id', targetKey: 'id' });

db.Publisher.hasMany(db.LightNovel, { foreignKey: 'publisher_id', sourceKey: 'id' });
db.LightNovel.belongsTo(db.Publisher, { foreignKey: 'publisher_id', targetKey: 'id' });

db.Publisher.hasMany(db.Comic, { foreignKey: 'publisher_id', sourceKey: 'id' });
db.Comic.belongsTo(db.Publisher, { foreignKey: 'publisher_id', targetKey: 'id' });


db.Category.belongsToMany(db.LightNovel, { through: 'LightNovelCategory' });
db.LightNovel.belongsToMany(db.Category, { through: 'LightNovelCategory' });

db.LightNovel.belongsToMany(db.Collection, { through: db.LightNovelCollection});
db.Collection.belongsToMany(db.LightNovel, { through: db.LightNovelCollection});

db.LightNovel.hasMany(db.Review, { foreignKey: {
    name: 'light_novel_id',
    allowNull: false,
}, sourceKey: 'id' });
db.Review.belongsTo(db.LightNovel, { foreignKey: {
    name: 'light_novel_id',
    allowNull: false,
}, targetKey: 'id' });

db.Topic.hasMany(db.Review, { foreignKey : {
    name: 'topic_id',
    allowNull: true
}, sourceKey: 'id'});
db.Review.belongsTo(db.Review, { foreignKey : {
    name: 'topic_id',
    allowNull: true
}, targetKey: 'id'});

db.TokenInfo.belongsTo(db.User, { foreignKey : {
    name: 'user_id',
    allowNull: true
}, targetKey: 'id'});
db.User.hasMany(db.TokenInfo, { foreignKey : {
    name: 'user_id',
    allowNull: true
}, sourceKey: 'id'});

module.exports = db;
