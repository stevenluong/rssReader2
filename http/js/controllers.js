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
				$scope.sources=[];
				response.forEach(function(source){
					console.log(source);
					if(source.display){
					source.class="btn btn-primary";
					}else{
					source.class="btn btn-default";
					}
					$scope.sources.push(source);
					});
				});
			$scope.updateSource = function(s){
			if(s.display){
			s.display=false;
			s.class="btn btn-default";
			}else{
			s.display=true;
			s.class="btn btn-primary";
			}
			};
			$scope.updateSearch = function(w){
				$scope.query = w;
			}
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

