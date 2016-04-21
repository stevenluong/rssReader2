//prod
var serverSocket = "slapps.fr:3030";
//dev
//var serverSocket = "localhost:3030";
'use strict';

/* Controllers */

var rssReaderControllers = angular.module('rssReaderControllers', []);
rssReaderControllers.controller('NewsListCtrl', ['$scope','Sources','News','Datetime',
		function($scope, Sources, News, Datetime) {
			Sources.getSources().success(function(response){
				$scope.checkboxModel=[];
				$scope.sources=[];
				response.forEach(function(source){
					$scope.checkboxModel[source.name]= source.display;
					$scope.sources.push(source);
				});
			});

			$scope.news = [];
			$scope.orderProp= "date";
			$scope.today=Datetime.toDay(new Date());
			News.getLastNews().success(function(response){
				response.forEach(function(news){
					news.time=Datetime.ROR_toTime(news.date);
					$scope.news.push(news);
				})
			});
		}]);

