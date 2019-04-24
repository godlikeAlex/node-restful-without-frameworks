const main = require('./main');
const notFound = require('./notFound');
const users = require('./users');
const auth = require('./auth');

let routing = {};

routing.main = main;
routing.notFound = notFound;
routing.users = users;
routing.auth = auth;

module.exports = routing;