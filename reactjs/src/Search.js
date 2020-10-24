import React from 'react';
import Title from './Title';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import RemoveIcon from '@material-ui/icons/Remove';
import BackspaceIcon from '@material-ui/icons/Backspace';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

export default function Search({keywordsFilteredNews, sourcesFilteredNews, filters, setFilters, setKeywordsFiltered}) {
  //var search = {}
  const handleSearchChange = (search) => {
    var f = Object.assign(filters, {keywords:[search],noKeywords:[]})
    console.log(f)
    console.log(search)
    setFilters(f);
    setKeywordsFiltered(false);
  }

  //console.log(keywords);
  return (
    <React.Fragment>
      <div>
        <TextField id="outlined-basic" label="Search" variant="outlined" onChange={(e)=>handleSearchChange(e.target.value)}/>
      </div>
    </React.Fragment>
  );
}
