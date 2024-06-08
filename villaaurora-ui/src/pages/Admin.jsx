import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import checkAuth from "../hoc/checkAuth";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import NotFound from "./NotFound";
import { ServiceDialog } from "../components/dialogs/ServiceDialogs";
import { RoomDialog } from "../components/dialogs/RoomDialogs";
import { TransactionDialogs } from "../components/dialogs/TransactionDialogs";
import { TestimonialDialogs } from "../components/dialogs/TestimonialDialogs";
import AdminNavigation from "../components/AdminNavigation";
import { UserDialogs } from "../components/dialogs/UserDialogs";
import profile from "./images/profile.jpg";

function Admin() {
    const user = useSelector((state) => state.auth.user);

    const [cookies] = useCookies(["AUTH_TOKEN"]);

    /*if (user?.role !== "admin") {
        return <NotFound />;
    }*/

    const [showTableVisible, setTableVisible] = useState(true);
    const [isServiceDialogVisible, setServiceDialogVisible] = useState(false);
    const [isRoomDialogVisible, setRoomDialogVisible] = useState(false);
    const [isTransactionDialogVisible, setTransactionDialogVisible] =
        useState(false);
    const [isTestimonialDialogVisible, setTestimonialDialogVisible] =
        useState(false);

    return (
        <Box>
            {user?.role == "admin" ? (
                <Box id="custom-admin">
                    <Box>
                        <Box id="custom-navbar">
                            <Box className="sa">
                                <Typography variant="h3" id="gon">
                                    Villa Aurora
                                </Typography>
                                <Box className="sa re">
                                    <img
                                        src={profile}
                                        alt="Default profile"
                                        className="profiledesign pad"
                                    />
                                    <Typography
                                        variant="h3"
                                        style={{ textAlign: "right" }}
                                    >
                                        Welcome{" "}
                                        {user?.username ??
                                            "Wait, Who are you??"}
                                    </Typography>
                                </Box>
                            </Box>
                            <AdminNavigation
                                setTableVisible={setTableVisible}
                                setServiceDialogVisible={
                                    setServiceDialogVisible
                                }
                                setRoomDialogVisible={setRoomDialogVisible}
                                setTransactionDialogVisible={
                                    setTransactionDialogVisible
                                }
                                setTestimonialDialogVisible={
                                    setTestimonialDialogVisible
                                }
                            />
                        </Box>
                    </Box>
                    <Box>
                        <Box id="table">
                            {showTableVisible ? <UserDialogs /> : null}
                            {isServiceDialogVisible ? <ServiceDialog /> : null}
                            {isRoomDialogVisible ? <RoomDialog /> : null}
                            {isTransactionDialogVisible ? (
                                <TransactionDialogs />
                            ) : null}
                            {isTestimonialDialogVisible ? (
                                <TestimonialDialogs />
                            ) : null}
                        </Box>
                    </Box>
                </Box>
            ) : (
                <NotFound />
            )}
        </Box>
    );
}

export default checkAuth(Admin);
