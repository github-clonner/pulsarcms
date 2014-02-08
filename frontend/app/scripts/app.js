// app.js
// Copyright (C) 2014 Rob Colbert <rob.isConnected@gmail.com>

'use strict';

angular.module('robcolbertApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.tinymce'
])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .when('/about', {
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl'
  })
  .when('/contact', {
    templateUrl: 'views/contact.html',
    controller: 'ContactCtrl'
  })
  .when('/posts/compose', {
    templateUrl: 'views/posts/compose.html',
    controller: 'PostsComposeCtrl'
  })
  .when('/posts/:postId', {
    templateUrl: 'views/posts/post-reader.html',
    controller: 'PostsPostReaderCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});
