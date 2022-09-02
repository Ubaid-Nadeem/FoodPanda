import logo from './foodpanda_logo.png'
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

function NavBar() {

  const auth = getAuth();
  let { user, setUser } = useContext(AppContext);

  const [currentUser, setCurrentUser] = useState({})



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
                          {user[0].fisrtName}
                        </a>
                      </div>

                      <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                        <Link to="/profile" style={{ textDecoration: "none" }}>   <li><a style={{ cursor: "pointer" }} className="dropdown-item" >Profile</a></li></Link>
                        <Link to="/new/order" style={{ textDecoration: "none" }}> <li><a style={{ cursor: "pointer" }} className="dropdown-item" >Order & recording</a></li></Link>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => {
                          localStorage.removeItem("user")
                          setUser(undefined)
                        }}>Log out</a></li>
                      </ul>
                    </div>
                  </div>

                }
              </div>

          }

          <div className='cart'>
            <i className="fa-solid fa-bag-shopping"></i>
          </div>


        </div>



      </div>
    </nav>

    
  </div>)


}

export default NavBar;