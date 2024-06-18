import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
    faBed,
    faBriefcase,
    faComment,
    faHome,
    faReceipt,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AdminNavigation({
    setTableVisible,
    setServiceDialogVisible,
    setRoomDialogVisible,
    setTransactionDialogVisible,
    setTestimonialDialogVisible,
}) {
    const onUserNav = (e) => {
        e.preventDefault();
        setTableVisible(true);
        setServiceDialogVisible(false);
        setRoomDialogVisible(false);
        setTransactionDialogVisible(false);
        setTestimonialDialogVisible(false);
    };

    const onServiceNav = (e) => {
        e.preventDefault();
        setTableVisible(false);
        setServiceDialogVisible(true);
        setRoomDialogVisible(false);
        setTransactionDialogVisible(false);
        setTestimonialDialogVisible(false);
    };

    const onRoomNav = (e) => {
        e.preventDefault();
        setTableVisible(false);
        setServiceDialogVisible(false);
        setRoomDialogVisible(true);
        setTransactionDialogVisible(false);
        setTestimonialDialogVisible(false);
    };

    const onTransactionNav = (e) => {
        e.preventDefault();
        setTableVisible(false);
        setServiceDialogVisible(false);
        setRoomDialogVisible(false);
        setTransactionDialogVisible(true);
        setTestimonialDialogVisible(false);
    };

    const onTestimonialNav = (e) => {
        e.preventDefault();
        setTableVisible(false);
        setServiceDialogVisible(false);
        setRoomDialogVisible(false);
        setTransactionDialogVisible(false);
        setTestimonialDialogVisible(true);
    };

    return (
        <Box>
            <Link className="custom-list" to="/">
                <FontAwesomeIcon
                    icon={faHome}
                    style={{ color: "white", paddingLeft: "10px" }}
                />
                <Typography sx={{ m: 1, color: "white" }} id="home">
                    Home
                </Typography>
            </Link>
            <Link className="custom-list" to="#" onClick={onUserNav}>
                <FontAwesomeIcon
                    icon={faUser}
                    style={{ color: "white", paddingLeft: "10px" }}
                />
                <Typography sx={{ m: 1, color: "white" }} id="usernav">
                    Users
                </Typography>
            </Link>
            <Link className="custom-list" to="#" onClick={onServiceNav}>
                <FontAwesomeIcon
                    icon={faBriefcase}
                    style={{ color: "white", paddingLeft: "10px" }}
                />
                <Typography sx={{ m: 1, color: "white" }} id="servicenav">
                    Services
                </Typography>
            </Link>
            <Link className="custom-list" to="#" onClick={onRoomNav}>
                <FontAwesomeIcon
                    icon={faBed}
                    style={{ color: "white", paddingLeft: "10px" }}
                />
                <Typography sx={{ m: 1, color: "white" }} id="roomnav">
                    Rooms
                </Typography>
            </Link>
            <Link className="custom-list" to="#" onClick={onTransactionNav}>
                <FontAwesomeIcon
                    icon={faReceipt}
                    style={{ color: "white", paddingLeft: "10px" }}
                />
                <Typography sx={{ m: 1, color: "white" }} id="transactionnav">
                    Transactions
                </Typography>
            </Link>
            <Link className="custom-list" to="#" onClick={onTestimonialNav}>
                <FontAwesomeIcon
                    icon={faComment}
                    style={{ color: "white", paddingLeft: "10px" }}
                />
                <Typography sx={{ m: 1, color: "white" }} id="testimonialnav">
                    Testimonials
                </Typography>
            </Link>
        </Box>
    );
}
