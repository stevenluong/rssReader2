//DEV
var server_url = "slapps.fr";
var server_port = "3000";
var news_path = '/news.json';
var sources_path = '/sources.json';
//PROD
/*
var server_url = "slapps.fr/apollo/ror";
var server_port = "80";
var news_path = '/apollo/ror/news.json';
var sources_path = '/apollo/ror/sources.json';
*/
'use strict';

/* Services */

var mainServices = angular.module('mainServices', ['ngResource']);

mainServices.factory('Sources',function($http){
    var sources = {};
    sources.getSources = function(){
        return $http.get("http://"+server_url+':'+server_port+sources_path)
    };	
    return sources;
});
mainServices.factory('Users',function($http){
    //TODO REWORK
    var users = {};
    users.getProfile = function(email){
        if(email=="s"){
            //return $http.get("http://slapps.fr/rssReader2/ror/users/?.json")
            //TODO replace this mock / Update ROR model for users
            return {sources:["Challenges","JDG"]};
        }else if(email=="geek"){
            return {sources:["JDG","LifeHacker","Korben"]};
        }else{
            return {sources:[]};
        }
    };	
    return users;
});
mainServices.factory('News',function($http){
    var news = {};
    /*
    news.getLastNews = function(){
        return $http.get("http://slapps.fr/apollo/ror/news.json")
    };	
    */
    //TODO use resources
    news.getNews = function(date,callback){
        $http.get("http://"+server_url+":"+server_port+news_path+"?date="+normaliseDate(date)).success(function(news){
            var results = []
            news.forEach(function(n){
                n.time=formatDateRorToJs(n.date);
                results.push(n);
            })
            callback(results);
        })
    };
    return news;
});
var formatDateRorToJs = function(date){
    //return date.substring(8,10)+'/'+date.substring(5,7)+' '+date.substring(11,13)+':'+date.substring(14,16);
    return date.substring(11,13)+':'+date.substring(14,16);
};

var normaliseDate = function(date){
    var y = date.getFullYear();
    var m = ("0" + (date.getMonth() + 1)).slice(-2);
    var d = ("0" + date.getDate()).slice(-2);
    return y+m+d;
}
