import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    useTheme,
    useMediaQuery,
    Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ServicesIcon from "@mui/icons-material/Work";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LoginIcon from "@mui/icons-material/Login";

const drawerWidth = 240;

function Navigation() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const drawerItems = (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            style={{ width: drawerWidth, paddingTop: 64 }} // Padding to avoid overlap with close button
        >
            <IconButton
                edge="end"
                color="inherit"
                aria-label="close"
                onClick={toggleDrawer(false)}
                sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1201, // Ensure close button is above drawer content
                }}
            >
                <CloseIcon />
            </IconButton>
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary="About" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ServicesIcon />
                    </ListItemIcon>
                    <ListItemText primary="Services" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ContactMailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Contact" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <>
            <AppBar
                id="appbar"
                position="fixed" // Change position to fixed
                sx={{
                    borderBottom: isMobile
                        ? "none"
                        : "1px solid rgba(0, 0, 0, 0.12)", // Add border to normal nav bar
                    width: "100%", // Ensure it spans the full width
                    zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure it is above other content
                }}
            >
                <Toolbar>
                    {isMobile ? (
                        <>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer(!drawerOpen)}
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                sx={{
                                    flexGrow: 1,
                                    display: "inline",
                                    color: "white",
                                }}
                            ></Typography>
                            <Box display="flex" alignItems="center">
                                <IconButton
                                    edge="end"
                                    color="inherit"
                                    aria-label="sign up"
                                    sx={{ ml: 1 }}
                                >
                                    <LoginIcon />
                                </IconButton>
                                <Typography
                                    variant="body2"
                                    sx={{ ml: 1, color: "white", mr: 2 }}
                                >
                                    Sign Up
                                </Typography>
                            </Box>
                            <Drawer
                                anchor="left"
                                open={drawerOpen}
                                sx={{ width: drawerWidth }}
                            >
                                {drawerItems}
                            </Drawer>
                        </>
                    ) : (
                        <>
                            <Typography
                                variant="h6"
                                sx={{
                                    flexGrow: 1,
                                    fontFamily: "Playfair Display",
                                    color: "white",
                                }}
                            >
                                Villa Aurora
                            </Typography>
                            <Button color="inherit" startIcon={<HomeIcon />}>
                                Home
                            </Button>
                            <Button color="inherit" startIcon={<InfoIcon />}>
                                About
                            </Button>
                            <Button
                                color="inherit"
                                startIcon={<ServicesIcon />}
                            >
                                Services
                            </Button>
                            <Button
                                color="inherit"
                                startIcon={<ContactMailIcon />}
                            >
                                Contact
                            </Button>
                            <Box display="flex" alignItems="center">
                                <IconButton
                                    edge="end"
                                    color="inherit"
                                    aria-label="sign up"
                                    sx={{ ml: 1 }}
                                >
                                    <LoginIcon />
                                </IconButton>
                                <Typography
                                    variant="body2"
                                    sx={{ ml: 1, color: "white" }}
                                >
                                    Sign Up
                                </Typography>
                            </Box>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navigation;
