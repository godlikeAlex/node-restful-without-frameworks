const crypto = require('crypto');

let helpers = {};

helpers.hashPassword  = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

helpers.send = (statusCode, data) => {
    return {status: statusCode, payload: data}
};


helpers.parseJsonToObject = (str) => {
    try {
        return JSON.parse(str)
    } catch (e) {
        return {}
    }
};

helpers.randomStr = (len) => {
    len = typeof (len) !== 'number' ? 0 : len;
    const chars = 'abcdefghijklnopqrstuwyz0123456789ABCDEFGHIJKLNOPQRSTUWYZ';
    let res = '';
    for(let i = 0; i <= len; i++)
    {
        let randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
        res+=randomChar;
    }

    return res;
};

helpers.checkRoute = (acceptableMethods, route, data, db) => {
    if(acceptableMethods.indexOf(data.method) > -1) {
        return route[data.method](data, db);
    } else {
        return helpers.send(500, {error: 'Access Denied'});
    }
};

module.exports = helpers;