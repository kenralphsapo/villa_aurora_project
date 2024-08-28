import React, { useEffect, useState } from "react";
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import checkAuth from "../hoc/checkAuth";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { ServiceDialog } from "../components/dialogs/ServiceDialogs";
import { RoomDialog } from "../components/dialogs/RoomDialogs";
import { TransactionDialogs } from "../components/dialogs/TransactionDialogs";
import { TestimonialDialogs } from "../components/dialogs/TestimonialDialogs";
import { UserDialogs } from "../components/dialogs/UserDialogs";
import BottomNav from "../components/BottomNav";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

function Admin() {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    return (
        <Box>
            {user?.role == "admin" || user?.role == "scheduler" ? (
                <Box id="custom-admin">
                    <AppBar
                        id="custom-navbar"
                        position="static"
                        style={{ textAlign: "center" }}
                    >
                        <Toolbar
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                                <Typography variant="h3">
                                    Welcome{" "}
                                    {user?.username ?? "Wait, Who are you??"}
                                </Typography>
                            </Box>
                            <IconButton
                                edge="end"
                                color="inherit"
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>

                    <Box>
                        <Box id="table">
                            <UserDialogs />
                            <ServiceDialog />
                            <RoomDialog />
                            <TransactionDialogs />
                            <TestimonialDialogs />
                        </Box>
                        <BottomNav />
                    </Box>
                </Box>
            ) : (
                <NotFound />
            )}
        </Box>
    );
}

export default checkAuth(Admin);
