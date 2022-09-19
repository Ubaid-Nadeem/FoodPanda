
import { useEffect, useState, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { AppContext } from "./Context/context";
import Home from './Home/home'
import Profile from "./Profile/profile";
import AuthNewUser from "./Auth/auth";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AppProvider } from "./Context/context";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import PreLoader from "./Pre-Loader/preloader";
import { Karachi, Islamabad, Rawalpindi, Multan } from "./CitiesRoute/citiesRoute";
import Restaurant from "./Restaurant/restaurant";
import Cart from "./Cart/cart";


function App() {
  const [activeUser, setActiveUser] = useState({})
  const [open, setOpen] = useState(false);
  let { user, setUser, loader, setLoader } = useContext(AppContext);

  const firebaseConfig = {
    apiKey: "AIzaSyCXF5vwAqKQnTIlIz4YCVcD8dMtmIet5L8",
    authDomain: "foodpanda-clone-67af8.firebaseapp.com",
    projectId: "foodpanda-clone-67af8",
    storageBucket: "foodpanda-clone-67af8.appspot.com",
    messagingSenderId: "754785505974",
    appId: "1:754785505974:web:8e72fb563105e2d87e4c17",
    measurementId: "G-GSVYXTKZZ8"
  };

  const handleClose = () => {
    // setOpen(false);
  };
  const handleToggle = () => {
    // setOpen(!open);
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  // const URL = "http://localhost:400"


  useEffect(() => {
    return () => {


    }
  })

  return (
    <div className="App">
      <AppProvider>
        <Routes>
          <Route path='/' element={<Home CurrentUser={activeUser} />} />
          <Route path='/login/new' element={<AuthNewUser />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/city/karachi" element={<Karachi />} />
          <Route path="/city/islamabad" element={<Islamabad />} />
          <Route path="/city/multan" element={<Multan />} />
          <Route path="/city/rawalpindi" element={<Rawalpindi />} />
          <Route path={`/restaurant/:id`} element={<Restaurant />} />
          <Route path="/user/cart" element={<Cart />} />
        </Routes>
        <PreLoader />
      </AppProvider>

    </div>
  );
}

export default App;
