import React from "react";
import logo from "../pages/images/logo.jpg";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from "../hoc/checkAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function Navigation({ toggleDrawer, logout }) {
    const user = useSelector((state) => state.auth.user);
    return (
        <Box id="sidebarMenu">
            <Button style={{ background: "#fff", padding: 10,color:"black" }} onClick={toggleDrawer}>
                <FontAwesomeIcon icon={faX} />
            </Button>
            <Box className="position-sticky sidebar-sticky d-flex flex-column justify-content-center align-items-center">
                <Link to="/" id="link" className="navbar-brand">
                    <img
                        src={logo}
                        alt="Logo"
                        className="logo-image img-fluid"
                    />
                    <h5 id="customheader">Villa Aurora Private Resort</h5>
                </Link>
                {user ? (
                    <Typography className="mt-2">{user?.username}</Typography>
                ) : null}
                <Box id="nav-column" className="nav flex-column">
                    <Box variant="li" className="nav-item">
                        <a
                            href="#section_1"
                            className="nav-link click-scroll"
                            onClick={toggleDrawer}
                        >
                            Home
                        </a>
                    </Box>

                    <Box variant="li" className="nav-item">
                        <a
                            href="#section_2"
                            className="nav-link click-scroll"
                            onClick={toggleDrawer}
                        >
                            Services
                        </a>
                    </Box>

                    <Box variant="li" className="nav-item">
                        <a
                            href="#section_3"
                            className="nav-link click-scroll"
                            onClick={toggleDrawer}
                        >
                            Features
                        </a>
                    </Box>

                    <Box variant="li" className="nav-item">
                        <a
                            href="#section_4"
                            className="nav-link click-scroll"
                            onClick={toggleDrawer}
                        >
                            Price List
                        </a>
                    </Box>

                    <Box variant="li" className="nav-item">
                        <a
                            href="#section_5"
                            className="nav-link click-scroll"
                            onClick={toggleDrawer}
                        >
                            Contact
                        </a>
                    </Box>
                    {user ? (
                        <>
                            {user?.role == "guest" && (
                                <Box variant="li" className="nav-item">
                                    <Link
                                        to="/guest"
                                        className="nav-link click-scroll text-black"
                                    >
                                        Myaccount
                                    </Link>
                                </Box>
                            )}

                            {user?.role == "admin" && (
                                <Box variant="li" className="nav-item">
                                    <Link
                                        to="/admin"
                                        className="nav-link click-scroll text-black"
                                    >
                                        {user?.role}
                                    </Link>
                                </Box>
                            )}

                            <Box variant="li" className="nav-item">
                                <Link
                                    onClick={logout}
                                    className="nav-link click-scroll text-black"
                                >
                                    Logout
                                </Link>
                            </Box>
                        </>
                    ) : (
                        <Box variant="li" className="nav-item">
                            <Link to="/login" className="nav-link click-scroll">
                                Login
                            </Link>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
export default checkAuth(Navigation);
