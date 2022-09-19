import { useEffect, useState, useContext } from "react";
import { AppContext } from "../Context/context";
import NavBar from "../Navbar/navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import Cities from "../Cities/cities";
import "./home.css"
function Home(props) {

    let { user, setUser } = useContext(AppContext);


    useEffect(() => {
        return () => {
        }
    })

    const logOut = () => {
        localStorage.removeItem("user")
    }



    return (<div>
        <NavBar />
        <div className="home">
            <div className="home-child-1">

                <Container>
                    <p>It's the food and groceries you love,
                        <br />
                        delivered</p>
                    <div className="adress-container">
                        <div className="adress-box">
                            <TextField
                                label="Enter your full adress"
                                id="outlined-size-small adress"
                                size="small"
                                className='outlined-size-small '
                                type='search'
                            />
                        </div>
                        <div className="button-box">
                            <button className="delivery">Delivery</button>
                            <span>or</span>
                            <button className="pick-up">Pick-Up</button>

                        </div>
                    </div>
                </Container>
            </div>

            <div className="home-child-2">
                <Container>
                    <div className="partners-name-overwrite">
                        <h1>Partners</h1>
                        <p>You prepare the food, we handle the rest</p>
                    </div>
                </Container>

                <div className="cheif-background">
                    <Container>
                        <div className="partner-info">
                            <h2>List your restaurant or shop on foodpanda</h2>
                            <p>
                                Would you like millions of new customers to enjoy your amazing food and groceries? So would we!
                                It's simple: we list your menu and product lists online, help you process orders, pick them up, and deliver them to hungry pandas – in a heartbeat!
                                Interested? Let's start our partnership today!
                            </p>
                            <button>Get start</button>
                        </div>
                    </Container>

                </div>
            </div>


            <div className="home-child-3">
                <Container>
                    <div className="cities-heading">
                        <h1>Cities</h1>
                        <p>Find us in these cities and many more!</p>
                    </div>
                </Container>
                <Cities /> 
            </div>
        </div>



    </div >)
}
export default Home