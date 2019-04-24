const Session = require('../utils/session.js');

const main = async (data, db, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];

    Session.start(data.client);

    if(acceptableMethods.indexOf(data.method) > -1) {
        return 'hello'
    } else {
        callback(400)
    }
};

module.exports = main;