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
import { Link } from "react-router-dom";

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
            style={{ width: drawerWidth, paddingTop: 64 }}
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
                    zIndex: 10,
                }}
            >
                <CloseIcon />
            </IconButton>
            <List>
                <a href="#section_1" style={{ textDecoration: "none" }}>
                    <ListItem>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </a>
                <a href="#section_5" style={{ textDecoration: "none" }}>
                    <ListItem>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary="About" />
                    </ListItem>
                </a>
                <a href="#section_2" style={{ textDecoration: "none" }}>
                    <ListItem>
                        <ListItemIcon>
                            <ServicesIcon />
                        </ListItemIcon>
                        <ListItemText primary="Services" />
                    </ListItem>
                </a>
                <a href="#section_5" style={{ textDecoration: "none" }}>
                    <ListItem>
                        <ListItemIcon>
                            <ContactMailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contact" />
                    </ListItem>
                </a>
            </List>
        </div>
    );

    return (
        <>
            <AppBar
                id="appbar"
                position="fixed"
                sx={{
                    borderBottom: isMobile
                        ? "none"
                        : "1px solid rgba(0, 0, 0, 0.12)",
                    width: "100%",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
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
                                <Link to="/login">
                                    <Typography
                                        variant="body2"
                                        sx={{ ml: 1, color: "white", mr: 2 }}
                                    >
                                        Sign Up
                                    </Typography>
                                </Link>
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
                                <Link to="/login">
                                    <Typography
                                        variant="body2"
                                        sx={{ ml: 1, color: "white", mr: 2 }}
                                    >
                                        Sign Up
                                    </Typography>
                                </Link>
                            </Box>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navigation;
