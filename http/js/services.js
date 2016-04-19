//prod
//var server = "http://slapps.fr/rssReader2/ror/"
//dev
//var server = "localhost:8000";
'use strict';

/* Services */

var rssReaderServices = angular.module('rssReaderServices', ['ngResource']);

rssReaderServices.factory('Sources',function($http){
	var sources = {};
	sources.getSources = function(){
		return $http.get("http://slapps.fr/rssReader2/ror/sources.json")
	};	
	return sources;
});
rssReaderServices.factory('News',function($http){
	var news = {};
	news.getLastNews = function(){
		return $http.get("http://slapps.fr/rssReader2/ror/news.json")
	};	
	console.log(news);
	return news;
});
