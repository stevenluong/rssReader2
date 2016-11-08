'use strict';

/* App Module */

var mainApp = angular.module('mainApp', [
  'ngRoute',
  //'rssReaderAnimations',
  'mainControllers',
  'mainFilters',
  'mainServices'
]);

mainApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/news', {
        templateUrl: 'partials/news-list.html',
        controller: 'NewsListCtrl'
      }).
      otherwise({
        redirectTo: '/news'
      });
  }]);
