// src/BottomNavigation.js
import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PaymentIcon from "@mui/icons-material/Payment";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CommentIcon from "@mui/icons-material/Comment";
import { useMediaQuery, useTheme } from "@mui/material";

function BottomNav() {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust based on your needs

    return (
        <div>
            <BottomNavigation
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "space-around",
                    boxShadow: "0px -2px 5px rgba(0,0,0,0.2)",
                    ...(isMobile && {
                        padding: "0 10px",
                    }),
                }}
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                showLabels={!isMobile} // Hide labels on mobile
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="User" icon={<PersonIcon />} />
                <BottomNavigationAction label="Service" icon={<BuildIcon />} />
                <BottomNavigationAction
                    label="Room"
                    icon={<MeetingRoomIcon />}
                />
                <BottomNavigationAction
                    label="Transaction"
                    icon={<PaymentIcon />}
                />
                <BottomNavigationAction
                    label="Pivot"
                    icon={<SwapHorizIcon />}
                />
                <BottomNavigationAction
                    label="Testimonial"
                    icon={<CommentIcon />}
                />
            </BottomNavigation>
        </div>
    );
}

export default BottomNav;
