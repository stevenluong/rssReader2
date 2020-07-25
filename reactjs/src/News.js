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

export default function News({filteredNews}) {
  //var cleanedNews = props.news;
  var sortedNews = filteredNews.sort((a,b)=>(new Date(b.datetime))-(new Date(a.datetime)))
  const imgStyle = {
    "objectFit": "cover",
  };
  //console.log(sortedNews)
  return (
    <React.Fragment>
      <Title id="news">News</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
          <Hidden smDown>
            <TableCell>Image</TableCell>
            <TableCell>Source</TableCell>
          </Hidden>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedNews.map(n => (
            <TableRow key={n.link}>
            <Hidden smDown>
              <TableCell><img style={imgStyle} src={n.image_link} height="40" width="40" alt=""/></TableCell>
              <TableCell>{n.source} <br/> <small>{n.time}</small></TableCell>
            </Hidden>
              <TableCell><Link href={n.link}>{n.title} </Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
