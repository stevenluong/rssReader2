//prod
var serverSocket = "slapps.fr:3030";
//dev
//var serverSocket = "localhost:3030";
'use strict';

/* Controllers */

var rssReaderControllers = angular.module('rssReaderControllers', []);
rssReaderControllers.controller('NewsListCtrl', ['$scope','Sources','News',
		function($scope, Sources, News) {
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
			News.getLastNews().success(function(response){
				response.forEach(function(news){
					/*
					var news = {};
					news.date = item.date;
					news.source= item.source;
					news.img= item.image;
					news.title= item.title;
					news.link= item.link;
					*/
					$scope.news.push(news);
				})
			});
		}]);

