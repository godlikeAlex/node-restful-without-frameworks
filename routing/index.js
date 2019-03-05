const main = require('./main');
const notFound = require('./notFound');
const users = require('./users');

let routing = {};

routing.main = main;
routing.notFound = notFound;
routing.users = users;

module.exports = routing;