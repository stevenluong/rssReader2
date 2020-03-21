import React from 'react';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Day() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>21/03/2020</Title>
      <Typography color="textSecondary" className={classes.depositContext}>
        Updated on 21/03/2020 09:00
      </Typography>
      <div>
        <Button color="primary" variant="contained" href="#" onClick={preventDefault}>
          Before
        </Button>
        <Button color="primary" variant="contained" href="#" onClick={preventDefault}>
          Today
        </Button>
      </div>
    </React.Fragment>
  );
}
