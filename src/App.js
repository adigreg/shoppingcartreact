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
    height: 650,
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

const ProductCards = ({products}) => {
  const classes = productCardStyles();

  return(
      <Grid container spacing={2} className={classes.grid}>       
      {products.map(product =>
        (<Grid item xs={6}>
          <Card className={classes.card}>
            <h1><strong>{product.title}</strong></h1>
            {product.style}
            <CardMedia><img src={"data/" + product.sku + "_1.jpg"}></img></CardMedia>
            <CardContent className={classes.content}>
              <div><strong>Price:</strong> {product.currencyFormat + " " + product.price + " " + product.currencyId}</div>
              <div>
              <Button className={classes.button} variant="contained" color="primary" size="large">Small</Button>
              <Button className={classes.button} variant="contained" color="primary" size="large">Medium</Button>
              <Button className={classes.button} variant="contained" color="primary" size="large">Large</Button>
              <Button className={classes.button} variant="contained" color="primary" size="large">XL</Button>
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
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <Container>
    <AppBar>
        <Typography variant="h6" className={classes.title} align="center">
          Shirt Supply
        </Typography>
    </AppBar>
    <ProductCards products={products} ></ProductCards>
    </Container>
  );
};

export default App;
