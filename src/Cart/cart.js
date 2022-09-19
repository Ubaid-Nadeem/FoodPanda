import { useContext, useState, useEffect } from "react";
import { AppContext } from "../Context/context";
import NavBar from "../Navbar/navbar";
import './cart.css'
import { useNavigate } from "react-router-dom"; import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Burger from './burger.jpg'
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Container } from "@mui/system";
// import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import EmptyCart from './empty-cart.png'


// import React from 'react';
function Cart() {
  let { user, setUser, loader, setLoader, cart, setCart } = useContext(AppContext);
  const [totalPayment, setTotalPayment] = useState(null)
  const navigate = useNavigate()

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));




  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  useEffect(() => {
    let Total = 0
    let UserCart = JSON.parse(localStorage.getItem("UserCart")) || [];
    //  console.log(UserCart)
    if (UserCart.length != 0) {
      cart.forEach((value) => {
        Total = Total + value.totalPrice
      })  
      setTotalPayment(Total)

    }
  })

  return (<div>
    <NavBar />
    <Container>

      <div className="cart-div">

        {cart == undefined ? <h6>Loading....</h6> :
          cart.length == 0 ?
            <div className="emptycart-div">
              <img src={EmptyCart} className="EmptyCart" />

            </div> :
            <div>
              <Grid container spacing={1}>
                <Grid md={8} container spacing={1}>
                  {cart.map((value, key) => {
                    return <Grid item xs={12} key={key}>
                      <Item>
                        <h5 className="dishName">{value.DishName}</h5>
                        <p>{value.Discription}</p>
                        <p className="price">Rs {value.totalPrice}</p>
                        <button onClick={() => {
                          if (value.quantity > 1) {
                            let add = cart[key].quantity - 1
                            cart[key].quantity = add
                            cart[key].totalPrice = value.quantity * value.Price
                            localStorage.setItem("UserCart", JSON.stringify(cart));
                            let UserCart = JSON.parse(localStorage.getItem("UserCart")) || [];
                            setCart(UserCart)

                          }

                        }} className="decrement">-</button>
                        {value.quantity}
                        <button onClick={() => {
                          let add = cart[key].quantity + 1
                          cart[key].quantity = add
                          cart[key].totalPrice = value.quantity * value.Price
                          localStorage.setItem("UserCart", JSON.stringify(cart));
                          let UserCart = JSON.parse(localStorage.getItem("UserCart")) || [];
                          setCart(UserCart)
                          console.log(cart)
                        }} className="increment">+</button>

                        <Button onClick={() => {
                          cart.splice(key, 1)
                          // console.log(cart)
                          localStorage.setItem("UserCart", JSON.stringify(cart));
                          let UserCart = JSON.parse(localStorage.getItem("UserCart")) || [];
                          // console.log(UserCart)
                          setCart(UserCart)
                        }}>Remove</Button>
                      </Item>
                    </Grid>
                  })
                  }
                </Grid>
                <Grid item xs={12} md={4}>
                  <Item>
                    <p><b>Shopping Details</b></p>
                    <p>  <b>Total : {totalPayment}</b> </p>
                    <p><b>Delivery Charges : {cart[0].Delivery}</b> </p>
                    <p> <b>Payment Method :</b> Cash on Delivery</p>
                  </Item>
                </Grid>

              </Grid>
              <Button variant="contained" style={{ marginTop: "10px" }}
                onClick={() => {
                  localStorage.removeItem("UserCart");
                  setCart([])
                }}
              >All Delete</Button>

            </div>
        }


      </div>
    </Container>

  </div>)
}
export default Cart