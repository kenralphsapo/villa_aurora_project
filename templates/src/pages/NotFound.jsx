import React from "react";
import { Box, Typography, Button } from "@mui/material";
export default function NotFound() {
    return (
        <Box
            id="notfoundbg"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <Typography variant="h1" align="center" gutterBottom>
                404
            </Typography>
            <Typography variant="h4" align="center" gutterBottom>
                Page Not Found
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
                The page you are looking for does not exist.
            </Typography>
            <Button variant="contained" href="/">
                Go Home
            </Button>
        </Box>
    );
}
