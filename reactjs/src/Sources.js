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

export default function Sources({user,setUser, sources,filters, setFilters, setFiltered, updateUser}) {
  const classes = useStyles();
  //var keywords = {}
  var userSources = user.sources;
  //const [userSources, setUserSources] = React.useState([]);
  //setUserSources(user.sources);
  console.log(user);
  const handleSourceChange = (s) => {
    //var f = filters;
    //console.log(s);
    //console.log(userSources.indexOf(s.name));
    if(userSources.indexOf(s.name)==-1){
      userSources.push(s.name)
    }else{
      userSources.splice(userSources.indexOf(s.name),1)
    }
    //user.sources=userSources;
    //console.log(user.sources);
    //console.log(userSources);
    var u = Object.assign(user, {sources:userSources})
    updateUser(u);
    setUser(u);
    setFiltered(false);
    //var f = Object.assign(filters, {keywords:[...filters.keywords,k]})
    //var f = Object.assign(filters, {sources:userSources})
    //setFilters(f);
    //setFiltered(false);
  }
  const checked = (s) => {
    return userSources.indexOf(s.name)!=-1
  }

  //console.log(keywords);
  return (
    <Grid container>
      <Grid item xs={6}>
      <Paper className={classes.paper}>
      <Title>Sources</Title>
      <div>
      {sources.map((s,i) => (
        <React.Fragment key={s.name}>
        <Checkbox
         checked={checked(s)}
         color="primary"
         onClick={()=>handleSourceChange(s)}
        />
        {s.name} - {s.language}
        <br/>
        </React.Fragment>
      ))}
      </div>

      </Paper>
      </Grid>
    </Grid>
  );
}
