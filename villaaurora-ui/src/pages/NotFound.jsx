import React from "react";
import { Box, Typography, Button } from "@mui/material";
import "./css/bootstrap-resort.css";

export default function NotFound() {
    return (
        <Box
            id="notfoundbg"
            className="d-flex flex-column align-items-center justify-content-center"
        >
            <Typography variant="h1" align="center" gutterBottom>
                404
            </Typography>
            <Typography variant="h4" align="center" gutterBottom>
                Page Not Found
            </Typography>
            <Typography align="center" gutterBottom>
                The page you are looking for does not exist.
            </Typography>
            <Button className="btn" href="/">
                Go Home
            </Button>
        </Box>
    );
}
