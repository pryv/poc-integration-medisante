// @flow

const nconf = require('nconf');

// 1. `process.env`
// 2. `process.argv`
//
nconf.env().argv();

// 3. Values in `config.json`
//
const configFile = nconf.get('config') || 'dev-config.yml';
nconf.file({ 
  file: configFile,
  format: require('nconf-yaml'),
});

// 4. Any default values
//
nconf.defaults({
  http: {
    port: 3000,
    ip: '127.0.0.1'
  },
  logs: {
    prefix: 'bridge-medisante',
    console: {
      active: true,
      level: 'info',
      colorize: true
    },
    file: {
      active: false
    }
  },
  pryv: {
    pryvApiEndpoint: 'https://ck6bwmcar00041ep87c8ujf90@testuser.pryv.li'
  },
});

module.exports = nconf;

