
const { User } = require('../../models');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('token_info', {
        fcm_token: {
            type: DataTypes.STRING(512),
            allowNull: false
        },
        platform: {
            type: DataTypes.ENUM({
                values: ['iOS', 'Android']
            })
        },
        version: {
            type: DataTypes.STRING(512),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: User,
              key: 'id'
            }
          }
    }, {
            underscored: true
        })
}