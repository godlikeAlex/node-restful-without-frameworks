const UNIX_EPOCH    = 'Thu, 01 Jan 1970 00:00:00 GMT';
const COOKIE_EXPIRE = 'Fri, 01 Jan 2100 00:00:00 GMT';
const COOKIE_DELETE = `=deleted; Expires=${UNIX_EPOCH}; Path=/; Domain=`;

class Client {
    constructor(req, res){
        this.req            = req;
        this.res            = res;
        this.token          =undefined;
        this.session        =null;
        this.cookie         ={};
        this.preparedCookie  =[];
        this.parseCooker();
    }
    //
    // static async getInstance(req, res) {
    //     const client = new Client(req, res);
    //     await Session.restore();
    //     return client;
    // }

    parseCookie() {
        const {cookie} = this.req.headers;
        if(!cookie) return;
        const items = cookie.split(';');
        for(const item of items) {
            const parts = item.split('=');
            const key = parts[0].trim();
            const val = parts[1] || '';
            this.cookie[key] = val.trim();
        }
    }

    setCookie(name, val, httpOnly = false) {
        const expires = `expires=${COOKIE_EXPIRE}`;

        let cookie = `${name}=${val}; ${expires}; Path=/; Domain=${host}`;
        if(httpOnly) cookie+= '; HttpOnly';
        this.preparedCookie.push(cookie);
    }

    sendCookie() {
        console.error('Whoops...');
    }
}

module.exports = Client;