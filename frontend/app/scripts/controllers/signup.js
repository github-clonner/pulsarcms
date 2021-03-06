/*
 * FILE
 *  controllers/signup.js
 *
 * LICENSE
 *  Copyright (C) 2014 Rob Colbert <rob.isConnected@gmail.com>
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to
 *  deal in the Software without restriction, including without limitation the
 *  rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 *  sell copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 *  IN THE SOFTWARE.
 */

'use strict';

function SignupCtrl ($scope, $rootScope, $window, Users) {

  $window.scrollTo(0, 0);
  ga('send', 'pageview');

  $rootScope.$broadcast('showAnnouncement', {
    'title':'New Users!',
    'content':'Welcome to Pulsar: The easy way to publish online. An email, display name and password is all you need for now. More to come later...',
    'displayTime': 8000
  });

  $scope.user = {
    'displayName': 'New User'
  };

  //@TODO obviously, refactor this value upward!!
  // -- snip --
  $scope.isComplete = false;
  $scope.haveError = false;
  $scope.errorMessage = null;
  $scope.passwordMatchResult = '';
  $scope.bugReported = false;
  // -- snip --

  var passwordStrengthLabels = [
    'Very Weak',
    'Weak',
    'Better',
    'Medium',
    'Strong',
    'Strongest'
  ];

  $scope.checkPasswords = function ( ) {
    var score   = 0;

    if ($scope.user.password.length > 6) {
      score++;
    }

    //if password has both lower and uppercase characters give 1 point
    if (($scope.user.password.match(/[a-z]/) ) && ($scope.user.password.match(/[A-Z]/))) {
      score++;
    }

    //if password has at least one number give 1 point
    if ($scope.user.password.match(/\d+/)) {
      score++;
    }

    //if password has at least one special caracther give 1 point
    if ($scope.user.password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) {
      score++;
    }

    //if password bigger than 12 give another 1 point
    if ($scope.user.password.length > 12) {
      score++;
    }

    $scope.passwordStrengthLabel = passwordStrengthLabels[score];
    $scope.passwordStrength = score / passwordStrengthLabels.length;

    if ($scope.user.password === $scope.passwordVerify) {
      $scope.passwordMatchResult = 'Passwords match.';
    } else {
      $scope.passwordMatchResult = 'Passwords do not match.';
    }
  };

  $scope.createAccount = function ( ) {
    $scope.isComplete = false;
    $scope.haveError = false;
    $scope.errorMessage = null;
    $scope.bugReported = false;

    ga('send', 'event', 'AccountSignup', 'accountCreateAttepted', 1);

    Users.create(
      $scope.user,
      function onCreateSuccess (user) {
        console.log('new user record', user);
        ga('send', 'event', 'AccountSignup', 'accountCreateSuccess', 1);
        $scope.isComplete = true;
      },
      function onCreateError (error) {
        console.log('Users.create error', error);
        ga('send', 'event', 'AccountSignup', 'accountCreateError', {'error':error});
        $scope.haveError = true;
        $scope.errorMessage = error.data.msg;
        $scope.errorData = error.data;
        switch (error.data.name) {
          case 'MongoError':
            switch (error.data.code) {
              case 11000:
                $scope.errorMessage = 'The email address provided is already registered with Pulsar.';
                break;
            }
            break;

          default:
            $scope.bugReported = true;
            // now absorbed into the back-end reporting
            break;
        }
        $window.scrollTo(0, 0);
      }
    );
  };
}

SignupCtrl.$inject = [
  '$scope',
  '$rootScope',
  '$window',
  'Users'
];

angular.module('robcolbertApp')
.controller('SignupCtrl', SignupCtrl);
