import React, { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    AppBar,
    Toolbar,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { forgotPassword, login as loginAPI, resetPassword } from "../api/auth";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/authSlice";
import "./css/bootstrap-resort.css";
import $ from "jquery";
import { faArrowRotateBack, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "./images/logo.jpg";
export default function ForgotPassword() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [forgotpassword, setForgotPassword] = useState(false);
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const getToken = params.get("token");
        const getEmail = params.get("email");
        if (getToken && getEmail) {
            setToken(getToken);
            setForgotPassword(true);
            setEmail(getEmail);
        }
    }, [location.search]);

    const onSubmit = (e) => {
        e.preventDefault();
        loginAPI({
            username,
            password,
        }).then((res) => {
            if (res?.ok) {
                setCookie("AUTH_TOKEN", res.data.token);
                dispatch(login(res.data));
                navigate("/");
                toast.success(res?.message ?? "Logged in successfully.");
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    const onForgotPassword = (e) => {
        e.preventDefault();
        forgotPassword({
            email,
        }).then((res) => {
            if (res?.ok) {
                toast.success(
                    res?.message ??
                        "Password reset instructions sent to your email."
                );
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };


    const onResetPassword = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                email: email,
                token: token,
                password: $("#password").val(),
                password_confirmation: $("#password_confirmation").val(),
            };
            setLoading(true);
            resetPassword(body)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Password reset successfully.");
                
                        navigate("/login");

                        setWarnings({})
                    } else {
                        toast.error(res?.message ?? "Something went wrong.");
                        setWarnings(res?.errors);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <Box>
            {forgotpassword ? (
                <Box className="d-flex justify-content-center align-items-center" style={{ height: '100vh', margin:0 , padding:0 }}>
                    <AppBar style={{display: 'flex',  justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}} id="forgotpassword">
                    <img src={logo} alt="Logo" className="custom-logo" style={{margin:2}}/>
                        <Typography sx={{  marginLeft:"10px" , color:'white'}}>Villa Aurora Private Resort</Typography>

                    </AppBar>
                    <Box component="form" onSubmit={onResetPassword} sx={{ border: '1px solid black', padding: 5, borderRadius: 10, boxShadow: '2px 2px 4px black' }}>
                        <Box className="d-flex justify-content-end">
                        <FontAwesomeIcon icon={faArrowRotateBack} onClick={() => setForgotPassword(false)} style={{cursor:'pointer', backgroundColor:'#379ae8', padding:10, fontSize: 20, borderRadius: 10, boxShadow: '2px 2px 4px black'}}/>
                        </Box>
                        <Box className="d-flex align-items-center">
                        <Typography style={{marginRight:"10px"}}>Reset Password</Typography>
                        <FontAwesomeIcon icon={faKey}/> 
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <TextField label="New Password" id="password" type="password"/>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <TextField label="Password Confirmation" id="password_confirmation" type="password"/>
                        </Box>
                        <Button type="submit" id="submit-btn" style={{display:'block', margin:"auto", marginTop:10}} >Submit</Button>
                    </Box>
                </Box>
            ) : (
                <>
                    <AppBar position="static" id="forgotpassword">
                        <Toolbar
                            className="d-flex justify-content-between align-items-center"
                            component="form"
                            onSubmit={onSubmit}
                        >
                            <Box className="d-flex align-items-center">
                            <img src={logo} alt="Logo" className="custom-logo" style={{margin:2}}/>
                            <Typography variant="h6" style={{marginLeft:"10px", color:'white'}}>
                                Villa Aurora Private Resort
                            </Typography>
                            </Box>
                            <Box className="d-flex justify-content-around align-items-center">
                                <Box sx={{ marginLeft: "10px" }}>
                                    <TextField
                                        type="text"
                                        value={username}
                                        placeholder="Username or Email"
                                        sx={{ backgroundColor: "white" }}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        type="password"
                                        value={password}
                                        placeholder="Password"
                                        sx={{
                                            backgroundColor: "white",
                                            marginLeft: "10px",
                                        }}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </Box>
                                <Box>
                                    <Button
                                        id="forgotpassword-btn"
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                </Box>
                            </Box>
                        </Toolbar>
                    </AppBar>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "80vh",
                        }}
                    >
                        <Box id="forgotpassform">
                            <Box component="form" onSubmit={onForgotPassword}>
                                <Typography>
                                    Forgot your password? No problem. Just let
                                    us know your email address and we will email
                                    you password reset link that will allow you
                                    to choose a new one.
                                </Typography>
                                <Typography className="forgotpassword-text mt-2">
                                    We have emailed your password reset link!
                                </Typography>
                                <TextField
                                    type="text"
                                    value={email}
                                    label="Email"
                                    fullWidth
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "flex-end",
                                        mt: 5,
                                    }}
                                >
                                    <Button variant="contained">
                                        <Link
                                            to="/login"
                                            className="text-white text-decoration-none ml-1"
                                        >
                                            Cancel
                                        </Link>
                                    </Button>
                                    <Button id="search-btn" type="submit">
                                        Search
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    );
}
