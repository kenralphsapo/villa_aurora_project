import React, { useState, useEffect } from "react";
import {
    Button,
    Grid,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box, 
} from "@mui/material";
import { faBars, faTimes, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


import logo from "./images/logo.jpg";
import { useSelector } from "react-redux";


function LandingPage() {
    const user = useSelector((state) => state.auth.user);
    const [scrollVisible, setScrollVisible] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const toggleScrollUpButton = () => {
            if (
                document.body.scrollTop > 20 ||
                document.documentElement.scrollTop > 20
            ) {
                setScrollVisible(true);
            } else {
                setScrollVisible(false);
            }
        };

        const handleScroll = () => {
            toggleScrollUpButton();
        };


        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        My Website
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
            <Box
                    id="sidebarMenu"

                >
  <button className="close-btn" id="closeBtn" onClick={toggleDrawer}>&#10006;</button>
                    <Box className="position-sticky sidebar-sticky d-flex flex-column justify-content-center align-items-center">
                        <Link to="/" id="link" className="navbar-brand">
                            <img
                                src={logo}
                                alt="Logo"
                                className="logo-image img-fluid"
                            />
                            <Typography
                                id="customheader"
                                variant="h5"
                                sx={{ color: "white" }}
                                className="h5"
                            >
                                Villa Aurora Private Resort
                            </Typography>
                        </Link>
                        {user ? (
                            <Typography
                                variant="h6"
                                sx={{ color: "gray", mt: 2 }}
                            >
                                {user?.username}
                            </Typography>
                        ) : null}
                        <Box id="nav-column" className="nav flex-column">
                            <Box variant="li" className="nav-item">
                                <a
                                    href="#section_1"
                                    className="nav-link click-scroll"
                                >
                                    Home
                                </a>
                            </Box>

                            <Box variant="li" className="nav-item">
                                <a
                                    href="#section_2"
                                    className="nav-link click-scroll"
                                >
                                    Services
                                </a>
                            </Box>

                            <Box variant="li" className="nav-item">
                                <a
                                    href="#section_3"
                                    className="nav-link click-scroll"
                                >
                                    Features
                                </a>
                            </Box>

                            <Box variant="li" className="nav-item">
                                <a
                                    href="#section_4"
                                    className="nav-link click-scroll"
                                >
                                    Price List
                                </a>
                            </Box>

                            <Box variant="li" className="nav-item">
                                <a
                                    href="#section_5"
                                    className="nav-link click-scroll"
                                >
                                    Contact
                                </a>
                            </Box>
                            {user ? (
                                <>
                                    {user?.role !== "guest" &&
                                        user?.role !== "scheduler" && (
                                            <Box
                                                variant="li"
                                                className="nav-item"
                                            >
                                                <Link
                                                    to="/admin"
                                                    className="nav-link click-scroll"
                                                >
                                                    {user?.role}
                                                </Link>
                                            </Box>
                                        )}

                                    {user?.role !== "admin" && (
                                        <Box variant="li" className="nav-item">
                                            <Link
                                                to="/guest"
                                                className="nav-link click-scroll"
                                            >
                                                Myaccount
                                            </Link>
                                        </Box>
                                    )}

                                    <Box variant="li" className="nav-item">
                                        <Link
                                            onClick={logout}
                                            className="nav-link click-scroll"
                                        >
                                            Logout
                                        </Link>
                                    </Box>
                                </>
                            ) : (
                                <Box variant="li" className="nav-item">
                                    <Link
                                        to="/login"
                                        className="nav-link click-scroll"
                                    >
                                        Login
                                    </Link>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Drawer>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={8}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            position: "fixed",
                            bottom: "20px",
                            right: "20px",
                            display: scrollVisible ? "block" : "none",
                        }}
                        onClick={handleScrollToTop}
                    >
                        <FontAwesomeIcon icon={faArrowUp} />
                    </Button>
                    {/* Your website content goes here */}
                    <Typography variant="h4" align="center">
                        My Website
                    </Typography>
                    <hr />
                    <br />
                    <Typography variant="body1">
                        {/* Lorem ipsum content */}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ea laboriosam velit ab sunt voluptates. Doloremque dicta
                        aliquam soluta, deserunt quibusdam dolor praesentium
                        doloribus cupiditate quod eveniet modi vel possimus!
                        Quis!
                    </Typography>
                    <br />
                    <hr />
                </Grid>
            </Grid>
        </>
    );
};

export default LandingPage;
