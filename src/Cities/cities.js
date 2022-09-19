// import { Container } from "@mui/system";
import karachi from "./Mazar-e-Quaid.jpg"
// import hyderabad from './heyderabad.jpg'
import Islamabad from './Monument.jpg'
import Rawalpindi from './Rawalpindi.jpg'
import Multan from './multan-city.jpg'
import { useNavigate } from "react-router-dom"
import { AppContext } from "../Context/context"
import { useContext } from "react"
import './cities.css'

function Cities() {
    let { user, setUser, loader, setLoader } = useContext(AppContext);

    const navigate = useNavigate()

    const goToCityRoute = (value) => {
        setLoader(true)

        if (value.city == "Karachi") {
            navigate("/city/karachi")
        }
        else if (value.city == "Islamabad") {
            navigate("/city/islamabad")
        }
        else if (value.city == "Rawalpindi") {
            navigate("/city/rawalpindi")
        }
        else if (value.city == "Multan") {
            navigate("/city/multan")
        }
    }


    let Cities = [
        {
            city: "Karachi",
            image: karachi
        }, {
            city: "Islamabad",
            image: Islamabad
        }, {
            city: "Rawalpindi",
            image: Rawalpindi
        }, {
            city: "Multan",
            image: Multan
        }
    ]



    return <div className="cities">

        {Cities.map((value) => {
            return <div className="city-div" onClick={() => goToCityRoute(value)} >
                <img src={value.image} />
                <h1>{value.city}</h1>
            </div>

        })}

        {/* 
        <div className="city-div"  >
            <img src={Islamabad} />

            <h1>Islamabad</h1>
        </div>
        <div className="city-div"  >
            <img src={Rawalpindi} />

            <h1>Rawalpindi</h1>
        </div>
        <div className="city-div"  >
            <img src={Multan} />

            <h1>Multan</h1>
        </div> */}

    </div >
}

export default Cities;