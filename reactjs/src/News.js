import React from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Hidden from '@material-ui/core/Hidden';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';

export default function News({user, updateUser, setUser, keywordsFilteredNews}) {
  //var cleanedNews = props.news;
  var sortedNews = keywordsFilteredNews.sort((a,b)=>(new Date(b.datetime))-(new Date(a.datetime)))
  const imgStyle = {
    "objectFit": "cover",
  };
  var latestNews ={};
  if(user.latestNews)
    latestNews = user.latestNews;
  const handleLinkClick = (n) => {
    console.log(n);
    var t = {};
    if(user.interests)
      t = user.interests;
    var s = n.title.split(" ");
    s.forEach(w => {
      if(w.length<4)
        return false;
      console.log(w);
      if(w in t)
        t[w] = t[w]+1;
      else
        t[w] = 1
    })
    //console.log(t);
    var u = Object.assign(user, {interests:t})
    if(!user.latestNews || user.latestNews.datetime<n.datetime)
      u.latestNews = n
    console.log(u);
    setUser(u);
    updateUser(u);
  }
  //console.log(user.visits)
  return (
    <React.Fragment>
      <Title id="news">News ({sortedNews.length})</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
          <Hidden xlDown>
            <TableCell>Image</TableCell>
          </Hidden>
            <TableCell>Time-Source</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedNews.map(n => (
            <TableRow key={n.link}>
            <Hidden xlDown>
              <TableCell><img style={imgStyle} src={n.image_link} height="40" width="40" alt=""/></TableCell>
            </Hidden>
              <TableCell><small>{n.time}<br/>{n.source}</small></TableCell>
              <TableCell>
              <VerticalAlignTopIcon style={latestNews._id!=n._id?{display: 'none'}:{}}/>
              <Link href={n.link} target="_blank" rel="noopener noreferrer" onClick={()=>handleLinkClick(n)}>{n.title} </Link>
               </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
