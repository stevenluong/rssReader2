'use strict'

/* Filters */

angular.module('rssReaderFilters',[]).filter('sourcesFilter', function(){
	return function(news,scope){
		var filteredNews = []
		news.forEach(function(n){
			if(scope.checkboxModel[n.source]){
				filteredNews.push(n)
			}
		});
		return filteredNews;
	};
});
