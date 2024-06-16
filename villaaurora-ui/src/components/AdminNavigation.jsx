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
        <Box >
            <Link className="custom-list"  to="/">
            <FontAwesomeIcon icon={faHome} style={{color:'white', paddingLeft:'10px'}} />
                <Typography sx={{ m: 1, color: "white" }}  id="home">
                    Home 
                </Typography>
           
            </Link>
            <Link className="custom-list"  onClick={onUserNav}>
            <FontAwesomeIcon icon={faUser} style={{color:'white', paddingLeft:'10px'}} />
                <Typography sx={{ m: 1, color: "white" }} id="usernav">
                    Users 
          
                </Typography>
            </Link>
            <Link className="custom-list"  onClick={onServiceNav}>
            <FontAwesomeIcon icon={faBriefcase} style={{color:'white', paddingLeft:'10px'}} />
                <Typography sx={{ m: 1, color: "white" }} id="servicenav">
                    Services
                </Typography>
            </Link>
            <Link className="custom-list" onClick={onRoomNav}>
            <FontAwesomeIcon icon={faBed} style={{color:'white', paddingLeft:'10px'}} />
                <Typography sx={{ m: 1, color: "white" }}  id="roomnav">
                    Rooms 
                </Typography>
            </Link>
            <Link className="custom-list" onClick={onTransactionNav}>
            <FontAwesomeIcon icon={faReceipt} style={{color:'white', paddingLeft:'10px'}} />
                <Typography sx={{ m: 1, color: "white" }}  id="transactionnav">
                    Transactions 
                </Typography>
            </Link>
            <Link className="custom-list"  onClick={onTestimonialNav}>
            <FontAwesomeIcon icon={faComment} style={{color:'white', paddingLeft:'10px'}} />
                <Typography sx={{ m: 1, color: "white" }} id="testimonialnav">
                    Testimonials
                </Typography>
            </Link>
        </Box>
    );
};

export default AdminNavigation;
