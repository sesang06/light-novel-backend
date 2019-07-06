module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        firebase_id: {
            type: DataTypes.STRING(512),
            allowNull: false,
        }
    }, {
            indexes: [
                {
                    unique: true,
                    fields: ['firebase_id']
                }
            ],
            underscored: true
        })
}