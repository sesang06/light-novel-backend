module.exports = (sequelize, DataTypes) => {
    return sequelize.define('author', {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
            underscored: true
        })
}