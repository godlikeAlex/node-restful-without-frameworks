let helpers = {};

helpers.parseJsonToObject = (str) => {
    try {
        return JSON.parse(str)
    } catch (e) {
        return {}
    }
};

module.exports = helpers;