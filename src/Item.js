import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

const Item = ({shirt}) => {

    const useStyles = makeStyles(theme => ({
        root: {
          height : 'auto',
          width : 'auto',
          }
      }));

    return (
        <ListItem className={useStyles.root}>
        <ListItemAvatar>
            <Avatar src={"data/" + shirt.sku + "_2.jpg"}></Avatar>
        </ListItemAvatar>
        <ListItemText primary={shirt.title + " (" + shirt.size + ")"} secondary={"$" + shirt.price}/>
        </ListItem>
    )
}

export default Item;