const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const routing = require('./routing');
const helpers = require('./utils/helpers');

let server = {};


server.httpServer = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const queryStringObject = parsedUrl.query;
    const method = req.method.toLowerCase();
    const headers = req.headers;

    let decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data',(data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        let routerHandler = typeof(routers[trimmedPath]) !== "undefined" ? routers[trimmedPath] : routers.notFound;

        const data = {
            trimmedPath,
            queryStringObject,
            method,
            headers,
            payload: helpers.parseJsonToObject(buffer)
        };

        routerHandler(data, (statusCode, payload, contentType) => {
            contentType = typeof (contentType) == "undefined" ? 'json' : contentType;

            let payloadString = '';

            if (contentType === 'json') {
                payloadString = JSON.stringify(payload);
            }


            res.writeHead(statusCode);
            res.end(payloadString);
        })
    });
});

const routers = {
    '': routing.main,
    'users': routing.users,
    'notFound': routing.notFound
};

server.httpServer.listen(3000, err => {
    if(!err) {
        console.log(`Server is up! on port 3000!`)
    }
});