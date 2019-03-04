
let routing = {};

routing.define = (req, res, data) => {
    res.end('Hello from define.js!')
};

module.exports = routing;