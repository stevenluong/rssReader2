import React from 'react';
import Title from './Title';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import RemoveIcon from '@material-ui/icons/Remove';
import BackspaceIcon from '@material-ui/icons/Backspace';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

export default function DashboardTopics({keywordsFilteredNews, sourcesFilteredNews, filters, setFilters, setKeywordsFiltered}) {
  var map = {}
  var topics = ["tesla","qantas","amazon","anz","atlassian"]
  //console.log(props.news)
  topics.forEach(t=>{
    map[t]=0;
  })
  sourcesFilteredNews.map(n=>{
    var t = n.title;
    var s = t.split(" ")
    return s.map(i =>{
      if(topics.indexOf(i)!=-1){
          map[i] = map[i]+1;
      }
      return map[i]
    })
  })
  var rawTopics = []
  for(var key in map){
      rawTopics.push({
        word:key,
        count:map[key]
      })
  }

  const handleNoKeywordChange = (keyword) => {
    //var f = filters;
    var k = filters.noKeywords;
    console.log(keyword);
    if(k.indexOf(keyword)==-1)
      k.push(keyword);
    else {
      k.splice(k.indexOf(keyword),1)
    }
    //var f = Object.assign(filters, {keywords:[...filters.keywords,k]})
    var f = Object.assign(filters, {noKeywords:k})
    setFilters(f);
    setKeywordsFiltered(false);
  }
  const handleReset = () => {
    //var f = filters;
    //console.log(k);
    //var f = Object.assign(filters, {keywords:[...filters.keywords,k]})
    var f = Object.assign(filters, {keywords:[],noKeywords:[]})
    setFilters(f);
    setKeywordsFiltered(false);
  }
  const handleKeywordChange = (keyword) => {
    //var f = filters;
    //console.log(k);
    //var f = Object.assign(filters, {keywords:[...filters.keywords,k]})
    var k = filters.keywords;
    console.log(keyword);
    if(k.indexOf(keyword)==-1)
      k.push(keyword);
    else {
      k.splice(k.indexOf(keyword),1)
    }
    var f = Object.assign(filters, {keywords:k,noKeywords:[]})
    setFilters(f);
    setKeywordsFiltered(false);
  }
  //console.log(rawKeywords)
  //rawTopics.sort(function(a, b){return b.count - a.count});
  //rawKeywords = rawKeywords.slice(0,20);

  //console.log(keywords);
  return (
    <React.Fragment>
      <Title>Topics</Title>
      <div>
      {rawTopics.map((k,i) => (
        <React.Fragment key={k.word}>
        <Checkbox
          checked={filters.keywords.indexOf(k.word)!=-1}
          color="primary"
          size="small"
          //multiple ?
          style={filters.keywords.indexOf(k.word)!=-1?{}:{ display: 'none' }}
          onClick={()=>handleKeywordChange(k.word)}
        />
        <Link onClick={()=>handleKeywordChange(k.word)}>{k.word}</Link> ({k.count})
      <IconButton
      size="small"
      onClick={()=>handleNoKeywordChange(k.word)}
      style={filters.noKeywords.indexOf(k.word)!=-1?{}:{ display: 'none' }}
      >
        <BackspaceIcon fontSize="inherit"/>
      </IconButton>
      <IconButton
      size="small"
      onClick={()=>handleNoKeywordChange(k.word)}
      style={filters.noKeywords.indexOf(k.word)!=-1?{display: 'none'}:{}}
      >
        <BackspaceOutlinedIcon fontSize="inherit"/>
      </IconButton>

        <br/>
        </React.Fragment>
      ))}
      </div>
      <Button color="primary" variant="outlined" href="#" onClick={handleReset}>
        Reset
      </Button>

    </React.Fragment>
  );
}
