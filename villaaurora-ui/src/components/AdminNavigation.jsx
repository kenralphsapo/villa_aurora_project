import {
    faBed,
    faBriefcase,
    faComment,
    faHome,
    faReceipt,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const AdminNavigation = ({
    setTableVisible,
    setServiceDialogVisible,
    setRoomDialogVisible,
    setTransactionDialogVisible,
    setTestimonialDialogVisible,
}) => {
    const onUserNav = () => {
        setTableVisible(true);
        setServiceDialogVisible(false);
        setRoomDialogVisible(false);
        setTransactionDialogVisible(false);
        setTestimonialDialogVisible(false);
    };

    const onServiceNav = () => {
        setTableVisible(false);
        setServiceDialogVisible(true);
        setRoomDialogVisible(false);
        setTransactionDialogVisible(false);
        setTestimonialDialogVisible(false);
    };

    const onRoomNav = () => {
        setTableVisible(false);
        setServiceDialogVisible(false);
        setRoomDialogVisible(true);
        setTransactionDialogVisible(false);
        setTestimonialDialogVisible(false);
    };

    const onTransactionNav = () => {
        setTableVisible(false);
        setServiceDialogVisible(false);
        setRoomDialogVisible(false);
        setTransactionDialogVisible(true);
        setTestimonialDialogVisible(false);
    };

    const onTestimonialNav = () => {
        setTableVisible(false);
        setServiceDialogVisible(false);
        setRoomDialogVisible(false);
        setTransactionDialogVisible(false);
        setTestimonialDialogVisible(true);
    };

    return (
        <Box className="custom-childnavbar">
            <Link className="custom-list" to="/">
                <Typography sx={{ m: 1, color: "white" }} id="home">
                    Home <FontAwesomeIcon icon={faHome} />
                </Typography>
            </Link>
            <Link className="custom-list" onClick={onUserNav}>
                <Typography sx={{ m: 1, color: "white" }} id="usernav">
                    Users <FontAwesomeIcon icon={faUser} />
                </Typography>
            </Link>
            <Link className="custom-list" onClick={onServiceNav}>
                <Typography sx={{ m: 1, color: "white" }} id="servicenav">
                    Services <FontAwesomeIcon icon={faBriefcase} />
                </Typography>
            </Link>
            <Link className="custom-list" onClick={onRoomNav}>
                <Typography sx={{ m: 1, color: "white" }} id="roomnav">
                    Rooms <FontAwesomeIcon icon={faBed} />
                </Typography>
            </Link>
            <Link className="custom-list" onClick={onTransactionNav}>
                <Typography sx={{ m: 1, color: "white" }} id="transactionnav">
                    Transactions <FontAwesomeIcon icon={faReceipt} />
                </Typography>
            </Link>
            <Link className="custom-list" onClick={onTestimonialNav}>
                <Typography sx={{ m: 1, color: "white" }} id="testimonialnav">
                    Testimonials <FontAwesomeIcon icon={faComment} />
                </Typography>
            </Link>
        </Box>
    );
};

export default AdminNavigation;
