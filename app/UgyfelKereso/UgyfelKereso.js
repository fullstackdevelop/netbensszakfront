'use strict';

angular.module('tozsdeApp.UgyfelKereso', ['ngRoute', 'ngResource'])
.factory('ugyfelek', function($resource){
    return $resource('http://localhost:8080/TozsdeBackend/webresources/ugyfelek', {}, {
        query: { method:'GET', isArray:true}
    });
})
.config(['$routeProvider', '$httpProvider', function($routeProvider) {
  $routeProvider.when('/UgyfelKereso', {
    templateUrl: 'UgyfelKereso/UgyfelKereso.html',
    controller: 'UgyfelKeresoCtrl'
  });
}])
.controller('UgyfelKeresoCtrl', function( $rootScope,$scope, ugyfelek) {
        $scope.allugyfelek = ugyfelek.query();
        $scope.showSelectedElement = function(egyugyfel){
            $scope.selected = egyugyfel;
            $rootScope.erkeztetettugyfel = egyugyfel;
        };
});