import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { login as loginAPI } from "../api/auth";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/authSlice";
import "./css/bootstrap-resort.css";
import logo from "./images/logo.jpg";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [loading, setLoading] = useState(false);


    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        loginAPI({
            username,
            password,
        }).then((res) => {
            if (res?.ok) {
                setCookie("AUTH_TOKEN", res.data.token);
                dispatch(login(res.data));
                navigate("/");
                toast.success(res?.message ?? "Logged in successfully.");
                setError(false);
            } else {
                setError(true); 
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    return (
        <Box
            id="bglogin"
            sx={{height:"100vh"}}
            className="d-flex flex-column justify-content-center align-items-center"
        >
            <img src={logo} alt="Logo" className="custom-logo" />
            <Typography className="signup" variant="h3">
                Sign in to Villa Aurora
            </Typography>
            <Box component="form" onSubmit={onSubmit} className="login-form">
                <Typography id="login-logo" variant="h2">
                    Login
                </Typography>
                <Box className="input-container">
                    <TextField
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        id="username"
                        label="Username or Email"
                        fullWidth
                        error={error}
                        variant="outlined"
                        sx={{ borderColor: error ? 'red' : 'black' }}
                    />
                </Box>
                <Box className="input-container">
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        error={error} 
                        variant="outlined" 
                        sx={{ borderColor: error ? 'red' : 'black' }} 
                    />
                </Box>
                <Button type="submit" id="submit-button" disabled={loading} fullWidth>
                    Login
                </Button>
                <Box className="forgot-password">
                    <Link to="/forgotpass" id="link">
                        Forgot Password?
                    </Link>
                </Box>
                <Typography className="register-link">
                    Don't have an account yet?{" "}
                    <Link to="/register" id="link">
                        Register
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}
