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
		return news;
		});
rssReaderServices.factory('Datetime',function($http){
		var datetime = {};
		datetime.ROR_format= function(date){
		return date.substring(0,4)+date.substring(5,7)+date.substring(8,10)+'-'+date.substring(11,13)+date.substring(14,16);
		};	
		datetime.ROR_toTime= function(date){
		return date.substring(11,13)+date.substring(14,16);
		};	
		datetime.toDay= function(date){
		var d = ("0" + date.getDate()).slice(-2);
		var m = ("0" + (date.getMonth() + 1)).slice(-2);
		var y = date.getFullYear();
		return y+'-'+m+'-'+d;
		};
		return datetime;
		});
