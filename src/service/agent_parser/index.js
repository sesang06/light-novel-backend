const agent = (ctx) => {
    return ctx.request.headers['user-agent']
}

const version = (ctx) => {
    const result = agent(ctx).split('/');
    if (result.length != 3) {
        return null;
    }
    if (result[0] != 'LightNovelList') {
        return null;
    }
    return result[2];
}

const platform = (ctx) => {
    const result = agent(ctx).split('/');
    if (result.length != 3) {
        return null;
    }
    if (result[0] != 'LightNovelList') {
        return null;
    }
    return result[1];
}
exports.agent = agent
exports.version = version
exports.platform = platform