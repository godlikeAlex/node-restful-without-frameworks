let helpers = {};

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
module.exports = helpers;