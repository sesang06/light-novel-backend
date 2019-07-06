const firebaseId = (ctx) => {
    return ctx.request.headers['firebase-id']
}

exports.firebaseId = firebaseId
