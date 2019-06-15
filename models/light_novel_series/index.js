module.exports = (sequelize, DataTypes) => {
    return sequelize.define('light_novel_series', {
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