'use strict';

const TOKEN_LENGTH  = 85;
const ALPHA   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateToken = () => {
    const base = ALPHA.length;
    let token = '';
    for(let i = 0; i < TOKEN_LENGTH; i++) {
      let char = Math.floor(Math.random() * base);
      token+= ALPHA[char];
    }

    return token;
};

class Session extends Map {
    constructor(token){
        super();
        this.token = token;
    }

    static start(client) {
        if(client.session) return client.session;
        const token = generateToken();
        client.token = token;
        const session = new Session(token);
        client.session = session;
        client.setCookie('token', token);
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

    save() {
        console.log('Save successfull');
    }
}

module.exports = Session;