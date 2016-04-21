'use strict'

/* Filters */

angular.module('rssReaderFilters',[]).filter('sourcesFilter', function(){
		return function(news,scope){
		var filteredNews = []
		console.log(scope.sources);
		news.forEach(function(n){
				scope.sources.forEach(function(s){		
						if(s.display && s.name==n.source){
						filteredNews.push(n)
						}
						})
				});
		console.log(filteredNews);
		return filteredNews;
		};
		});
