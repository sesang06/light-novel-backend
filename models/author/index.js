module.exports = (sequelize, DataTypes) => {
    return sequelize.define('author', {
        name: {
            type: DataTypes.STRING(512),
            allowNull: false
        }
    }, {
            underscored: true
        })
}