import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Typography,
    Container,
    IconButton,
    Box,
    AppBar,
    Toolbar,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import images from "../utils/index";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyIcon from "@mui/icons-material/Key";
import $ from "jquery";
import { forgotPassword, resetPassword } from "../api/auth";

const ForgotPasswordContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    position: "relative",
    maxWidth: "400px",
    margin: "0 auto",
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
}));

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [forgotpassword, setForgotPassword] = useState(false);
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [warnings, setWarnings] = useState({});

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

    const onForgotPassword = (e) => {
        e.preventDefault();
        setLoading(true);
        forgotPassword({
            email,
        }).then((res) => {
            if (res?.ok) {
                toast.info(
                    res?.message ??
                        "If an account with that email exists, a password reset link will be sent."
                );
                setLoading(false);
                setEmail("");
                setWarnings({});
            } else {
                toast.error(res?.message ?? "This email does not exist.");
                setLoading(false);
                setWarnings(res?.errors);
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
                    console.log(res);
                    if (res?.ok) {
                        toast.success(
                            res?.message ?? "Password reset successfully."
                        );

                        navigate("/login");

                        setWarnings({});
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
        <Box id="auth-bg">
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <img
                    src={images.logo}
                    alt="Logo"
                    style={{ width: "100px", borderRadius: "10px" }}
                />
                <Typography variant="h1" id="auth-sign">
                    Villa Aurora
                </Typography>
                {forgotpassword ? (
                    <Box
                        component="form"
                        onSubmit={onResetPassword}
                        sx={{
                            border: "1px solid black",
                            padding: 5,
                            borderRadius: 10,
                            boxShadow: "2px 2px 4px black",
                            background: "#eeeeee",
                            width: 300,
                        }}
                    >
                        <Box className="d-flex justify-content-end">
                            <CloseButton
                                onClick={() => setForgotPassword(false)}
                            >
                                <CloseIcon sx={{ color: "#eeeeee" }} />
                            </CloseButton>
                        </Box>
                        <Box className="d-flex align-items-center">
                            <Typography style={{ marginRight: "10px" }}>
                                Reset Password
                            </Typography>
                            <KeyIcon />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                label="New Password"
                                id="password"
                                type="password"
                                required
                                error={!!warnings?.password}
                                helperText={warnings?.password}
                            />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                label="Password Confirmation"
                                id="password_confirmation"
                                type="password"
                                required
                                error={!!warnings?.password_confirmation}
                                helperText={warnings?.password_confirmation}
                            />
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            style={{
                                display: "block",
                                margin: "auto",
                                marginTop: 10,
                                background: "#4caf50",
                                color: "#eeeeee",
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                ) : (
                    <Container maxWidth="xs">
                        <ForgotPasswordContainer
                            sx={{
                                boxShadow: "4px 4px 10px black",
                            }}
                        >
                            <CloseButton onClick={() => navigate("/login")}>
                                <CloseIcon />
                            </CloseButton>
                            <Typography variant="h4" gutterBottom>
                                Forgot Password
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Enter your email address and we'll send you a
                                link to reset your password.
                            </Typography>
                            <form onSubmit={onForgotPassword}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    margin="normal"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    variant="outlined"
                                    error={!!warnings?.email}
                                    helperText={warnings?.email}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={loading}
                                    style={{
                                        marginTop: "16px",
                                        background: "#4caf50",
                                        color: "#eeeeee",
                                    }}
                                >
                                    {loading ? "Sending..." : "Send Reset Link"}
                                </Button>
                            </form>
                        </ForgotPasswordContainer>
                    </Container>
                )}
            </Box>
        </Box>
    );
}
