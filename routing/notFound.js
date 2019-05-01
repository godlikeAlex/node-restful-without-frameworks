const {send, checkRoute} = require('../utils/helpers');

const notFound = async (data, db) => {
    const acceptableMethods = ['GET'];

    return checkRoute(acceptableMethods, notFound, data);
};

notFound.GET = () => {
    return send(404, 'Required page not found!')
};

module.exports = notFound;