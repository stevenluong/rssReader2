import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Search from './Search';
import Keywords from './Keywords';
import Day from './Day';
import News from './News';


const useStyles = makeStyles(theme => ({

  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 150,
  },
}));

export default function Dashboard({user, updateUser, setUser, sourcesFilteredNews, keywordsFilteredNews, filters, setFilters, setKeywordsFiltered}) {
  const classes = useStyles();
  const paper = clsx(classes.paper);

  return (
    <React.Fragment>
    <Grid container direction="row" spacing={3}>
      <Grid item xs={12} md={9} lg={9}>
        <Paper className={classes.paper}>
          <News user={user} updateUser={updateUser} setUser={setUser} keywordsFilteredNews={keywordsFilteredNews}/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3} lg={3}>
        <Paper className={paper}>
          <Day user={user}/>
        </Paper>
        <br/>
        <Paper className={paper}>
          <Search sourcesFilteredNews={sourcesFilteredNews} keywordsFilteredNews={keywordsFilteredNews} filters={filters} setFilters={setFilters} setKeywordsFiltered={setKeywordsFiltered}/>
        </Paper>
        <br/>
        <Paper className={paper}>
          <Keywords sourcesFilteredNews={sourcesFilteredNews} keywordsFilteredNews={keywordsFilteredNews} filters={filters} setFilters={setFilters} setKeywordsFiltered={setKeywordsFiltered}/>
        </Paper>
      </Grid>
    </Grid>
    </React.Fragment>
  );
}
