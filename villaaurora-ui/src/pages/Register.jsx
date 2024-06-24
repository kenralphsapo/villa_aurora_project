import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import "./css/bootstrap-resort.css";
import logo from "./images/logo.jpg";
import TermsCondition from "../components/TermsCondtion";
import $ from "jquery";

export default function Register() {
    const [warnings, setWarnings] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();
    const dispatch = useDispatch();
    const [createDialog, setCreateDialog] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                username: $("#username").val(),
                password: $("#password").val(),
                password_confirmation: $("#password_confirmation").val(),
                mobile: $("#mobile").val(),
                email: $("#email").val(),
            };

            setLoading(true);
            register(body)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Account has been registered.");
                        setCookie("AUTH_TOKEN", res.data.token);
                        navigate("/");
                        dispatch(login(res.data));
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
        <Box
            id="bglogin"
            className="d-flex flex-column justify-content-center align-items-center"
        >
            <Box>
                <Box component="form" onSubmit={onSubmit} className="login-form">
                    <Typography variant="h2" id="login-logo">
                        Register
                        <img src={logo} alt="Logo" className="custom-logosm" />
                    </Typography>
                    <Box>
                        <TextField
                            id="username"
                            name="username"
                            label="Username"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={!!warnings.username}
                        />
                           {warnings?.username ? (
                            <Typography component="small" color="error">
                                {warnings.username}
                            </Typography>
                        ) : null}
                    </Box>
                    <Box>
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            variant="outlined"
                            margin="normal"
                            type="password"
                            fullWidth
                            required
                            error={!!warnings.password} 
                        />
                         {warnings?.password ? (
                            <Typography component="small" color="error">
                                {warnings.password}
                            </Typography>
                        ) : null}
                    </Box>
                    <Box>
                        <TextField
                            id="password_confirmation"
                            name="password_confirmation"
                            label="Repeat Password"
                            variant="outlined"
                            margin="normal"
                            type="password"
                            fullWidth
                            required
                            error={!!warnings.password_confirmation} 
                        />
                        {warnings?.password_confirmation ? (
                            <Typography component="small" color="error">
                                {warnings.password_confirmation}
                            </Typography>
                        ) : null}
                    </Box>
                    <Box>
                        <TextField
                            id="mobile"
                            name="mobile"
                            label="Mobile No."
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={!!warnings.mobile} 
                        />
                            {warnings?.mobile ? (
                            <Typography component="small" color="error">
                                {warnings.mobile}
                            </Typography>
                        ) : null}
                    </Box>
                    <Box>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            error={!!warnings.email} 
                        />
                          {warnings?.email ? (
                            <Typography component="small" color="error">
                                {warnings.email}
                            </Typography>
                        ) : null}
                    </Box>

                    <Box>
                        <Button
                            disabled={loading}
                            type="submit"
                            id="submit-button"
                            fullWidth
                        >
                            Register
                        </Button>
                        <Typography style={{ fontSize: 12, textAlign: "center" }}>
                            By registering, you agree to Villa Aurora's{" "}
                            <Link
                                style={{ color: "#4caf50", cursor: "pointer" }}
                                onClick={() => setCreateDialog(true)}
                            >
                                Terms fo Service
                            </Link>
                        </Typography>
                    </Box>

                    <Box sx={{ textAlign: "center", cursor: "pointer" }}>
                        <Typography className="register-link pt-3">
                            Already have an account?{" "}
                            <Link to="/login" id="link">
                                Login
                            </Link>
                        </Typography>
                    </Box>
                </Box>
                <TermsCondition createDialog={createDialog} setCreateDialog={setCreateDialog} />
            </Box>
        </Box>
    );
}
