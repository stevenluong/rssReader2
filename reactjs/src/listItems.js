import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TripOriginIcon from '@material-ui/icons/TripOrigin';
import LayersIcon from '@material-ui/icons/Layers';
import BookmarkIcon from '@material-ui/icons/Bookmark';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BookmarkIcon />
      </ListItemIcon>
      <ListItemText primary="Topics" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Settings</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <TripOriginIcon />
      </ListItemIcon>
      <ListItemText primary="Sources" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
  </div>
);
export const thirdListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Log out" />
    </ListItem>
  </div>
);
