module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comic', {
        title: {
            type: DataTypes.STRING(512),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(512),
            allowNull: false
        },
        publication_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        thumbnail: {
            type: DataTypes.STRING(512),
            allowNull: false
        },
        hit_rank: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        recommend_rank:  {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        link: {
            type: DataTypes.STRING(512),
            allowNull: false
        },
        isbn: {
            type: DataTypes.CHAR(10),
            allowNull: false
        },
        isbn13: {
            type: DataTypes.CHAR(13),
            allowNull: false
        },
        aladin_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        series_aladin_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        adult: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        sales_point: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sales_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        standard_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        publisher_description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        index_description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
            underscored: true
        })
}