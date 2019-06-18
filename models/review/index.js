module.exports = (sequelize, DataTypes) => {
    return sequelize.define('review', {
        title: {
            type: DataTypes.STRING(512),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(512),
            allowNull: false
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        visible: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
            underscored: true
        })
}