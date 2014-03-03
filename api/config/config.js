// config.js
// Copyright (C) 2014 Rob Colbert <rob.isConnected@gmail.com>

var path = require('path');
var crypto = require('crypto');

var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';
console.log('ENV', env);
var listenPort = 10010;

var corsConfig = {
  'allowOrigins': [
    '*'
  ],
  'allowMethods': [
    'GET',
    'PUT',
    'POST',
    'DELETE'
  ],
  'allowHeaders': [
    'Content-Type',
    'Authorization'
  ],
  'allowCredentials': true
};

var monitorConfig = {
  enabled: true,
  mountPoint: '/monitor',
  maxHistoryLength: 3
};

function _hashPassword (password) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.passwordSalt + password);
  return shasum.digest('hex');
};

function _generateRandomKey ( ) {
  var currentDate = (new Date()).valueOf().toString();
  var random = Math.random().toString();

  var shasum = crypto.createHash('sha1');
  shasum.update(this.passwordSalt + currentDate + random);
  return shasum.digest('hex');
};

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'pulsar-api',
      passwordSalt: 'sVlf3r!c',
      hashPassword: _hashPassword,
      generateRandomKey: _generateRandomKey
    },
    port: listenPort,
    db: 'mongodb://localhost/robcolbert-development',
    cors: corsConfig,
    monitor: monitorConfig
  },

  test: {
    root: rootPath,
    app: {
      name: 'pulsar-api',
      passwordSalt: 'sVlf3r!c',
      hashPassword: _hashPassword,
      generateRandomKey: _generateRandomKey
    },
    port: listenPort,
    db: 'mongodb://localhost/robcolbert-test',
    cors: corsConfig,
    monitor: monitorConfig
  },

  production: {
    root: rootPath,
    app: {
      name: 'pulsar-api',
      passwordSalt: 'sVlf3r!c',
      hashPassword: _hashPassword,
      generateRandomKey: _generateRandomKey
    },
    port: listenPort,
    db: 'mongodb://localhost/robcolbert-production',
    cors: corsConfig,
    monitor: monitorConfig
  }
};

module.exports = config[env];
