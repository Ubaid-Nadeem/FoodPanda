// import * as React from 'react';
import logo from './foodpanda_logo.png'
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import './nav.css'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../Context/context';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';



function NavBar() {
  const navigate = useNavigate()
  let { user, setUser, cart,  setModal} = useContext(AppContext);
  const auth = getAuth();



  function notificationsLabel(count) {
    if (count === 0) {
      return 'no notifications';
    }
    if (count > 99) {
      return 'more than 99 notifications';
    }
    return `${count} notifications`;
  }




  const [currentUser, setCurrentUser] = useState({})


  const GoToCart = () => {
    if (window.location.pathname == "/user/cart") {
        window.history.back();
    }
    else {
        navigate("/user/cart")
    }


}


  function notificationsLabel(count) {
    if (count === 0) {
        return 'no notifications';
    }
    if (count > 99) {
        return 'more than 99 notifications';
    }
    return `${count} notifications`;
}


  return (<div className='navigation-bar'>

    <nav className="navbar bg-light" >
      <div className="container-fluid">

        <div>
          <img src={logo} className='nav-logo' />
        </div>


        <div className='nav-menu'>
          {
            window.location.pathname == "/login/new" ?
              <div> </div>
              :
              <div>
                {user == undefined ?
                  <div>
                    <Link to='/login/new' className='cart-color'>
                      <div className='Login-button'>
                        <div className='user-icon'>
                          <i className="fa-solid fa-user "> </i>
                        </div>
                        LOGIN
                      </div>
                    </Link>
                  </div>
                  :
                  <div>
                    <div className="nav-item dropdown user-Dropdown">
                      <div className="nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="true">
                        <i className="fa-solid fa-user "> </i>

                        <a >
                          {user.fisrtName}
                        </a>
                      </div>

                      <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                        <Link to="/profile" style={{ textDecoration: "none" }}>   <li><a style={{ cursor: "pointer" }} className="dropdown-item" >Profile</a></li></Link>
                        <Link to="/new/order" style={{ textDecoration: "none" }}> <li><a style={{ cursor: "pointer" }} className="dropdown-item" >Order & recording</a></li></Link>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => {
                          localStorage.removeItem("user")
                          setUser(undefined)
                          setModal("modal")

                        }}>Log out</a></li>
                      </ul>
                    </div>
                  </div>

                }
              </div>

          }

          <div className='cart'>
          <IconButton aria-label={notificationsLabel(100)} onClick={GoToCart}>
         <Badge badgeContent={cart == undefined ? 0 : cart.length} color="secondary">
             <ShoppingCartIcon style={{ color: "#d70f64" }} />
         </Badge>

        </IconButton >
          </div>


        </div>



      </div>
    </nav>


  </div>)


}

export default NavBar;