const Session = require('../utils/session.js');
const {send, checkRoute, renderHTML} = require('../utils/helpers');

const main = async (data, db) => {
    const acceptableMethods = ['GET'];

    return checkRoute(acceptableMethods, main, data, db);
};

main.GET = ({client}) => {
    const template = renderHTML('index');
    return send(200, template,'html');
};

module.exports = main;