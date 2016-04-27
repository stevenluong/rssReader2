//prod
var serverSocket = "slapps.fr:3030";
//dev
//var serverSocket = "localhost:3030";
'use strict';

/* Controllers */

var rssReaderControllers = angular.module('rssReaderControllers', []);
rssReaderControllers.controller('NewsListCtrl', ['$scope','Sources','News','Datetime','Users',
		function($scope, Sources, News, Datetime,Users) {
		$scope.updateProfile= function(){
		var profile = Users.getProfile($scope.email);
		$scope.sources.forEach(function(s){
				$scope.updateSource(s,false);
				profile.sources.forEach(function(ps){	
					if(s.name==ps) $scope.updateSource(s,true);
				});
				if(profile.sources.length==0) $scope.updateSource(s,true);
				});
		};
		$scope.count=0;
		$scope.sources=[];
		Sources.getSources().success(function(response){
				response.forEach(function(source){
						//console.log(source);
						//TODO update ROR model
						//source.display=false;
						if(source.display){
						source.class="btn btn-primary";
						}else{
						source.class="btn btn-default";
						}
						$scope.sources.push(source);
						});
				});
		$scope.updateSource = function(s, display){
			$scope.count=0;
			s.display=display;
			if(display){
				s.class="btn btn-primary";
			}else{
				s.class="btn btn-default";
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

