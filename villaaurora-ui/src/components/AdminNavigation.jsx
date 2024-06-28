import React from "react";
import {
    Box,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
} from "@mui/material";
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
    const [selectedNav, setSelectedNav] = React.useState("home");

    const onSelectNav = (navId) => {
        setSelectedNav(navId);

        const navigationActions = {
            usernav: () => {
                setTableVisible(true);
                setServiceDialogVisible(false);
                setRoomDialogVisible(false);
                setTransactionDialogVisible(false);
                setTestimonialDialogVisible(false);
            },
            servicenav: () => {
                setTableVisible(false);
                setServiceDialogVisible(true);
                setRoomDialogVisible(false);
                setTransactionDialogVisible(false);
                setTestimonialDialogVisible(false);
            },
            roomnav: () => {
                setTableVisible(false);
                setServiceDialogVisible(false);
                setRoomDialogVisible(true);
                setTransactionDialogVisible(false);
                setTestimonialDialogVisible(false);
            },
            transactionnav: () => {
                setTableVisible(false);
                setServiceDialogVisible(false);
                setRoomDialogVisible(false);
                setTransactionDialogVisible(true);
                setTestimonialDialogVisible(false);
            },
            testimonialnav: () => {
                setTableVisible(false);
                setServiceDialogVisible(false);
                setRoomDialogVisible(false);
                setTransactionDialogVisible(false);
                setTestimonialDialogVisible(true);
            },
        };

        if (navigationActions[navId]) {
            navigationActions[navId]();
        }
    };

    return (
        <Box>
            <ToggleButtonGroup
                orientation="horizontal"
                value={selectedNav}
                exclusive
            >
                <Tooltip title="Go Back to Homepage">
                    <ToggleButton value="home" component={Link} to="/">
                        <FontAwesomeIcon
                            icon={faHome}
                            style={{ color: "white", paddingLeft: "10px" }}
                        />

                        <Typography sx={{ m: 1, color: "white" }} id="home">
                            Home
                        </Typography>
                    </ToggleButton>
                </Tooltip>
                <Tooltip title="Go to Users Table">
                    <ToggleButton
                        value="usernav"
                        onClick={() =>
                            onSelectNav("usernav", [setTableVisible])
                        }
                    >
                        <FontAwesomeIcon
                            icon={faUser}
                            style={{ color: "white", paddingLeft: "10px" }}
                        />
                        <Typography sx={{ m: 1, color: "white" }} id="usernav">
                            Users
                        </Typography>
                    </ToggleButton>
                </Tooltip>
                <Tooltip title="Go to Services Table">
                    <ToggleButton
                        value="servicenav"
                        onClick={() =>
                            onSelectNav("servicenav", [setServiceDialogVisible])
                        }
                    >
                        <FontAwesomeIcon
                            icon={faBriefcase}
                            style={{ color: "white", paddingLeft: "10px" }}
                        />
                        <Typography
                            sx={{ m: 1, color: "white" }}
                            id="servicenav"
                        >
                            Services
                        </Typography>
                    </ToggleButton>
                </Tooltip>
                <Tooltip title="Go to Rooms Table">
                    <ToggleButton
                        value="roomnav"
                        onClick={() =>
                            onSelectNav("roomnav", [setRoomDialogVisible])
                        }
                    >
                        <FontAwesomeIcon
                            icon={faBed}
                            style={{ color: "white", paddingLeft: "10px" }}
                        />
                        <Typography sx={{ m: 1, color: "white" }} id="roomnav">
                            Rooms
                        </Typography>
                    </ToggleButton>
                </Tooltip>
                <Tooltip title="Go to Transactions Table">
                    <ToggleButton
                        value="transactionnav"
                        onClick={() =>
                            onSelectNav("transactionnav", [
                                setTransactionDialogVisible,
                            ])
                        }
                    >
                        <FontAwesomeIcon
                            icon={faReceipt}
                            style={{ color: "white", paddingLeft: "10px" }}
                        />
                        <Typography
                            sx={{ m: 1, color: "white" }}
                            id="transactionnav"
                        >
                            Transactions
                        </Typography>
                    </ToggleButton>
                </Tooltip>
                <Tooltip title="Go to Testimonials Table">
                    <ToggleButton
                        value="testimonialnav"
                        onClick={() =>
                            onSelectNav("testimonialnav", [
                                setTestimonialDialogVisible,
                            ])
                        }
                    >
                        <FontAwesomeIcon
                            icon={faComment}
                            style={{ color: "white", paddingLeft: "10px" }}
                        />
                        <Typography
                            sx={{ m: 1, color: "white" }}
                            id="testimonialnav"
                        >
                            Testimonials
                        </Typography>
                    </ToggleButton>
                </Tooltip>
            </ToggleButtonGroup>
        </Box>
    );
}
