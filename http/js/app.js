'use strict';

/* App Module */

var rssReaderApp = angular.module('rssReaderApp', [
  'ngRoute',
  //'rssReaderAnimations',
  'rssReaderControllers',
  'rssReaderFilters',
  'rssReaderServices'
]);

rssReaderApp.config(['$routeProvider',
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
