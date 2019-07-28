module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comic_series', {
        title: {
            type: DataTypes.STRING(512),
            allowNull: false
        },
        aladin_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
            underscored: true
        })
}