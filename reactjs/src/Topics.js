import React from 'react';
import Title from './Title';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(5),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

export default function Topics({user}) {
  const classes = useStyles();
  //var keywords = {}
  //var userSources = user.sources;
  //if(sources)
  //console.log(user)
  //var topics = {"test":3};
  var allTopics = []
  var sortedTopics = []
  var topics = {}
  if(user.topics){
    topics = user.topics;
  }
  Object.keys(topics).forEach(t=>{
    allTopics.push({
      topic:t,
      count:topics[t]
    })
  })
  sortedTopics = allTopics.sort((a,b) => (b.count-a.count))
  //topics = user.topics;
  //var sortedTopics = []

  //console.log(topics);
  //console.log(Object.keys(topics));
  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12}>
      <Paper className={classes.paper}>
      <Title>Topics</Title>
      <div>
      {sortedTopics.map(t => (
        <React.Fragment key={t.topic}>
        {t.topic} - {t.count}
        <br/>
        </React.Fragment>
      ))}
      </div>

      </Paper>
      </Grid>
    </Grid>
  );
}
