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
                sx={{ boxShadow: "0 0 10px black", padding: "2px 10px" }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    component="form"
                    onSubmit={onSubmit}
                >
                    <Typography variant="h6" sx={{ color: "white" }}>
                        Villa Aurora Private Resort
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                        }}
                    >
                        <Box sx={{ marginLeft: "10px" }}>
                            <TextField
                                type="text"
                                value={username}
                                placeholder="Username or Email"
                                sx={{ backgroundColor: "white" }}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Box>
                        <Box sx={{ marginLeft: "10px" }}>
                            <TextField
                                type="password"
                                value={password}
                                placeholder="Password"
                                sx={{ backgroundColor: "white" }}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                sx={{ marginLeft: "10px" }}
                                color="success"
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
                <Box
                    sx={{
                        height: "300px",
                        width: "500px",
                        boxShadow: "0 0 10px black",
                        padding: "10px",
                        borderRadius: "5px",
                    }}
                >
                    <Box component="form">
                        <Typography
                            variant="h6"
                            id="font-TimesRoman"
                            sx={{
                                borderBottom: "2px #b0b0b0 solid",
                                paddingBottom: "10px",
                                marginLeft: "10px",
                            }}
                        >
                            Find your account
                        </Typography>
                        <Typography
                            id="font-TimesRoman"
                            sx={{
                                fontSize: "20px",
                                marginLeft: "10px",
                                marginBottom: "10px",
                            }}
                        >
                            Please enter your email to search for your account.
                        </Typography>
                        <TextField
                            type="text"
                            placeholder="Email"
                            sx={{
                                height: "50px",
                                fontSize: "20px",
                                margin: "auto",
                                display: "block",
                                mt: 5,
                            }}
                            fullWidth
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
                                    className="text-white text-decoration-none"
                                >
                                    Cancel
                                </Link>
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ marginLeft: "10px" }}
                            >
                                Search
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
