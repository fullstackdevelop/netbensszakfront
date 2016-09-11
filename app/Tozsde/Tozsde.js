'use strict';

angular.module('tozsdeApp.Tozsde', ['ngRoute', 'ngResource', 'chart.js'])
.config(['$routeProvider', '$httpProvider', function($routeProvider) {
  $routeProvider.when('/Tozsde', {
    templateUrl: 'Tozsde/Tozsde.html',
    controller: 'TozsdeCtrl'
  });
}])
.factory('ertekpapirok', function($resource){
    return $resource('http://localhost:8080/TozsdeBackend/webresources/ertekpapirok', {}, {
        query: { method:'GET', isArray:true}
    });
})
.factory('Arfolyamgrafikonok', function($resource){
    return $resource('http://localhost:8080/TozsdeBackend/webresources/arfolyamgrafikonok', {}, {
        get: { method:'GET', isArray:true}
    });
})
.factory('ArfolyamgrafikonokSpec', function($resource){
    return $resource('http://localhost:8080/TozsdeBackend/webresources/arfolyamgrafikonok/:ertekpapirId', { ertekpapirId: '@ertekpapirId' }, {
        get: { method:'GET', isArray:true}
    });
})
.factory('arfolyamadatoks', function($resource){
    return $resource('http://localhost:8080/TozsdeBackend/webresources/arfolyamadatoks', {}, {
        query: { method:'GET', isArray:true}
    });
})
.factory('UgyfelEgyenlegek', function($resource){
    return $resource('http://localhost:8080/TozsdeBackend/webresources/ugyfelegyenlegek/:ugyfel_id', { ugyfel_id: '@id' }, {
        query: { method:'GET', isArray:true}
    });
})
.factory('UgyfelErtekpapirBirtoklasok', function($resource){
    return $resource('http://localhost:8080/TozsdeBackend/webresources/ugyfelertekpapirbirtoklasok', {}, {
        query: { method:'GET', isArray:true}
    });
})
.factory('Ajanlattetelek', function($resource){
    return $resource('http://localhost:8080/TozsdeBackend/webresources/ajanlattetelek', {}, {
    });
})
.controller('TozsdeCtrl', function(  $rootScope, $scope, ertekpapirok, arfolyamadatoks, UgyfelEgyenlegek, UgyfelErtekpapirBirtoklasok, Arfolyamgrafikonok, ArfolyamgrafikonokSpec, Ajanlattetelek) {
      
        $scope.allarfolyamgrafikonok = Arfolyamgrafikonok.query();
        $scope.allertekpapirok = ertekpapirok.query();
        $scope.allarfolyamok = arfolyamadatoks.query();
        $scope.ugyfelegyenleg = UgyfelEgyenlegek.get({ ugyfel_id: $rootScope.erkeztetettugyfel.id });
        $scope.ertekpapirbirtoklasok = UgyfelErtekpapirBirtoklasok.query(); 
        $scope.setSelectedReszvenyGraf = function(egyertekpapir){
            $scope.ertekek = [];
            $scope.idopontok = [];
            $scope.kivalasztottreszveny = egyertekpapir;
            ArfolyamgrafikonokSpec.query({ ertekpapir_id: egyertekpapir.id }).$promise.then(function(rates) {
                $scope.rates = rates.map(function(rate) {
                    if(rate.ertekpapirId === egyertekpapir.id )
                    return rate.arfolyam;
                    });
                $scope.datumok = rates.map(function(rate) {
                    if(rate.ertekpapirId === egyertekpapir.id )
                    return rate.datum;
                });
                angular.forEach($scope.rates, function(item){
                    if(item){
                        $scope.ertekek.push(item);
                    }
                });
                angular.forEach($scope.datumok, function(item){
                    if(item){
                        $scope.idopontok.push(item);
                    }
                });
                console.log($scope.idopontok);
                console.log($scope.ertekek);
            });
          };    
          $scope.rogzitendoAjanlat = new Ajanlattetelek();
          $scope.veteliAjanlat = function(){
              $scope.rogzitendoAjanlat.szandek = 1;
              $scope.rogzitendoAjanlat.ugyfelId = $rootScope.erkeztetettugyfel.id;
              $scope.rogzitendoAjanlat.ertekpapirId= $scope.kivalasztottreszveny.id;
              $scope.rogzitendoAjanlat.$save(function(){
              });        
          };
           $scope.eladasiAjanlat = function(){
              $scope.rogzitendoAjanlat.szandek = 0;
              $scope.rogzitendoAjanlat.ugyfelId = $rootScope.erkeztetettugyfel.id;
              $scope.rogzitendoAjanlat.ertekpapirId= $scope.kivalasztottreszveny.id;
              $scope.rogzitendoAjanlat.$save(function(){
              });
           };     
           $scope.options= {
             responsive: true,
             maintainAspectRation: false
           };
});