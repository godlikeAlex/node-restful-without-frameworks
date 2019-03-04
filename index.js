const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

let server = {};

server.httpServer = http.createServer((req, res) => {

    let decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data',(data) => {
        buffer += decoder.write(data);
    });

    res.end( 'Hello!')
});

server.httpServer.listen(3000, err => {
    if(!err) {
        console.log(`Server is up! on port 3000!`)
    }
});