
const { User, TokenInfo } = require('../../../models');
const AgentParser = require('../../service/agent_parser');
const FirebaseIdParser = require('../../service/firebase_id_parser');

var Sequelize = require('sequelize')

exports.read = async (ctx) => {
    const { id } = ctx.params;
    try {
        const token_info = await TokenInfo.findOne({
            where: {
                id: id
            },
        })
        if (!token_info) {
            
            const body = {
                code: 404,
                message: "Not Found",
            }
            ctx.body = body;   
            return;
        }
        const body = {
            code: 404,
            data: {
                token_info: token_info
            }
        }
        ctx.body = body;   

    } catch (e) {
        console.log(e);
    }
}

exports.list = async (ctx) => {
   
}

/* POST /api/token_info
    { token }
*/
exports.write = async (ctx) => {
    try {
        const { token } = ctx.request.body;
        const firebaseId = FirebaseIdParser.firebaseId(ctx)
        const platform = AgentParser.platform(ctx)
        const version = AgentParser.version(ctx)
        if (firebaseId == null || platform == null || version == null || token == null) {
            const body = {
                code: 404,
                message: "필요한 정보가 없습니다."
            }
            ctx.body = body;  
            return;
        }
        const [user, created] = await User.findOrCreate({
            where: {
                firebase_id: firebaseId
            },
            include: [TokenInfo]
        })
        if (!user) {
            const body = {
                code: 404,
                message: "인증되지 않았습니다."
            }
            ctx.body = body;  
            return;
        }
        console.log(user)
        const token_infos = user['token_infos']
        if (created || token_infos.length == 0) {
            const token_info = await TokenInfo.create({
                user_id: user['id'],
                fcm_token: token,
                platform: platform,
                version: version 
            })

            if (!token_info) {
                const body = {
                    code: 404,
                    message: "토큰 생성에 실패했습니다."
                }
                ctx.body = body;  
                return;
            }
            const body = {
                code: 200,
                message: "토큰 생성에 성공했습니다."
            }
            ctx.body = body;  
            return;
        }
        console.log(user['token_infos'])

        const token_info = token_infos[0]

        token_info.fcm_token = token
        token_info.platform = platform
        token_info.version = version

        const result = await token_info.save()
      
        if (!result) {
            const body = {
                code: 404,
                message: "토큰 저장에 실패했습니다."
            }
            ctx.body = body;  
            return;
        }
        const body = {
            code: 200,
            message: "토큰 저장에 성공했습니다."
        }
        ctx.body = body;  
    } catch (e) {
        console.log(e);
    }
}