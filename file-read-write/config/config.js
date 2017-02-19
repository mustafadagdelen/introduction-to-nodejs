var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = require('./configRaw.json');
config[env].root = rootPath;

module.exports = config[env];
