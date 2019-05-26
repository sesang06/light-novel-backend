module.exports = (sequelize, DataTypes) => {
    return sequelize.define('publisher', {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
            underscored: true
        })
}