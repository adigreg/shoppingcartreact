import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Drawer, List, ListItem } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Item from './Item';

const Cart = ({openstate,itemstate}) => {
    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
          },
        button: {
          margin: theme.spacing(1),
          position: 'absolute',
          left: '92%',
          top: 0
        },
        listEmpty: {
            width: '300px',
        },
        drawerlst: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        }
    }));

    const classes = useStyles();

    const toggle = (op) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        
        openstate.setOpen(op);
      };
    
      const deleteitem = (shirt) => {
        var newcart = itemstate.contents.filter(p => p != shirt);
        itemstate.changecart(newcart);
    }

    return (
        <React.Fragment>
            <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<ShoppingCartIcon></ShoppingCartIcon>}
            onClick={() => openstate.setOpen(true)}>
                Cart
            </Button>

            <Drawer anchor="right" open={openstate.open} onClose={toggle(false)}>
                <h1>My Cart</h1>
                <ListItem className={classes.listEmpty}></ListItem>
                <React.Fragment>
                    <List className={classes.drawerlst} component="nav" aria-label="main mailbox folders">
                        {itemstate.contents.map(item => 
                        <div><Item shirt={item}></Item>
                        <Button onClick={()=>{deleteitem(item)}}>Remove</Button></div>)}
                    </List>
                </React.Fragment>
                <Button color="primary" variant="contained" onClick={() => openstate.setOpen(false)}>Close</Button>
            </Drawer>
        </React.Fragment>
    )
}

export default Cart;