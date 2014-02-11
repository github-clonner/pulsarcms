var express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  config = require('./config/config');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

db.on('open', function ( ) {
  console.log('connected to database', config.db);
  var modelsPath = __dirname + '/app/models';
  fs.readdirSync(modelsPath).forEach(function (file) {
    if (file.indexOf('.js') >= 0) {
      require(modelsPath + '/' + file);
    }
  });
  
  var app = express();
  
  require('./config/express')(app, config);
  require('./config/routes')(app);

  console.log('API server listening on port', config.port);  
  app.listen(config.port);
});

setInterval(function ( ) { console.log('ssh buster'); }, 15000);
