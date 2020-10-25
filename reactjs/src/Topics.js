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
import BackspaceIcon from '@material-ui/icons/Backspace';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(5),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

export default function Topics({user,setUser, updateUser, topics, setTopics}) {
  const classes = useStyles();
  //var keywords = {}
  //var userSources = user.sources;
  //if(sources)
  //console.log(user)
  //var topics = {"test":3};
  var t = []
  if(topics)
    t = topics;
  const handleRemoveTopic = (topic) => {
    //var f = filters;
    if(t.indexOf(topic)!=-1){
      t.splice(t.indexOf(topic),1)
      setTopics(t);
      var u = Object.assign(user, {topics:t})
      setUser(u);
      updateUser(u);
    }
  }
  const handleAddTopic = (e) => {
    console.log(e.keyCode)
    if(e.keyCode == 13){
      console.log("IN")
      if(t.indexOf(e.target.value)==-1){
        var tmp = t.push(e.target.value)
        setTopics(tmp)
        var u = Object.assign(user, {topics:t})
        setUser(u);
        updateUser(u);
      }
    }
    //var f = filters;
  }
  console.log(user.topics);
  //if(user.topics){
  //  topics = user.topics;
  //}
  //Object.keys(topics).forEach(t=>{
  //  allTopics.push({
  //    topic:t,
  //    count:topics[t]
  //  })
  //})
  //sortedTopics = allTopics.sort((a,b) => (b.count-a.count))
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
      {t.map((topic) => (
        <React.Fragment key={t}>
        {topic}
        <IconButton
        size="small"
        onClick={()=>handleRemoveTopic(topic)}
        >
        <BackspaceIcon/>
        </IconButton>

        <br/>
        </React.Fragment>
      ))}
      <TextField label="Add" variant="outlined" onKeyDown={(e)=>handleAddTopic(e)}/>
      </div>

      </Paper>
      </Grid>
    </Grid>
  );
}
