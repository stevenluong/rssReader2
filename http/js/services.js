//prod
var serverWeb = "localhost";
//dev
//var serverWeb = "localhost:8000";
'use strict';

/* Services */

var rssReaderServices = angular.module('rssReaderServices', ['ngResource']);

rssReaderServices.factory('Sources',function($http){
	var sources = {};
	sources.getSources = function(){
		return $http.get("http://slapps.fr:3000/sources.json")
	};	
	return sources;
});
rssReaderServices.factory('News',function($http){
	var news = {};
	news.getLastNews = function(){
		return $http.get("http://slapps.fr:3000/news.json")
	};	
	return news;
});
