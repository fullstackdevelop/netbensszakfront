'use strict';

// Declare app level module which depends on views, and components
angular.module('tozsdeApp', [
  'ngRoute',
  'tozsdeApp.UgyfelKereso',
  'tozsdeApp.Tozsde',
  'tozsdeApp.UgyfelRogzites',
  'tozsdeApp.UgyfelModositas'
]).
config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider.otherwise({redirectTo: '/UgyfelKereso'});  
   $httpProvider.defaults.useXDomain = true;
   delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
   $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}]);

