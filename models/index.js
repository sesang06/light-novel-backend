const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.LightNovel = require('./light_novel')(sequelize, Sequelize);
db.Author = require('./author')(sequelize, Sequelize);
db.Publisher = require('./publisher')(sequelize, Sequelize);
db.Category = require('./category')(sequelize, Sequelize);
db.LightNovelSeries = require('./light_novel_series')(sequelize, Sequelize);
db.Recommend = require('./recommend')(sequelize, Sequelize);
db.LightNovelRecommend = require('./light_novel_recommend')(sequelize, Sequelize);
db.Topic = require('./topic')(sequelize, Sequelize);

db.Author.hasMany(db.LightNovel, { foreignKey: 'author_id', sourceKey: 'id' });
db.LightNovel.belongsTo(db.Author, { foreignKey: 'author_id', targetKey: 'id' });

db.Publisher.hasMany(db.LightNovel, { foreignKey: 'publisher_id', sourceKey: 'id' });
db.LightNovel.belongsTo(db.Publisher, { foreignKey: 'publisher_id', targetKey: 'id' });

db.Category.belongsToMany(db.LightNovel, { through: 'LightNovelCategory' });
db.LightNovel.belongsToMany(db.Category, { through: 'LightNovelCategory' });

db.LightNovel.belongsToMany(db.Recommend, { through: db.LightNovelRecommend});
db.Recommend.belongsToMany(db.LightNovel, { through: db.LightNovelRecommend});

db.Topic.belongsTo(db.LightNovel, { foreignKey: {
    name: 'light_novel_id',
    allowNull: false,
}, targetKey: 'id' });

module.exports = db;
