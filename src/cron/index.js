const moment = require('moment-timezone');
const { LightNovel, Author, Publisher, Category, LightNovelSeries } = require('../../models');
const Sequelize = require('sequelize')


const notifiyNewlyPublishedBooks = async () => {
    const seoul = moment().tz('Asia/Seoul');
    const today = seoul.format('YYYY-MM-DD')
    const tomorrow = seoul.add(10, 'days').format('YYYY-MM-DD')
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
    console.log(titles)
    const length = titles.length
    const message = `${titles[0]} 외 ${length} 권의 라이트노벨이 오늘 발매됩니다.`

    const detail_message_prefix = today.concat(` 일 발매된 라이트노벨 신간 목록 (총 ${length}권)\n`)
    const detail_message = detail_message_prefix.concat(titles.join("\n"));
    console.log(message)
    console.log(detail_message)
}

exports.notifiyNewlyPublishedBooks = notifiyNewlyPublishedBooks