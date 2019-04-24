const helpers = require('../utils/helpers');
const {send, hashPassword, checkRoute} = helpers;

const login = async (data, db) => {
    const acceptableMethods = ['POST'];
    return checkRoute(acceptableMethods, login, data, db);
};

login.POST = async (data, db) => {
    const password = typeof (data.payload.password) === 'string' && data.payload.password.length >=7 ? data.payload.password : false;
    const email = typeof (data.payload.email) === 'string' ? data.payload.email : false;

    if(password && email) {
        const hashedPassword = hashPassword(password);
        const result = await db.findOne('users',{email});
        if(result.password === hashedPassword) {
            return send(200, result);
        } else {
            return send(400, {error: "Invalid email or password"});
        }

    } else {
        return send(400, {error: 'Missing required fields'});
    }
};



const signUp = async (data, db) => {
    const acceptableMethods = ['POST'];
    return checkRoute(acceptableMethods, signUp, data, db);
};

signUp.POST = async (data, db) => {
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

const signOut = async (data, db) => {

};

module.exports = {
    login,
    signUp,
    signOut
};