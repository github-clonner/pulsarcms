// config/routes.js
// Copyright (C) Rob Colbert <rob.isConnected@gmail.com>

var RouteAssembler = require('robcolbert-utils').expressjs.RouteAssembler;
var log = require('winston');

function configureRoutes (app, config) {

  var routes = new RouteAssembler(app, config);

  //
  // CONTROLLERS
  //

  var users = new (require('../app/controllers/users'))(app, config);

  routes.add({ 'method': 'POST',    'uri': '/users',                  'controllerMethod': function (req, res) { users.create(req,res); }});
  routes.add({ 'method': 'GET',     'uri': '/users',                  'controllerMethod': users.list });

  routes.add({ 'method': 'GET',     'uri': '/users/me',               'controllerMethod': users.getMyProfile });

  routes.add({ 'method': 'GET',     'uri': '/users/:userId',          'controllerMethod': users.get });
  routes.add({ 'method': 'PUT',     'uri': '/users/:userId',          'controllerMethod': users.update });
  routes.add({ 'method': 'DELETE',  'uri': '/users/:userId',          'controllerMethod': users.delete });

  routes.add({ 'method': 'POST',    'uri': '/users/:userId/verify',   'controllerMethod': users.verifyEmailKey });

  routes.add({ 'method': 'GET',     'uri': '/users/:userId/friends',  'controllerMethod': users.listFriends });
  routes.add({ 'method': 'POST',    'uri': '/users/:userId/friends',  'controllerMethod': users.addFriend });
  routes.add({ 'method': 'DELETE',  'uri': '/users/:userId/friends/:friendId', 'controllerMethod': users.removeFriend });

  var sessions = new (require('../app/controllers/sessions'))(app, config);

  routes.add({ 'method': 'POST',    'uri': '/sessions',               'controllerMethod': function (req, res) { sessions.create(req,res); }});
  routes.add({ 'method': 'GET',     'uri': '/sessions',               'controllerMethod': sessions.get });

  var pulses = new (require('../app/controllers/pulses'))(app, config);

  routes.add({ 'method': 'GET',     'uri': '/pulses',               'controllerMethod': pulses.list });
  routes.add({ 'method': 'POST',    'uri': '/pulses',               'controllerMethod': pulses.create });

  routes.add({ 'method': 'GET',     'uri': '/pulses/:id',           'controllerMethod': pulses.get });
  routes.add({ 'method': 'PUT',     'uri': '/pulses/:id',           'controllerMethod': pulses.update });
  routes.add({ 'method': 'DELETE',  'uri': '/pulses/:id',           'controllerMethod': pulses.delete });

  routes.add({ 'method': 'POST',    'uri': '/pulses/:id/comments',  'controllerMethod': pulses.createComment });
  routes.add({ 'method': 'GET',     'uri': '/pulses/:id/comments',  'controllerMethod': pulses.getComments });


  var posts = new (require('../app/controllers/posts'))(app, config);

  routes.add({ 'method': 'GET',     'uri': '/posts',                  'controllerMethod': posts.list });
  routes.add({ 'method': 'POST',    'uri': '/posts',                  'controllerMethod': posts.create });

  routes.add({ 'method': 'GET',     'uri': '/posts/:postId',          'controllerMethod': posts.get });
  routes.add({ 'method': 'PUT',     'uri': '/posts/:postId',          'controllerMethod': posts.update });
  routes.add({ 'method': 'DELETE',  'uri': '/posts/:postId',          'controllerMethod': posts.delete });

  routes.add({ 'method': 'POST',    'uri': '/posts/:postId/comments', 'controllerMethod': posts.createComment });
  routes.add({ 'method': 'GET',     'uri': '/posts/:postId/comments', 'controllerMethod': posts.getComments });


  var videos = new (require('../app/controllers/videos'))(app, config);

  routes.add({ 'method': 'POST',    'uri': '/videos',                 'controllerMethod': videos.create });
  routes.add({ 'method': 'GET',     'uri': '/videos',                 'controllerMethod': videos.list });

  routes.add({ 'method': 'GET',     'uri': '/videos/:videoId',        'controllerMethod': videos.get });
  routes.add({ 'method': 'PUT',     'uri': '/videos/:videoId',        'controllerMethod': videos.update });
  routes.add({ 'method': 'DELETE',  'uri': '/videos/:videoId',        'controllerMethod': videos.delete });

};

module.exports = exports = configureRoutes;
