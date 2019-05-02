const main = require('./main');
const notFound = require('./notFound');
const users = require('./users');
const auth = require('./auth');
const staticfile = require('./static');

let routing = {};

routing.main = main;
routing.notFound = notFound;
routing.users = users;
routing.auth = auth;
routing.static = staticfile;

module.exports = routing;