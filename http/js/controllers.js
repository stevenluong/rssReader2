//prod
var serverSocket = "slapps.fr:3030";
//dev
//var serverSocket = "localhost:3030";
'use strict';

/* Controllers */

var rssReaderControllers = angular.module('rssReaderControllers', []);
rssReaderControllers.controller('NewsListCtrl', ['$scope','Sources','News','Users',
        function($scope, Sources, News, Users) {
            $scope.updateAllSources= function(){
                $scope.sources.forEach(function(s){
                    $scope.updateSource(s,true);
                });
            };
            $scope.updateNoneSources= function(){
                $scope.sources.forEach(function(s){
                    $scope.updateSource(s,false);
                });
            };
            /*
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
               */
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
            $scope.updateUser = function(news){
                //console.log(news);
            }
            $scope.updateSearch = function(w){
                $scope.query = w;
                $scope.updateAllSources();
                //$scope.email = "all";
                //$scope.updateProfile();
            }
            $scope.news = [];
            $scope.orderProp= "date";
            $scope.date = new Date();
            $scope.updateSpecificDate = function(){
                var date = new Date($scope.formattedDate);
                console.log(date);
                $scope.updateDate(date);
            }
            $scope.updateDate = function(date){
                $scope.news = []
                keywords = {}
                $scope.keywords = [];
                $scope.beforeDate = new Date(date.getTime() - 86400000);
                $scope.afterDate = new Date(date.getTime() + 86400000);;


                $scope.formattedDate=formatDate(date);

                News.getNews(date,function(news){
                    news.forEach(function(n){
                        $scope.news.push(n);
                        n.title.split(' ').forEach(function (word){
                            if(word in keywords)
                                keywords[word]++;
                            else
                                keywords[word]=1;
                        }); 
                    })
                    for(var i in keywords){
                        var keyword = {};
                        keyword.value = i;
                        keyword.count = keywords[i];
                        //console.log(keyword);
                        if(keyword.count>7 && keyword.value.length>4){
                            $scope.keywords.push(keyword);
                        }
                    }

                });
            }
            $scope.updateDate($scope.date);
        }]);
var formatDate= function(date){
    var d = ("0" + date.getDate()).slice(-2);
    var m = ("0" + (date.getMonth() + 1)).slice(-2);
    var y = date.getFullYear();
    return y+'-'+m+'-'+d;
};
