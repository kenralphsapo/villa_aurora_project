import React, { useState } from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import checkAuth from "../hoc/checkAuth";
import { ServiceDialog } from "../components/dialogs/ServiceDialogs";
import { RoomDialog } from "../components/dialogs/RoomDialogs";
import { TransactionDialogs } from "../components/dialogs/TransactionDialogs";
import { TestimonialDialogs } from "../components/dialogs/TestimonialDialogs";
import { UserDialogs } from "../components/dialogs/UserDialogs";
import BottomNav from "../components/BottomNav";
import CloseIcon from "@mui/icons-material/Close";
import NotFound from "./NotFound";

function Admin() {
    const [selectedDialog, setSelectedDialog] = useState("user");
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const handleNavigation = (newValue) => {
        switch (newValue) {
            case 0:
                setSelectedDialog("user");
                break;
            case 1:
                setSelectedDialog("service");
                break;
            case 2:
                setSelectedDialog("room");
                break;
            case 3:
                setSelectedDialog("transaction");
                break;
            case 4:
                setSelectedDialog("pivot");
                break;
            case 5:
                setSelectedDialog("testimonial");
                break;
            default:
                setSelectedDialog("user");
                break;
        }
    };

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
                            {selectedDialog == "user" && <UserDialogs />}
                            {selectedDialog == "service" && <ServiceDialog />}
                            {selectedDialog == "room" && <RoomDialog />}
                            {selectedDialog == "transaction" && (
                                <TransactionDialogs />
                            )}
                            {selectedDialog == "testimonial" && (
                                <TestimonialDialogs />
                            )}
                        </Box>
                        <BottomNav onNavigate={handleNavigation} />
                    </Box>
                </Box>
            ) : (
                <NotFound />
            )}
        </Box>
    );
}

export default checkAuth(Admin);
