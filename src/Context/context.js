import React, { useState, createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
export const AppContext = createContext({});



export function AppProvider({ children }) {
    const URL = "https://food-panda-clone.herokuapp.com"
    // const URL = "http://localhost:400"

    const navigate = useNavigate()
    const [user, setUser] = useState(undefined)
    const [loader, setLoader] = useState(true)
    const [cart, setCart] = useState([])
    const [modal, setModal] = useState("")
    useEffect(() => {
        let ID = JSON.parse(localStorage.getItem("user"));
        let UserCart = JSON.parse(localStorage.getItem("UserCart")) || [];
        // console.log(UserCart)
        setCart(UserCart)
        // console.log(cartLegth)
        if (ID != undefined) {
            // setModal("")
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({
                "id": ID._id
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${URL}/getuser`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoader(false)
                    setUser(result)
                    setCart(result.cart)


                })
        } else {
            setLoader(false)
            // setModal("modal")
            console.log("no user")
        }

    }, [])




    // let CartUI = (value) => {


    //     return 

    //     // <IconButton aria-label={notificationsLabel(100)} onClick={GoToCart}>
    //     // </IconButton>
    // }

    return (
        <AppContext.Provider value={{user, setUser, loader, setLoader, cart, setCart, modal, setModal }}>
            {children}
        </AppContext.Provider>
    )
}