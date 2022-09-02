import React, { useState, createContext, useEffect } from 'react'

export const AppContext = createContext({});



export function AppProvider({ children }) {
    const URL = "https://food-panda-clone.herokuapp.com"

    const [user, setUser] = useState(undefined)
    const [loader, setLoader] = useState(true)
    useEffect(() => {

            let ID = JSON.parse(localStorage.getItem("user"));
           console.log(ID)
            if (ID != undefined) {
                console.log("done")
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
                    })
            } else {
                setLoader(false)
            }
        
    },[])


    return (
        <AppContext.Provider value={{ user, setUser, loader, setLoader }}>
            {children}
        </AppContext.Provider>
    )
}