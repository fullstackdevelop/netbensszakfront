'use strict';

angular.module('tozsdeApp.UgyfelModositas', ['ngRoute', 'ngResource'])
.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider.when('/UgyfelModositas', {
    templateUrl: 'UgyfelModositas/UgyfelModositas.html',
    controller: 'UgyfelModositasCtrl'
  });
}])
.factory('UgyfelModosito', function($resource){
    return $resource('http://localhost:8080/TozsdeBackend/webresources/ugyfelek/:id', { id: '@id' }, {
        update: {
            method: 'PUT'
        },
        delete: {
            method: 'DELETE'
        }
    });
})
.controller('UgyfelModositasCtrl', function( $rootScope, $scope, UgyfelModosito) {
    $scope.modositandoUgyfel = UgyfelModosito.get({ id: $rootScope.erkeztetettugyfel.id });
    $scope.modositUgyfel = function(){
        $scope.modositandoUgyfel.$update(function(){
        })
    }
    $scope.torolUgyfel = function(){
        $scope.modositandoUgyfel.$delete(function(){
        })
    }
});