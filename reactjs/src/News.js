import React from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function News(props) {
  //var cleanedNews = props.news;
  //var cleanedNews = props.news.filter((a,b)=>props.news[a].title===props.news[b].title)
  return (
    <React.Fragment>
      <Title>News</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.news.map(n => (
            <TableRow key={n.guid}>
              <TableCell><img src={n.image_link} height="50" width="50" alt=""/></TableCell>
              <TableCell>{n.datetime}</TableCell>
              <TableCell>{n.source}</TableCell>
              <TableCell><Link variant="subtitle1" href={n.link}>{n.title} </Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
