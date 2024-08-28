import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Container,
    IconButton,
    Box,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

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
    const [isLoading, setIsLoading] = useState(false);

    const mavigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast.info(
                "If an account with that email exists, a password reset link will be sent."
            );
            setEmail("");
        }, 2000);
    };

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
            <Container maxWidth="xs">
                <ForgotPasswordContainer
                    sx={{
                        boxShadow: "4px 4px 10px black",
                    }}
                >
                    <CloseButton onClick={() => mavigate("/login")}>
                        <CloseIcon />
                    </CloseButton>
                    <Typography variant="h4" gutterBottom>
                        Forgot Password
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Enter your email address and we'll send you a link to
                        reset your password.
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            variant="outlined"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isLoading}
                            style={{ marginTop: "16px" }}
                        >
                            {isLoading ? "Sending..." : "Send Reset Link"}
                        </Button>
                    </form>
                </ForgotPasswordContainer>
                <ToastContainer />
            </Container>
        </Box>
    );
}
