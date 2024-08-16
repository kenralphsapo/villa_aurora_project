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
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { logoutUser } from "../redux/authSlice";

const drawerWidth = 240;

function Navigation() {
    const user = useSelector((state) => state.auth.user);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [cookies, setCookie, removeCookie] = useCookies();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };
    const handleLogout = () => {
        const token = cookies.AUTH_TOKEN;
        dispatch(logoutUser(token))
            .unwrap() // Unwrap to directly handle fulfilled/rejected cases
            .then(() => {
                removeCookie("AUTH_TOKEN");
                navigate("/login");
                toast.success("Logged out successfully.");
            })
            .catch((err) => {
                toast.error("Logout failed: " + err);
            });
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
                <Link to="/admin" style={{ textDecoration: "none" }}>
                    <ListItem>
                        <ListItemIcon>
                            <AdminPanelSettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Admin" />
                    </ListItem>
                </Link>
                <Link href="/guest" style={{ textDecoration: "none" }}>
                    <ListItem>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Account" />
                    </ListItem>
                </Link>
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
                                {user ? (
                                    <Button onClick={handleLogout}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                ml: 1,
                                                color: "white",
                                                mr: 2,
                                                cursor: "pointer",
                                            }}
                                        >
                                            Logout
                                        </Typography>
                                    </Button>
                                ) : (
                                    <Link
                                        to="/login"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                ml: 1,
                                                color: "white",
                                                mr: 2,
                                            }}
                                        >
                                            Sign up
                                        </Typography>
                                    </Link>
                                )}
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
                            <Button
                                color="inherit"
                                startIcon={<HomeIcon />}
                                href="#section_1"
                            >
                                Home
                            </Button>
                            <Button
                                color="inherit"
                                startIcon={<InfoIcon />}
                                href="#section_5"
                            >
                                About
                            </Button>
                            <Button
                                color="inherit"
                                startIcon={<ServicesIcon />}
                                href="#section_2"
                            >
                                Services
                            </Button>
                            <Button
                                color="inherit"
                                startIcon={<ContactMailIcon />}
                                href="#section_5"
                            >
                                Contact
                            </Button>
                            {user ? (
                                <>
                                    {user?.role == "admin" ? (
                                        <Link
                                            to="/admin"
                                            style={{
                                                textDecoration: "none",
                                                color: "white",
                                            }}
                                        >
                                            <Button
                                                color="inherit"
                                                startIcon={
                                                    <AdminPanelSettingsIcon />
                                                }
                                            >
                                                Admin
                                            </Button>
                                        </Link>
                                    ) : null}
                                    {user?.role == "guest" ? (
                                        <Link
                                            to="/guest"
                                            style={{
                                                textDecoration: "none",
                                                color: "white",
                                            }}
                                        >
                                            <Button
                                                color="inherit"
                                                startIcon={
                                                    <AccountCircleIcon />
                                                }
                                                href="#section_5"
                                            >
                                                My Account
                                            </Button>
                                        </Link>
                                    ) : null}
                                </>
                            ) : null}
                            <Box display="flex" alignItems="center">
                                <IconButton
                                    edge="end"
                                    color="inherit"
                                    aria-label="sign up"
                                    sx={{ ml: 1 }}
                                >
                                    <LoginIcon />
                                </IconButton>
                                {user ? (
                                    <Button onClick={handleLogout}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                ml: 1,
                                                color: "white",
                                                mr: 2,
                                                cursor: "pointer",
                                            }}
                                        >
                                            Logout
                                        </Typography>
                                    </Button>
                                ) : (
                                    <Link
                                        to="/login"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                ml: 1,
                                                color: "white",
                                                mr: 2,
                                            }}
                                        >
                                            Sign up
                                        </Typography>
                                    </Link>
                                )}
                            </Box>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navigation;
