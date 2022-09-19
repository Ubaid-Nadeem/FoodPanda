import { useEffect, useState, useContext } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import NavBar from "../Navbar/navbar";
import { Container } from "@mui/system";
import { AppContext } from "../Context/context";
import './restaurant.css'
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Restaurant() {
    let { user, setUser, loader, setLoader, cart, setCart, modal, setModal } = useContext(AppContext);
    let naviagte = useNavigate()


    let [searchParams, setSearchParams] = useSearchParams();
    let ShopID = useParams();
    // const URL = "http://localhost:400"
    const URL = "https://food-panda-clone.herokuapp.com"

    const [restaurant, setRestaurant] = useState({})
    const [myCart, setMyCart] = useState({})
    useEffect(() => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id": ShopID.id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${URL}/viewshop`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log(result)
                setRestaurant(result)
                setLoader(false)
            })

    }, [])





    return (<div>
        <NavBar />
        <div className="restaurant-profile-main">
            <div className="restaurant-info">
                <div style={{
                    backgroundImage: `url(${restaurant.Thumbnail})`,
                    width: "100%",
                    height: "250px",
                    backgroundSize: "cover",
                    backgroundPosition: "center"


                }}>
                </div>
                <Container>
                    <h1>{restaurant.ShopName}</h1>
                </Container>
            </div>


            <div className="all-dishes">

                <Container>
                    <p>Popular Dishes</p>
                    {restaurant.Dishes == undefined ? <div> </div> : restaurant.Dishes.map((value, id) => {
                        return <div key={id} className="dish">
                            <div>
                                <h3>{value.DishName}</h3>
                                <p>{value.Discription}</p>
                                <p>Rs {value.Price}</p>
                            </div>
                            <Button variant="outlined"
                                onClick={() => {
                                    value.shop_id = restaurant._id;
                                    value.quantity = 1;
                                    value.totalPrice = value.Price * value.quantity;
                                    let UserCart = JSON.parse(localStorage.getItem("UserCart")) || [];
                                    if (UserCart[0]) {
                                        if (UserCart[0].shop_id == restaurant._id) {
                                            setCart((list) => [...list, value])
                                            UserCart.push(value)
                                            localStorage.setItem("UserCart", JSON.stringify(UserCart));
                                        }
                                        else {
                                            window.alert("You don't add another shops item if you want add your recent shop cart  is deleted")
                                            let confirmation = window.confirm("If you want add in cart PRESS 'OK'")
                                            console.log(confirmation)
                                            if (confirmation) {
                                                localStorage.removeItem("UserCart");
                                                let a = []
                                                a.push(value)
                                                setCart(a)
                                                localStorage.setItem("UserCart", JSON.stringify(a));
                                                //     value.shop_id = restaurant._id
                                                //     value.quantity = 1;
                                                //     cart.push(value)
                                                //     setCart(cart)
                                                // console.log(cart)
                                                //     setCart((list) => [...list, value])
                                                // let UserCart = JSON.parse(localStorage.getItem("UserCart")) || [];

                                            }
                                        }

                                    }
                                    else {
                                        setCart((list) => [...list, value])
                                        UserCart.push(value)
                                        localStorage.setItem("UserCart", JSON.stringify(UserCart));

                                    }
                                }}
                            >Add to cart</Button>
                        </div>
                    })}

                </Container>

            </div>

            {/* <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalToggleLabel">foodpanda</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <label for="inputEmail" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="inputEmail" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Next</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalToggleLabel2">foodpanda</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3 row">
                                <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control" id="inputPassword" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Back to first</button>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* <button onClick={() => {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "update": "update"
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(`${URL}/update`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        // console.log(result)
                        setRestaurant(result)
                    })

            }}>Upadate</button> */}

        </div>

    </div>)
}
export default Restaurant;