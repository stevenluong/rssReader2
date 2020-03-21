import React from 'react';
import Title from './Title';



export default function Keywords(props) {
  var keywords = {}
  //console.log(props.news)
  props.news.map(n=>{
    var t = n.title;
    var s = t.split(" ")
    s.map(i =>{
      if(i in keywords)
        keywords[i] = keywords[i]+1;
      else
        keywords[i] = 1
    })
  })
  var rawKeywords = []
  for(var key in keywords){
    if(key.length>4) //FILTER
      rawKeywords.push({
        word:key,
        count:keywords[key]
      })
  }
  //console.log(rawKeywords)
  rawKeywords.sort(function(a, b){return b.count - a.count});
  var filteredKeywords = [];
  for(var i=0;i<10;i++){
      //console.log(rawKeywords);
      if(rawKeywords[i]){
      var keyword = rawKeywords[i].word
      var count = rawKeywords[i].count
      filteredKeywords.push(<div key={i}><a href="/#">{keyword}</a> - {count}</div>)
    }
  }
  console.log(keywords);
  return (
    <React.Fragment>
      <Title>Keywords</Title>
      {filteredKeywords}
    </React.Fragment>
  );
}
