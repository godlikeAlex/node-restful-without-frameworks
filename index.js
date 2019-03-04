const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const routing = require('./routing');

let server = {};

server.httpServer = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const queryStringObject = parsedUrl.query;

    let decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data',(data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        switch (req.url) {
            case '/mac':
                routing.define(req,res,buffer);
            default:
                res.end('404')
        }
    });
});

server.httpServer.listen(3000, err => {
    if(!err) {
        console.log(`Server is up! on port 3000!`)
    }
});