import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {FormControl, CardHeader, CardContent, CardMedia, Container} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Message, Title } from "rbx";
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Cart from './Cart';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const firebaseConfig = {
  apiKey: "AIzaSyCMvWfA3gAZtKzWNIGTwfqsueQMFKQwPSE",
  authDomain: "reactshopping-e88a1.firebaseapp.com",
  databaseURL: "https://reactshopping-e88a1.firebaseio.com",
  projectId: "reactshopping-e88a1",
  storageBucket: "reactshopping-e88a1.appspot.com",
  messagingSenderId: "715749167626",
  appId: "1:715749167626:web:abfe83bef7af1a405245f3"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();
const inventory = db.child("inventory");
const alldata = db.child("alldata");
const carts = db.child("carts");

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const Welcome = ({ user }) => (
  <Message color="info">
    <Message.Header>
      Welcome, {user.displayName}
      <Button primary onClick={() => firebase.auth().signOut()}>
        Log out
      </Button>
    </Message.Header>
  </Message>
);

const SignIn = () => (
  <StyledFirebaseAuth
    uiConfig={uiConfig}
    firebaseAuth={firebase.auth()}
  />
);

const Banner = ({ user, title }) => (
  <React.Fragment>
    { user ? <Welcome user={ user } /> : <SignIn /> }
    <Title>{ title || '[loading...]' }</Title>
  </React.Fragment>
);

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

const ProductCards = ({user,products,openstate,itemstate}) => {
  const classes = productCardStyles();

  const buyshirt = (prod,size) =>{
    if(size=="Small"){
        if(!(Object.keys(inventory).includes(prod.sku)) || (Object.keys(inventory).includes(prod.sku) && !(Object.keys(inventory).child(prod.sku).includes("Small")))){
          inventory.child(prod.sku).update({"Small":5})
        }
        const invval = Object.values(inventory.child(prod.sku))
        if(invval <= 0){
          return
        } else {
        var newcart = itemstate.contents.concat([prod]);
        itemstate.changecart(newcart)
        inventory.child(prod.sku).update({"Small":(invval-1)})
      }
    } else if(size=="Medium"){
      if(!(Object.keys(inventory).includes(prod.sku)) || (Object.keys(inventory).includes(prod.sku) && !Object.keys(inventory).child(prod.sku).includes("Medium"))){
        inventory.child(prod.sku).update({"Medium":5})
      }
      const invval = inventory.child(prod.sku)["Medium"]
      if(invval <= 0){
        return
      } else {
        var newcart = itemstate.contents.concat([prod]);
        itemstate.changecart(newcart)
        inventory.child(prod.sku).update({"Medium":(invval-1)})
      }
    } else if(size=="Large"){
      if(!(Object.keys(inventory).includes(prod.sku)) || (Object.keys(inventory).includes(prod.sku) && !Object.keys(inventory).child(prod.sku).includes("Large"))){
        inventory.child(prod.sku).update({"Large":5})
      }
      const invval = inventory.child(prod.sku)["Large"]
      if(invval <= 0){
        return
      } else {
        var newcart = itemstate.contents.concat([prod]);
        itemstate.changecart(newcart)
        inventory.child(prod.sku).update({"Large":(invval-1)})
      }
    } else if(size=="XL"){
      if(!(Object.keys(inventory).includes(prod.sku)) || (Object.keys(inventory).includes(prod.sku) && !Object.keys(inventory).child(prod.sku).includes("XL"))){
        inventory.child(prod.sku).update({"XL":5})
      }
      const invval = inventory.child(prod.sku)["XL"]
      if(invval <= 0){
        return
      } else {
        var newcart = itemstate.contents.concat([prod]);
        itemstate.changecart(newcart)
        inventory.child(prod.sku).update({"XL":(invval-1)})
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
              <Button id="s" onClick={()=>buyshirt(product,"Small")} className={classes.button} variant="contained" color="primary" size="large">Small</Button>  
              <Button id="m" onClick={()=>buyshirt(product,"Medium")} className={classes.button} variant="contained" color="primary" size="large">Medium</Button>
              <Button id="l" onClick={()=>buyshirt(product,"Large")} className={classes.button} variant="contained" color="primary" size="large">Large</Button>
              <Button id="xl" onClick={()=>buyshirt(product,"XL")} className={classes.button} variant="contained" color="primary" size="large">XL</Button>
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
  

  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);

  }, []);

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
    <Banner title="Shirt Shop" user={ user } />
    <Cart openstate={{open,setOpen}} itemstate={{contents,changecart}} user={user}></Cart>
    <ProductCards user={user} products={products} openstate={{open,setOpen}} itemstate={{contents,changecart}}></ProductCards>
    </div>
  );
};

export default App;
