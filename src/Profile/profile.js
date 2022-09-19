import { useState, useEffect, useContext, Profiler } from "react";
import { TextField, Button } from "@mui/material";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../Navbar/navbar";
import { AppContext } from "../Context/context";
import './profile.css'
function Profile() {

    let { user, setUser, setLoader } = useContext(AppContext);
    let navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    setLoader(true)
    useEffect(() => {
        let ID = JSON.parse(localStorage.getItem("user"));
        console.log(user)

        if (ID) {
            if (user) {
                setLoader(false)
            } else {

            }
        }
        else {
            navigate('/')
            setLoader(false)
        }
    })

    const setValue = () => {
        if (user) {
            setEmail(user.email);
        }
    }


    return <div>
        <NavBar />
        <Container className="profile">
            <div className="profile-child-container">

                <div>
                    <h5>PROFILE</h5>
                    <hr />

                    <TextField
                        label="Email"
                        id="outlined-size-small"
                        size="small"
                        className='outlined-size-small'
                        // onChange={getValue}
                        value={user ? user.email : ""}
                        type='email'
                    />
                    <TextField
                        label="First Name"
                        id="outlined-size-small"
                        size="small"
                        className='outlined-size-small'
                        // onChange={getValue}
                        value={user ? user.fisrtName : ""}
                        type='text'
                    />
                    <TextField
                        label="Last Name"
                        id="outlined-size-small"
                        size="small"
                        className='outlined-size-small'
                        // onChange={getValue}
                        value={user ? user.lastName : ""}
                        type='text'
                    />
                    <TextField
                        label="Mobile Number"
                        id="outlined-size-small"
                        size="small"
                        className='outlined-size-small'
                        // onChange={getValue}
                        // value={email}
                        type='text'
                    />
                    <div className="save-button">
                        <Button
                            // disabled={!(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(email))}
                            variant="contained"
                        // onClick={GoTOLogin}
                        >Save</Button>
                    </div>
                </div>

                <div>
                    <h5>PASSWORD</h5>
                    <hr />
                    <TextField
                        label="Current Password"
                        id="outlined-size-small"
                        size="small"
                        className='outlined-size-small'
                        // onChange={getValue}
                        // value={email}
                        type='password'
                    />
                    <TextField
                        label="New Password"
                        id="outlined-size-small"
                        size="small"
                        className='outlined-size-small'
                        // onChange={getValue}
                        // value={email}
                        type='password'
                    />
                    <p className="passordError">You password is too short. Please use a password with at least 6 characters.</p>
                    <div className="save-button">
                        <Button
                            // disabled={!(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(email))}
                            variant="contained"
                        // onClick={GoTOLogin}
                        >Save</Button>
                    </div>
                </div>

                <div>
                    <h5>MY PAYMENT</h5>
                    <hr />
                    <p>You have no saved payment options yet.</p>
                </div>

                <div>
                    <h5>CONNECTED ACCOUNTS</h5>
                    <hr />
                </div>

            </div>
            <div>

                <div className="social-link">
                    <div>foodpanda</div>
                    <div className="social-media">
                        <div>
                            <i className="fa-brands fa-facebook"></i>
                        </div>
                        <div>
                            <i class="fa-brands fa-instagram"></i>
                        </div>
                    </div>
                </div>
            </div>

        </Container>

    </div>
}
export default Profile;