import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import checkAuth from "../hoc/checkAuth";
import { useSelector } from "react-redux";
import NotFound from "./NotFound";
import { ServiceDialog } from "../components/dialogs/ServiceDialogs";
import { RoomDialog } from "../components/dialogs/RoomDialogs";
import { TransactionDialogs } from "../components/dialogs/TransactionDialogs";
import { TestimonialDialogs } from "../components/dialogs/TestimonialDialogs";

import { UserDialogs } from "../components/dialogs/UserDialogs";
import AdminNavigation from "../components/AdminNavigation";

import logo from "./images/logo.jpg";
function Admin() {
    const user = useSelector((state) => state.auth.user);

    const [showTableVisible, setTableVisible] = useState(true);
    const [isServiceDialogVisible, setServiceDialogVisible] = useState(false);
    const [isRoomDialogVisible, setRoomDialogVisible] = useState(false);
    const [isTransactionDialogVisible, setTransactionDialogVisible] =
        useState(false);
    const [isTestimonialDialogVisible, setTestimonialDialogVisible] =
        useState(false);

    /*if (user?.role !== "admin") {
        return <NotFound />;
    }*/
    return (
        <Box>
                {user?.role == "admin" ? (
                <Box id="custom-admin">
                    <Box>
                        <Box id="customnavadmin">
                            <Box >
                            <img
                                src={logo}
                                alt="Logo"
                                className="admin-logo"
                            />

                                <Box className="">
                                    <Typography
                                        variant="h6"
                                        className="text-center"
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
                        <Box className="table">
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
