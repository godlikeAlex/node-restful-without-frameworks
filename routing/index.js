const main = require('./main');
const notFound = require('./notFound');

let routing = {};

routing.main = main;
routing.notFound = notFound;

module.exports = routing;