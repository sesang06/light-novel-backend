module.exports = (sequelize, DataTypes) => {
    return sequelize.define('light_novel_collection', {
        light_novel_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        collection_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }, 
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
            underscored: true
        })
}