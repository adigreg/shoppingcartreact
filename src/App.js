import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {FormControl, CardHeader, CardContent, CardMedia, Container} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Cart from './Cart';

const pageOneStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 25,
  },
  searchBar: {
    alignItems: "center",
    marginLeft: 50,
    paddingTop: 300,
    paddingBottom: 200,
    // backgroundColor: 'rgba(44, 45, 51, 0.3)',
    // backgroundSize: 'cover',
  },
  searchInput: {
    width: '70%', 
    height: 30,
    fontFamily: "Helvetica",
    fontSize: 16,
    marginTop: 30,
    paddingLeft: 15, 
  },
  logo: {
    width: 25,
    height: 25,
    marginLeft: 3,
    marginBottom: -3,
  },
  summary: {
    color: 'white',
    textAlign: "center",
  },
  button: {
    color: 'white',
  },
  overlay: {
    backgroundColor: 'rgba(44, 45, 51, 0.3)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }
}));

const productCardStyles = makeStyles(theme => ({
  grid: {
    alignContent: 'center',
    marginTop: 75
  },
  card:{
    display:"flex",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: 500,
    height: 750,
    paddingTop: 20,
  },
  button:{
    display: "inline-block",
    margin: "5px"
  },
  content:{
    display:"flex",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }
}));

const ProductCards = ({products,openstate,itemstate,small,med,large,xl}) => {
  const classes = productCardStyles();

  const buyshirt = (prod,size) =>{
    if(size=="Small"){
        if(small.invsmall <= 0){
          return
        } else {
        var newcart = itemstate.contents.concat([prod]);
        itemstate.changecart(newcart)
        small.invsmallchange(small.invsmall-1)
      }
    } else if(size=="Medium"){
      if(med.invmed <= 0){
        return
      } else {
        var newcart = itemstate.contents.concat([prod]);
        itemstate.changecart(newcart)
        med.invmedchange(med.invmed-1)
      }
    } else if(size=="Large"){
      if(large.invlarge <= 0){
        return
      } else {
        var newcart = itemstate.contents.concat([prod]);
        itemstate.changecart(newcart)
        large.invlargechange(large.invlarge-1)
      }
    } else if(size=="XL"){
      if(xl.invxl <= 0){
        return
      } else {
        var newcart = itemstate.contents.concat([prod]);
        itemstate.changecart(newcart)
        xl.invxlchange(xl.invxl-1)
      }
    }
    openstate.setOpen(true)
  }

  return(
      <Grid container spacing={2} className={classes.grid}>       
      {products.map(product =>
        (<Grid item xs={6}>
          <Card key={product.sku} className={classes.card}>
            <h1><strong>{product.title}</strong></h1>
            {product.style}
            <CardMedia><img src={"data/" + product.sku + "_1.jpg"}></img></CardMedia>
            <CardContent className={classes.content}>
              <div><strong>Price:</strong> {product.currencyFormat + " " + product.price + " " + product.currencyId}</div>
              <div>
              <Button id="s" onClick={()=>buyshirt(product,"Small")} className={classes.button} variant="contained" color="primary" size="large">Small, {small.invsmall} left!</Button>  
              <Button id="m" onClick={()=>buyshirt(product,"Medium")} className={classes.button} variant="contained" color="primary" size="large">Medium, {med.invmed} left!</Button>
              <Button id="l" onClick={()=>buyshirt(product,"Large")} className={classes.button} variant="contained" color="primary" size="large">Large, {large.invlarge} left!</Button>
              <Button id="xl" onClick={()=>buyshirt(product,"XL")} className={classes.button} variant="contained" color="primary" size="large">XL, {xl.invxl} left!</Button>
              </div>
            </CardContent>
          </Card>
      </Grid>))}
     </Grid>
  )
}

const App = () => {
  const classes = pageOneStyles();
  const [data, setData] = useState({});
  const products = Object.values(data);

  const [open, setOpen] = React.useState(false); //state for if the cart is open or closed
  const [contents,changecart] = React.useState([]); //state for the contents in the cart

  const [invsmall,invsmallchange] = React.useState(5);
  const [invmed,invmedchange] = React.useState(5);
  const [invlarge,invlargechange] = React.useState(5);
  const [invxl,invxlchange] = React.useState(5);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <div>
    <h1>Shirt Shop</h1>
    <Cart openstate={{open,setOpen}} itemstate={{contents,changecart}}></Cart>
    <ProductCards products={products} openstate={{open,setOpen}} itemstate={{contents,changecart}} small={{invsmall,invsmallchange}} med={{invmed,invmedchange}} large={{invlarge,invlargechange}} xl={{invxl,invxlchange}}></ProductCards>
    </div>
  );
};

export default App;
