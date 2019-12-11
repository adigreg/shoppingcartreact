import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

const Item = ({shirt}) => {

    return (
        <ListItem>
        <ListItemAvatar>
            <Avatar src={"data/" + shirt.sku + "_2.jpg"}></Avatar>
        </ListItemAvatar>
        <ListItemText primary={shirt.title} secondary={"$" + shirt.price} />
        </ListItem>
    )
}

export default Item;