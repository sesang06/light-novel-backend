module.exports = (sequelize, DataTypes) => {
    return sequelize.define('light_novel_recommend', {
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
            underscored: true
        })
}