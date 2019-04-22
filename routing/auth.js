const helpers = require('../utils/helpers');
const {send, hashPassword} = helpers;

const login = async (data, db) => {
    const acceptableMethods = ['POST'];
    if(acceptableMethods.indexOf(data.method) > -1) {
        return login[data.method](data, db);
    } else {
        return send(404, {error: 'Required page not found'});
    }
};

login.POST = async (data, db) => {
    const name = typeof (data.payload.name) === 'string' && data.payload.name.length >= 5 ? data.payload.name : false;
    const password = typeof (data.payload.password) === 'string' && data.payload.password.length >=7 ? data.payload.password : false;
    const email = typeof (data.payload.email) === 'string' ? data.payload.email : false;

    if(name && password && email) {
        const hashedPassword = hashPassword(password);
        const result = await db.createUser(name, hashedPassword, email);
        return send(200,  result);
    } else {
        return send(400, {error: 'Missing required fields'});
    }
};

const signUp = async (data, db) => {

};

const signOut = async (data, db) => {

};

module.exports = {
    login,
    signUp,
    signOut
};