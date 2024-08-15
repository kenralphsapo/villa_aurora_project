import React, { useState } from "react";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { login as loginAPI } from "../api/auth";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/authSlice";
import images from "../utils/index";

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
                setError(true);
            }
        });
    };

    return (
        <Box id="bglogin">
            <img
                src={images.logo}
                alt="Logo"
                style={{ width: "100px", borderRadius: "10px" }}
            />
            <Typography variant="h1" id="custom-sign">
                Sign in to Villa Aurora
            </Typography>
            <Box
                component="form"
                onSubmit={onSubmit}
                className="login-form"
                position="relative"
            >
                <IconButton
                    onClick={() => {
                        navigate("/");
                    }}
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        color: "text.primary",
                        zIndex: 10,
                    }}
                >
                    <CloseIcon />
                </IconButton>
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
                        helperText={error ? "Invalid input" : ""}
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
                        helperText={error ? "Invalid input" : ""}
                    />
                </Box>
                <Button type="submit" id="submit-button" fullWidth>
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
