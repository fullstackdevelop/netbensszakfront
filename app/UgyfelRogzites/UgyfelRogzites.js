'use strict';

angular.module('tozsdeApp.UgyfelRogzites', ['ngRoute', 'ngResource'])
.config(['$routeProvider', '$httpProvider', function($routeProvider) {
  $routeProvider.when('/UgyfelRogzites', {
    templateUrl: 'UgyfelRogzites/UgyfelRogzites.html',
    controller: 'UgyfelRogzitesCtrl'
  });
}])
.factory('Ugyfelrogz', function($resource){
    return $resource('http://localhost:8080/TozsdeBackend/webresources/ugyfelek', {}, {
    });
})
.controller('UgyfelRogzitesCtrl', function($scope, Ugyfelrogz) {
    $scope.rogzitendoUgyfel = new Ugyfelrogz();
    $scope.rogzUgyfel = function(){
        $scope.rogzitendoUgyfel.$save(function(){
        })
    }
});