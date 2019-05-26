module.exports = (sequelize, DataTypes) => {
    return sequelize.define('light_novel', {
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        publication_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        thumbnail: {
            type: DataTypes.STRING(512),
            allowNull: false
        }
    }, {
            underscored: true
        })
}