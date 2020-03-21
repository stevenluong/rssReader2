import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, imageUrl, url, title, source, time) {
  return { id, imageUrl, url, title, source, time };
}

const rows = [
  createData(0, 'https://www.challenges.fr/assets/img/2020/03/21/cover-r4x3w1000-5e7607e3b47fd-c07d9440a55fa00eec48853c49bbdb547679bfcc-jpg.jpg', 'https://www.challenges.fr/societe/irak-des-dizaines-de-milliers-de-pelerins-rassembles-malgre-le-coronavirus_703592', 'coronavirus il y a un mois une eternite le premier mort en italie', 'Challenges', '08:50'),
  createData(2, 'https://www.challenges.fr/assets/img/2020/03/21/cover-r4x3w1000-5e7607e3b47fd-c07d9440a55fa00eec48853c49bbdb547679bfcc-jpg.jpg', 'https://www.challenges.fr/societe/irak-des-dizaines-de-milliers-de-pelerins-rassembles-malgre-le-coronavirus_703592', 'coronavirus il y a un mois une eternite le premier mort en italie', 'Challenges', '08:50'),
  createData(4, 'https://www.challenges.fr/assets/img/2020/03/21/cover-r4x3w1000-5e7607e3b47fd-c07d9440a55fa00eec48853c49bbdb547679bfcc-jpg.jpg', 'https://www.challenges.fr/societe/irak-des-dizaines-de-milliers-de-pelerins-rassembles-malgre-le-coronavirus_703592', 'coronavirus il y a un mois une eternite le premier mort en italie', 'Challenges', '09:50'),
  createData(3, 'https://www.challenges.fr/assets/img/2020/03/21/cover-r4x3w1000-5e7607e3b47fd-c07d9440a55fa00eec48853c49bbdb547679bfcc-jpg.jpg', 'https://www.challenges.fr/societe/irak-des-dizaines-de-milliers-de-pelerins-rassembles-malgre-le-coronavirus_703592', 'coronavirus il y a un mois une eternite le premier mort en italie', 'Challenges', '08:50'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
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
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell><img src={row.imageUrl} height="50" width="50"/>{row.date}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.source}</TableCell>
              <TableCell><a href={row.url}>{row.title}</a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more news
        </Link>
      </div>
    </React.Fragment>
  );
}
