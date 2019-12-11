import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, List, ListItem, ListItemIcon, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

const Item = ({shirt}) => {

    const useStyles = makeStyles(theme => ({
        root: {
          height : 'auto',
          width : 'auto',
          }
      }));

    return (
        <ListItem key={shirt.sku} className={useStyles.root}>
        <ListItemAvatar>
            <Avatar src={"data/" + shirt.sku + "_2.jpg"}></Avatar>
        </ListItemAvatar>
        <ListItemText primary={shirt.title} secondary={"$" + shirt.price}/>
        </ListItem>
    )
}

export default Item;