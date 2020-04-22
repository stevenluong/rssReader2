import React from 'react';
import Title from './Title';
import Link from '@material-ui/core/Link';


export default function Keywords({news, filters, setFilters, setFiltered}) {
  var keywords = {}
  //console.log(props.news)
  news.map(n=>{
    var t = n.title;
    var s = t.split(" ")
    return s.map(i =>{
      if(i in keywords)
        keywords[i] = keywords[i]+1;
      else
        keywords[i] = 1
      return keywords[i]
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
  const handleKeywordAdd = (k) => {
    //var f = filters;
    console.log(k);
    //var f = Object.assign(filters, {keywords:[...filters.keywords,k]})
    var f = Object.assign(filters, {keywords:[k]})
    setFilters(f);
    setFiltered(false);
  }
  //console.log(rawKeywords)
  rawKeywords.sort(function(a, b){return b.count - a.count});
  rawKeywords = rawKeywords.slice(0,20);
  //console.log(keywords);
  return (
    <React.Fragment>
      <Title>Keywords</Title>
      <p>
      {rawKeywords.map((k,i) => (
        <span key={i}><Link onClick={()=>handleKeywordAdd(k.word)}>{k.word}</Link> ({k.count}) </span>
      ))}
      </p>
    </React.Fragment>
  );
}
