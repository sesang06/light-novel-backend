module.exports = (sequelize, DataTypes) => {
    return sequelize.define('category', {
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
            underscored: true
        })
}