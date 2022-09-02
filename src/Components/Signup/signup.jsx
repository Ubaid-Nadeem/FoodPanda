import Button from '@mui/material/Button';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Stack from '@mui/material/Stack';
import emailIcon from './email-icon-png-29.jpg'
import './signup.css'
import TextField from '@mui/material/TextField';
import NavBar from '../../Navbar/navbar';
import Alert from '@mui/material/Alert';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react'
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Profile from './profile.png'
import lock from './lock.png'
import { AppContext } from '../../Context/context';
import PreLoader from '../../Pre-Loader/preloader';
function SignUp() {

    const URL = "https://food-panda-clone.herokuapp.com"
    // const LOCAL_URL = "http://localhost:400"
    // const URL = "http://localhost:400"
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [createUserEmail, setCreateUserEmail] = useState('')


    const [passwordError, setPasswordError] = useState("password-error-hide")
    const [alert, setAlert] = useState('alert-message-hide');
    const [signUpUser, setSignUpUser] = useState('')
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState('');
    const [email, setEmail] = useState('');
    const [characters, setCharacters] = useState('')
    const [aToz, setAToz] = useState('')
    const [number, setNumber] = useState('')
    const [capitalAtoZ, setCapitalAtoZ] = useState('')
    const [progress, setProgress] = useState(0)
    const [errorShow, SetErrorShow] = useState('email-error-hide')
    const [createPassword, setCreatePassword] = useState('')
    const [values, setValues] = useState({

        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();


    let { user, setUser, loader, setLoader } = useContext(AppContext);



    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    }

    useEffect(() => {

        if ([...searchParams].length == 1) {

            if ([...searchParams][0][1] == "login" && email.length < 1) {
                navigate({
                    pathname: '/login/new',
                    search: '?step=email',
                })
            }
            if ([...searchParams][0][1] == "password" && email.length < 1) {
                navigate({
                    pathname: '/login/new',
                    search: '',
                })
            }
        }

    }, [])

    const handleChange =
        (prop) => (event) => {

            setValues({ ...values, [prop]: event.target.value });

            let pattern1 = /[a-z]/g;
            let pattern2 = /[A-Z]/g
            let pattern3 = /[1-9]/g

            let a = event.target.value.match(pattern1)
            let b = event.target.value.match(pattern2)
            let c = event.target.value.match(pattern3)


            if (a != null) {
                setAToz("pass")
            }
            else {
                setAToz("")
            }
            if (b != null) {
                setCapitalAtoZ("pass")

            }
            else {
                setCapitalAtoZ("")
            }
            if (c != null) {
                setNumber("pass")

            }
            else {

                setNumber("")
            }
            if (event.target.value.length >= 6) {
                setCharacters("pass")

            }
            else {
                setCharacters("")
            }
        };


    const GoTOEmail = () => {
        navigate({
            pathname: '/login/new',
            search: '?step=email',
        })
        //    window.location.reload()
    };

    const GoTOLogin = () => {
        setLoader(true)
        let pattern = /[@]/g
        let Checkemail = email.match(pattern);
        let a = email.split('@')

        if (Checkemail == null || a[1] != 'gmail.com') {
            SetErrorShow('email-error-show');
            setLoader(false)
        }
        else {
            SetErrorShow('email-error-hide');

            var myHeaders = new Headers();
            myHeaders.append(
                "Content-Type", "application/json",
                "Access-Control-Allow-Origin", "*"

            );

            var raw = JSON.stringify({
                "email": email
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${URL}/checkEmail`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoader(false)

                    if (result.length != 0) {
                        navigate({
                            pathname: '/login/new',
                            search: '?step=login',
                        })
                    }
                    else {
                        navigate({
                            pathname: '/login/new',
                            search: '?step=registration',
                        })

                    }
                })
                .catch(error => console.log('error', error));


        }
    };

    const getValue = (event) => {
        setEmail(event.target.value)

    }

    const CreateNewUesr = () => {

        if (characters == "pass" && capitalAtoZ == "pass" && aToz == "pass" && number == "pass") {

            let Data = {
                email: createUserEmail,
                firstName: firstName,
                lastName: lastName,
                Password: values.password
            }

            var myHeaders = new Headers();
            myHeaders.append(
                "Content-Type", "application/json",
                "Access-Control-Allow-Origin", "*"

            );
            var raw = JSON.stringify({
                "email": createUserEmail,
                "firstName": firstName,
                "lastName": lastName,
                "Password": values.password
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${URL}/createNewUser`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    window.alert(result.message)
                    navigate('/')
                })
                .catch(error => console.log('error', error));
        }
        else {
            window.alert("please complete all requirment")
        }

    }

    function GoogleLogin() {

        signInWithPopup(auth, provider)
            .then((result) => {
                setSignUpUser(result.user.email);

                var myHeaders = new Headers();
                myHeaders.append(
                    "Content-Type", "application/json",
                    "Access-Control-Allow-Origin", "*"
                );

                var raw = JSON.stringify({
                    "email": result.user.email
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(`${URL}/checkEmail`, requestOptions)
                    .then(response => response.json())
                    .then(data => {

                        if (result.length == 0) {

                            setEmail(result.user.email)
                            setFirstName(result.user.displayName.split(' ')[0]);
                            setLastName(result.user.displayName.split(' ')[1]);

                            navigate({
                                pathname: '/login/new',
                                search: '?step=password',
                            })

                        }
                        else {
                            setAlert('alert-message-show')
                        }
                    })
                    .catch(error => console.log('error', error));




            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });

    }

    const reviewPassword = () => {
        setLoader(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json",
            "Access-Control-Allow-Origin", "*"
        );

        var raw = JSON.stringify({
            "email": email,
            "password": values.password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${URL}/reviewpassword`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoader(false)
                if (result.error) {
                    setPasswordError("#password-error-show")

                }
                else {
                    navigate('/')
                    const userID = {
                        _id: result[0]._id
                    };

                    localStorage.setItem("user", JSON.stringify(userID));
                    setUser(result)
                }
            })

    }
    const AccountCreate = () => {
        if (characters == "pass" && capitalAtoZ == "pass" && aToz == "pass" && number == "pass") {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json",
                "Access-Control-Allow-Origin", "*"
            );

            var raw = JSON.stringify({
                "email": email,
                "firstName": firstName,
                "lastName": lastName,
                "Password": createPassword
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${URL}/createNewUser`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    navigate('/')
                })
                .catch(error => console.log('error', error));
        }
        else {
            window.alert('password is weak')
        }
    }

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
        },
    }));



    if ([...searchParams].length >= 1 && [...searchParams][0][1] == "email") {
        return (<div className='EmailBox-main'>
            <NavBar />

            <div className='EmailBox'>
                <img src={emailIcon} />
                <h3>What's your email?</h3>
                <p>We'll check if you have an account</p>
                <div className='email-error' id={errorShow}>
                    <Alert severity="error" >This email doesn't seem right. Try again.</Alert>
                </div>


                <TextField
                    label="Email"
                    id="outlined-size-small"
                    size="small"
                    className='outlined-size-small'
                    onChange={getValue}
                    value={email}
                    type='email'
                />
                <div className='emailContinue'  >
                    <Button
                        disabled={!(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(email))}
                        variant="contained"
                        onClick={GoTOLogin}>Continue</Button>
                </div>
            </div>
        </div>)
    }


    else if ([...searchParams].length >= 1 && [...searchParams][0][1] == "login") {

        return <div>
            <NavBar />
            <div className='user-Password-div'>
                <img src={lock} className="password-icon" />
                <h2>Welcome back!</h2>
                <p>Log in by typing your password. We can also send a login link to your email.</p>
                <div className='password-error' id={passwordError}>
                    <Alert severity="error" >Invalid password. Try again.</Alert>
                </div>

                <p><b>{email}</b></p>
                <a href='#' className='forgotPassword'>Forgot your password?</a>
                <div className="password-input">
                    <FormControl sx={{ width: '99%' }} variant="outlined" size="small">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </div>
                <div className='emailContinue'  >
                    <Button
                        variant="contained"
                        disabled={!(/^([A-Za-z0-9*@.,!#$%^&_\-.]{1,})$/.test(values.password))}
                        onClick={reviewPassword}
                    > Log in with password</Button>
                </div>
                <p style={{ textAlign: "center" }}>or</p>
                <div className='emailContinue'  >
                    <Button variant="outlined" >Send me a login link</Button>
                </div>

            </div>
        </div >

    }


    else if ([...searchParams].length >= 1 && [...searchParams][0][1] == "registration") {

        return <div>
            <NavBar />

            <div className="registration">


                <img src={Profile} className="signup-profile-icon" />
                <h2>Let's get you started!</h2>
                <p>First, create your account</p>

                <TextField
                    label="Email"
                    id="outlined-size-small"
                    size="small"
                    className='outlined-size-small'
                    value={createUserEmail}
                    onChange={(event) => {
                        setCreateUserEmail(event.target.value)
                    }}
                    type='email'
                />

                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '45%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            label="First Name"
                            id="outlined-size-small"
                            size="small"
                            value={firstName}
                            onChange={(event) => {
                                setFirstName(event.target.value)
                            }}
                        />
                        <TextField
                            label="Last Name"
                            id="outlined-size-small"
                            size="small"

                            value={lastName}
                            onChange={(event) => {
                                setLastName(event.target.value)
                            }}
                        />
                    </div>
                </Box>
                <FormControl sx={{ width: '99%' }} variant="outlined" size="small">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

                <Box sx={{ flexGrow: 1 }}>
                    {/* <FacebookCircularProgress /> */}

                    <p>
                        Password strength
                    </p>
                    <BorderLinearProgress variant="determinate" value={progress} />
                </Box>
                <p >Password must contain:</p>
                <ul className='password-requirments'>
                    <li className={characters}>{characters == 'pass' ? <i class="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark xmark"></i>} At least 6 characters</li>
                    <li className={capitalAtoZ}>{capitalAtoZ == 'pass' ? <i class="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark xmark"></i>} At least one uppercase letter (A-Z)</li>
                    <li className={aToz}>{aToz == 'pass' ? <i class="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark xmark"></i>} At least one lowercase letter (a-z)</li>
                    <li className={number}>{number == 'pass' ? <i class="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark xmark"></i>} At least one number (0-9)</li>
                </ul>
                <div className='emailContinue'  >
                    <Button variant="contained" onClick={CreateNewUesr}>Create account</Button>
                </div>


            </div>
        </div>
    }

    else if ([...searchParams].length >= 1 && [...searchParams][0][1] == "password") {
        return <div className='EmailBox-main'>
            <NavBar />

            <div className='EmailBox'>
                <img src={lock} />
                <h3>Create a Password</h3>

                <FormControl sx={{ width: '99%' }} variant="outlined" size="small">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={createPassword}
                        onChange={(event) => {
                            setCreatePassword(event.target.value)
                            let pattern1 = /[a-z]/g;
                            let pattern2 = /[A-Z]/g
                            let pattern3 = /[1-9]/g

                            let a = event.target.value.match(pattern1)
                            let b = event.target.value.match(pattern2)
                            let c = event.target.value.match(pattern3)


                            if (a != null) {
                                setAToz("pass")
                            }
                            else {
                                setAToz("")
                            }
                            if (b != null) {
                                setCapitalAtoZ("pass")

                            }
                            else {
                                setCapitalAtoZ("")
                            }
                            if (c != null) {
                                setNumber("pass")

                            }
                            else {

                                setNumber("")
                            }
                            if (event.target.value.length >= 6) {
                                setCharacters("pass")

                            }
                            else {
                                setCharacters("")
                            }
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

                <ul className='password-requirments'>
                    <li className={characters}>{characters == 'pass' ? <i class="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark xmark"></i>} At least 6 characters</li>
                    <li className={capitalAtoZ}>{capitalAtoZ == 'pass' ? <i class="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark xmark"></i>} At least one uppercase letter (A-Z)</li>
                    <li className={aToz}>{aToz == 'pass' ? <i class="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark xmark"></i>} At least one lowercase letter (a-z)</li>
                    <li className={number}>{number == 'pass' ? <i class="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark xmark"></i>} At least one number (0-9)</li>
                </ul>
                <div className='emailContinue'  >
                    <Button
                        disabled={!(/^([A-Za-z1-9]{1,})$/.test(createPassword))}
                        variant="contained"
                        onClick={AccountCreate}>Continue</Button>
                </div>
            </div>
        </div>
    }


    else {

        return <div>
            <NavBar />
            <div className='signup-box'>
                <h3>Welcome!</h3>
                <p>Sign up or log in to continue</p>
                <div className={alert} >
                    <Alert severity="error" sx={{ width: '100%' }} >
                        You already have an account with Facebook login. Continue with Facebook instead.
                    </Alert>
                </div>

                <div className='sign-methods'>
                    <div className="signup-buttons">
                        <Button variant="contained" startIcon={<i class="fa-brands fa-apple"></i>}>
                            Continue with Apple
                        </Button>
                    </div>

                    <div className="signup-buttons">
                        <Button onClick={GoogleLogin} variant="contained" startIcon={<i className="fa-brands fa-google"></i>}>
                            Continue with Google
                        </Button>
                    </div>

                    <div className="signup-buttons">
                        <Button variant="contained" startIcon={<i className="fa-brands fa-facebook"></i>}>
                            Continue with Facebook
                        </Button>
                    </div >
                    or

                    <div className="signup-buttons">
                        <Button variant="outlined" onClick={GoTOEmail}>
                            Continue with Email
                        </Button>
                    </div>

                </div>
                <p className='policy-discrip'>By signing up, you agree to our<a href='#' className="policy">Terms and Conditions</a>  and <a className="policy" href='#'>Privacy Policy.</a> </p>
            </div>

        </div>

    }

    return <PreLoader />

}
export default SignUp;