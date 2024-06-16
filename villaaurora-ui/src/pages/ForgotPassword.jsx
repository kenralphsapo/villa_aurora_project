import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    AppBar,
    Toolbar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { login as loginAPI } from "../api/auth";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/authSlice";
import "./css/bootstrap-resort.css";

export default function ForgotPassword() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    return (
        <Box>
            <AppBar
                position="static"
                sx={{
                    boxShadow: "0 0 10px black",
                    padding: "2px 10px",
                    background: "#d6a354",
                }}
            >
                <Toolbar
                    className="d-flex justify-content-between align-items-center"
                    component="form"
                    onSubmit={onSubmit}
                >
                    <Typography variant="h6" sx={{ color: "white" }}>
                        Villa Aurora Private Resort
                    </Typography>
                    <Box className="d-flex justify-content-around align-items-center">
                        <Box sx={{ marginLeft: "10px" }}>
                            <TextField
                                type="text"
                                value={username}
                                placeholder="Username or Email"
                                sx={{ backgroundColor: "white" }}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Box>
                        <Box >
                            <TextField
                                type="password"
                                value={password}
                                placeholder="Password"
                                className="m1-1 bg-white"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <Button id="forgotpassword-btn" type="submit">
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
                <Box
                    sx={{
                        width: "400px",
                        boxShadow: "0 0 10px black",
                        padding: "10px",
                        borderRadius: "5px",
                    }}
                >
                    <Box component="form">
                        <Typography>
                            Forgot your password? No problem. Just let us know
                            your email address and we will email you password
                            reset link that will allow you to choose a new one.
                        </Typography>
                        <Typography className="forgotpassword-text mt-2">
                            We have emailed your password reset link!
                        </Typography>
                        <TextField type="text" placeholder="Email" fullWidth />
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
                            <Button id="forgotpassword-btn">Search</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
