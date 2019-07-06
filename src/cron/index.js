const moment = require('moment-timezone');

const { LightNovel } = require('../../models');
const Sequelize = require('sequelize')
const admin = require('firebase-admin');

const notifiyNewlyPublishedBooks = async () => {
    const seoul = moment().tz('Asia/Seoul');
    const today = seoul.format('YYYY-MM-DD')
    const todayLiteral = seoul.locale('ko').format('LL')
    const tomorrow = seoul.add(1, 'days').format('YYYY-MM-DD')
    const Op = Sequelize.Op

    const list = await LightNovel.findAll({
        attributes: { include: ['title'] },
        order: [
            ['title', 'ASC']
        ],
        where: {
            publication_date: {
                [Op.gte]: today,
                [Op.lt]: tomorrow
            }
        }
    });

    if (list.length == 0) {
        return
    }


    const titles = list.map((novel) => {
        return novel.title
    })
    const length = titles.length
    const title = `${todayLiteral} 라이트노벨 신간 (${length}권)`
    const message = `${titles[0]} 외 ${length} 권의 라이트노벨이 오늘 발매됩니다.`
    const detail_message = titles.join("\n");
    const type = "daily_report"
    const topic = 'dailyReport';

    const fcm_message = {
        data: {
            title: title,
            message: message,
            detail_message: detail_message,
            type: type
        },
        topic: topic
    };

    // Send a message to devices subscribed to the provided topic.
    admin.messaging().send(fcm_message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });

}

exports.notifiyNewlyPublishedBooks = notifiyNewlyPublishedBooks