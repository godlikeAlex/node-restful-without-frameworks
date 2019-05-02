const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const pug = require('pug');

let helpers = {};

helpers.hashPassword  = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

helpers.send = (statusCode, payload, contentType, headers) => {
    contentType = typeof (contentType) === 'string' ? contentType : 'json';
    let payloadString = '';

    switch (contentType) {
        case 'json':
            headers = {'Content-Type': 'text/json'};
            payloadString = JSON.stringify(payload);
            break;
        case 'html':
            headers = {'Content-Type': 'text/html'};
            payloadString = payload;
            break;
        case 'css':
            headers = {'Content-Type': 'text/css'};
            payloadString = payload;
            break;
        default:
            payloadString = 'textplain';
    }

    return {status: statusCode, payload: payloadString, headers};
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

helpers.renderHTML =(page, variables = null) => {
    const VIEW_PATH = path.join(__dirname,'../views/pages');

    return pug.renderFile(`${VIEW_PATH}/${page}.pug`, variables);
};

helpers.getStaticAssets = (fileName) => {
    fileName = typeof (fileName) === 'string' ? fileName : false;

    if(fileName) {
        return new Promise((resolve, reject) => {
            let folder = path.join(__dirname, '../static/');
            fs.readFile(folder+fileName,(err, data) => {
                if(!err && data) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    }else{
        return {'error': 'A valid file name is not specefied'}
    }
};

module.exports = helpers;