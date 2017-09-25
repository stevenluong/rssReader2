var server_host = "apollo-loopback.slapps.fr";
var server_port = "80";
var news_path = '/api/News';
var sources_path = '/api/Sources';
'use strict';

/* Services */

var mainServices = angular.module('mainServices', ['ngResource']);

mainServices.factory('Sources',function($http){
    var sources = {};
    sources.getSources = function(){
        return $http.get("http://"+server_host+':'+server_port+sources_path)
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
        var start = date;
        start.setHours(0,0,0,0);
        var s = start.toISOString();
        console.log(s);
        var end = date;
        end.setHours(23,59,59,999);
        var e = end.toISOString();
        console.log(e);
        $http.get("http://"+server_host+":"+server_port+news_path+'?filter={"where":{"datetime":{"gt":"'+s+'","lt":"'+e+'"}}}').success(function(news){//+normaliseDate(date)).success(function(news){
            var results = []
            news.forEach(function(n){
                n.time=formatDateRorToJs(new Date(n.datetime).toString());
                results.push(n);
            })
            console.log(results);
            callback(results);
        })
    };
    return news;
});
var formatDateRorToJs = function(date){
    return date.substring(16,18)+':'+date.substring(19,21);
};

var normaliseDate = function(date){
    var y = date.getFullYear();
    var m = ("0" + (date.getMonth() + 1)).slice(-2);
    var d = ("0" + date.getDate()).slice(-2);
    return y+m+d;
}
