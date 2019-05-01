'use strict';
const mongo = require('./mongo');
const storage = new mongo('localhost:27017');

const TOKEN_LENGTH  = 85;
const ALPHA         = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateToken = () => {
    const base = ALPHA.length;
    let token = '';
    for(let i = 0; i < TOKEN_LENGTH; i++) {
      let char = Math.floor(Math.random() * base);
      token+= ALPHA[char];
    }

    return token;
};

class Session {
    constructor(token){
        this.token = token;
    }

    static start(client, user) {
        if(client.session) return client.session;
        const token = generateToken();
        client.token = token;
        const session = new Session(token);
        client.session = session;
        client.setCookie('token', token);
        this.save(token, user);
        return session;
    }

    static restore(client) {
        const { cookie } = client;
        if(!cookie) return;
        const sessionToken = cookie.token;
        // if(sessionToken) {
        //     return new Promise((resolve, reject) => {
        //         storage.get(sessionToken, (err, session) => {
        //             if(err) reject(new Error('No session'));
        //             Object.setPrototypeOf(session, Session.prototype);
        //             client.token    = sessionToken;
        //             client.session  = session;
        //             resolve(session);
        //         });
        //     });
        // }
    }

    static delete(client) {
        const { token } = client;
        if(token) {
            client.deleteCookie('token');
            client.token    = undefined;
            client.session  = null;
            storage.delete(token);
        }
    }

    static save(token, user) {
        storage.findOne('session', {_id: token})
            .then(() => {
                throw new Error('This session all ready exists');
            })
            .catch(() => {
                storage.createSession(token, user);
            });
    }
}

module.exports = Session;