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
    return <></>;
}
export default checkAuth(Navigation);
