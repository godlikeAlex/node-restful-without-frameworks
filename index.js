const http          = require('http');
const url           = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const db            = require('./utils/db');
const Client        = require('./utils/client');
const SessionStorage = require('./utils/mongo');

const routing = require('./routing');
const helpers = require('./utils/helpers');

let server = {};

server.httpServer = http.createServer( async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const sessiondb = new SessionStorage('localhost:27017');
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const queryStringObject = parsedUrl.query;
    const method = req.method;
    const headers = req.headers;

    await sessiondb.connect();

    let decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data',(data) => {
        buffer += decoder.write(data);
    });

    req.on('end', async () => {
        buffer += decoder.end();

        let routerHandler = typeof(routers[trimmedPath]) !== "undefined" ? routers[trimmedPath] : routers.notFound;

        const client = await Client.getInstance(req, res);

        const data = {
            trimmedPath,
            queryStringObject,
            method,
            headers,
            client,
            payload: helpers.parseJsonToObject(buffer)
        };

        res.on('finish', () => {
            if (client.session) console.dir(client.session);
        });

        routerHandler(data, sessiondb)
            .then(({payload, status}) => {
                const payloadString = JSON.stringify(payload);

                client.sendCookie();
                res.writeHead(status);
                res.end(payloadString);
            })
            .catch(err => console.dir('Error ' + err));
    });
});

const routers = {
    '': routing.main,
    'users': routing.users,
    'login': routing.auth.login,
    'signup': routing.auth.signUp,
    'notFound': routing.notFound
};

server.httpServer.listen(3000, err => {
    if(!err) {
        console.log(`Server is up! on port 3000!`)
    }
});