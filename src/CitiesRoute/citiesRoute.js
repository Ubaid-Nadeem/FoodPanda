import React from "react";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../Context/context";
import NavBar from "../Navbar/navbar";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Container } from "@mui/system";
import Cover from './cover2.png'
import { useNavigate } from "react-router-dom";
import './style.css'
const URL = "https://food-panda-clone.herokuapp.com"
// const URL = "http://localhost:400"


export function Karachi() {
    let { user, setUser, loader, setLoader } = useContext(AppContext);
    const navigate = useNavigate('')
    const [imagePath, setImagePath] = useState(null);
    const [shops, setShops] = useState([])


    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "city": "Karachi"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${URL}/getshops`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                setShops(result)
                setLoader(false)
            })

    }, [])

    const setDish = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "DishName": "Pizza",
            "Discription": "Pizza with extra cheese",
            "Price": 700,
            "Delivery": "free",
            "Location": "karachi",
            "Rating": 0,
            "Duration": "45 min",
            "Autor": "63165baa892abc4b46245fd6"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${URL}/addDish`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
            })

    }

    // const senddata = () => {
    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     var raw = JSON.stringify({
    //         "City": "Karachi",
    //         "Thumbnail" : "https://firebasestorage.googleapis.com/v0/b/foodpanda-clone-67af8.appspot.com/o/shopthumbnail%2Fpizza.jpg?alt=media&token=3ed5f009-6722-4086-80f2-eebc902b3ce7",
    //         "ShopName": "Pizza hut",
    //         "Dishes": {
    //             DishName: "Cheese Pizza",
    //             Discription: "Cheese Pizza",
    //             Price: 700,
    //             Delivery: "Rs 99",
    //             Location: "Karachi",
    //             Rating: 0,
    //             Duration: "20 min"
    //         },
    //         "id": "63165baa892abc4b46245fd6"

    //     });

    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow'
    //     };

    //     fetch(`${URL}/highrateddish`, requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             console.log(result)
    //         })

    // }

    const setPicture = (event) => {

        const storage = getStorage();
        const storageRef = ref(storage, `shopthumbnail/${event.target.files[0].name}`);

        const uploadTask = uploadBytesResumable(storageRef, event.target.files[0]);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                });
            }
        );


        // );





    }

    const getShopData = (value) => {
        // console.log(value)
        setLoader(true)
        navigate(`/restaurant/${value._id}`)

    }
    return <div>
        <NavBar />
        <div className="body">
            <Container>
                <h1>Food and groceries delivery from  <b> ڪراچي Karachi’</b>s best restaurants and shops </h1>
                <h3>Popular restaurants</h3>
                <div className="main-container">
                    {shops == undefined && shops.length == 0 ? <div> </div> : shops.map((value, id) => {
                        return <div key={id} className="shopContainer" onClick={() => getShopData(value)}>
                            <img src={value.Thumbnail} />
                            <h2>{value.ShopName}</h2>
                        </div>
                    })}
                </div>
            </Container>
        </div>
    </div>
}

export function Islamabad() {
    let { user, setUser, loader, setLoader } = useContext(AppContext);
    const navigate = useNavigate('');
    const [shops, setShops] = useState([])

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "city": "Islamabad"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${URL}/getshops`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                setShops(result)
                setLoader(false)
            })
    }, [])


    const getShopData = (value) => {
        console.log(value)
        navigate(`/restaurant/${value._id}`)
    }
    return <div>
        <NavBar />
        <div className="body">
            <Container>
                <h1>Food and groceries delivery from <b> وفاقی دارالحکومت اسلام آباد’</b>s best restaurants and shops </h1>
                <h3>Popular restaurants</h3>
                <div className="main-container">
                    {shops == undefined && shops.length == 0 ? <div> </div> : shops.map((value, id) => {
                        return <div key={id} className="shopContainer" onClick={() => getShopData(value)}>
                            <img src={value.Thumbnail} />
                            <h2>{value.ShopName}</h2>
                        </div>
                    })}
                </div>

            </Container>
        </div>
    </div>
}

export function Rawalpindi() {
    let { user, setUser, loader, setLoader } = useContext(AppContext);
    const navigate = useNavigate('');
    const [shops, setShops] = useState([])

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "city": "Rawalpindi"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${URL}/getshops`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false)
                // console.log(result)
                setShops(result)

            })
    }, [])


    const getShopData = (value) => {
        console.log(value)
        navigate(`/restaurant/${value._id}`)
    }
    return <div>
        <NavBar />
        <div className="body">
            <Container>
                <h1>Food and groceries delivery from <b> راولپنڈی’</b>s best restaurants and shops</h1>
                <h3>Popular restaurants</h3>
                <div className="main-container">
                    {shops == undefined && shops.length == 0 ? <div> </div> : shops.map((value, id) => {
                        return <div key={id} className="shopContainer" onClick={() => getShopData(value)}>
                            <img src={value.Thumbnail} />
                            <h2>{value.ShopName}</h2>
                        </div>
                    })}
                </div>

            </Container>
        </div>
    </div >

}
export function Multan() {
    let { user, setUser, loader, setLoader } = useContext(AppContext);
    const navigate = useNavigate('')
    const [shops, setShops] = useState([])

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "city": "Multan"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${URL}/getshops`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                setShops(result)
                setLoader(false)
            })
    }, [])

    const getShopData = (value) => {
        console.log(value)
        navigate(`/restaurant/${value._id}`)
    }
    return <div>
        <NavBar />
        <div className="body">
            <Container>
                <h1>Food and groceries delivery from <b> مُلتان’</b>s best restaurants and shops</h1>
                <h3>Popular restaurants</h3>

                <div className="main-container">
                    {shops == undefined && shops.length == 0 ? <div> </div> : shops.map((value, id) => {
                        return <div key={id} className="shopContainer" onClick={() => getShopData(value)}>
                            <img src={value.Thumbnail} />
                            <h2>{value.ShopName}</h2>
                        </div>
                    })}
                </div>
            </Container>
        </div>

    </div>

}
