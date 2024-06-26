import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import checkAuth from "../hoc/checkAuth";

import logo from "./images/logo.jpg";

import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import "./css/bootstrap-resort.css";

import { destroy, update } from "../api/user";
import NotFound from "./NotFound";
import { login } from "../api/auth";
function Myaccout() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");

    const [cookies, setCookie, removeCookie] = useCookies();
    const [loading, setLoading] = useState(false);

    const [deleteDialog, setDeleteDialog] = useState(null);
    const [deletePermanentDialog, setDeletePermanentDialog] = useState(null);
    const [showAccount, setAccount] = useState(false);
    useEffect(() => {
        setUsername(user?.username);
        setMobile(user?.mobile);
        setEmail(user?.email);
    }, [user]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!loading) {
            update(
                {
                    username,
                    mobile,
                    email,
                },
                user.id,
                cookies.AUTH_TOKEN
            ).then((res) => {
                if (res?.ok) {
                    navigate("/");
                    toast.success(res?.message ?? "Updated successfully.");
                } else {
                    toast.error(res?.message ?? "Something went wrong.");
                }
            });
        }
    };

    const onDelete = () => {
        if (!loading) {
            setLoading(true);
            destroy(deletePermanentDialog, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Account has deleted");
                        setDeleteDialog(null);
                        navigate("/");
                        dispatch(login(res.data));
                        removeCookie("AUTH_TOKEN");
                        window.location.reload()
                    } else {
                        toast.error(res?.message ?? "Something went wrong.");
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const onEditAccount = (e) => {
        e.preventDefault();
        setAccount(true);
    };

    const onCancelAccount = (e) => {
        e.preventDefault();
        setAccount(false);
    };


    return (
        <Box>
            {user ? (
                <Box id="homebg">
                    {user?.role !== "admin" ? (
                        <>
                            <Box className="row">
                                <Box
                                    id="sidebarMenu"
                                    className="col-md-3 col-lg-2 d-md-block sidebar collapse p-0"
                                >
                                    <Box className="position-sticky sidebar-sticky d-flex flex-column justify-content-center align-items-center">
                                        <Link
                                            to="/"
                                            id="link"
                                            className="navbar-brand"
                                        >
                                            <img
                                                src={logo}
                                                alt="Logo"
                                                className="logo-image img-fluid"
                                            />
                                            <Typography
                                                id="customheader"
                                                variant="h5"
                                                className="text-white"
                                            >
                                                Villa Aurora Private Resort
                                            </Typography>
                                        </Link>
                                        <Typography
                                            variant="h6"
                                            className="text-black mt-2"
                                        >
                                            Welcome{" "}
                                            {user?.username ??
                                                "Wait, Who are you??"}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="col-md-8 ms-sm-auto col-lg-10 p-0">
                                <Box
                                    className="d-flex justify-content-center align-items-center"
                                    style={{ height: "100vh" }}
                                >
                                    <Box
                                        id="custom-account"
                                        component="form"
                                        onSubmit={onSubmit}
                                    >
                                        <Typography
                                            variant="h3"
                                            className="text-center"
                                        >
                                            {showAccount
                                                ? "EDIT ACCOUNT"
                                                : "MY ACCOUNT"}
                                        </Typography>
                                        <Box sx={{ mt: 1 }}>
                                            {showAccount ? (
                                                <TextField
                                                    size="small"
                                                    label="Username"
                                                    type="text"
                                                    onChange={(e) =>
                                                        setUsername(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={username}
                                                    fullWidth
                                                />
                                            ) : (
                                                <Typography className="text-black">
                                                    Name: {username}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Box sx={{ mt: 1 }}>
                                            {showAccount ? (
                                                <TextField
                                                    onChange={(e) =>
                                                        setMobile(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={mobile}
                                                    size="small"
                                                    label="Mobile"
                                                    type="text"
                                                    fullWidth
                                                />
                                            ) : (
                                                <Typography className="text-black">
                                                    Mobile: {mobile}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Box sx={{ mt: 1 }}>
                                            {showAccount ? (
                                                <TextField
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    value={email}
                                                    size="small"
                                                    label="Email"
                                                    type="email"
                                                    fullWidth
                                                />
                                            ) : (
                                                <Typography className="text-black">
                                                    Email: {email}
                                                </Typography>
                                            )}
                                        </Box>
                                        {showAccount ? (
                                            <Button
                                                type="submit"
                                                id="custom-editbtn"
                                                disabled={loading}
                                            >
                                                Save
                                            </Button>
                                        ) : (
                                            <Button
                                                id="custom-editbtn"
                                                onClick={onEditAccount}
                                                disabled={loading}
                                            >
                                                Edit Account
                                            </Button>
                                        )}
                                        {showAccount ? (
                                            <Button
                                                id="custom-cancelbtn"
                                                onClick={onCancelAccount}
                                                disabled={loading}
                                            >
                                                Cancel
                                            </Button>
                                        ) : (
                                            <Button
                                                disabled={loading}
                                                type="submit"
                                                color="info"
                                                href="/"
                                                id="custom-cancelbtn"
                                            >
                                                Cancel
                                            </Button>
                                        )}

                                        <Button
                                            onClick={() =>
                                                setDeleteDialog(user.id)
                                            }
                                            id="custom-deletebtn"
                                        >
                                            Delete
                                        </Button>
                                        <Dialog open={!!deleteDialog}>
                                            <DialogTitle>
                                                Are you sure?
                                            </DialogTitle>
                                            <DialogContent>
                                                <Typography>
                                                    Do you want to delete this
                                                    Account
                                                </Typography>
                                            </DialogContent>
                                            <DialogActions
                                                sx={{
                                                    display: !!deleteDialog
                                                        ? "flex"
                                                        : "none",
                                                }}
                                            >
                                                <Button
                                                    onClick={() =>
                                                        setDeleteDialog(null)
                                                    }
                                                    style={{border: "2px solid blue"}}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    disabled={loading}
                                                    onClick={() =>
                                                        setDeletePermanentDialog(
                                                            user.id
                                                        )
                                                        
                                                    }
                                                    color="error"
                                                    style={{border:"2px solid red"}}
                                                >
                                                    Confirm
                                                </Button>
                                                <Dialog
                                                    open={
                                                        !!deletePermanentDialog
                                                    }
                                                >
                                                    <DialogTitle>
                                                        Terms and Conditions
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <Typography>
                                                            By deleting this
                                                            account, you
                                                            acknowledge that it
                                                            will no longer be
                                                            possible to log in
                                                            to this account once
                                                            it is deleted.
                                                        </Typography>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button
                                                            disabled={loading}
                                                            onClick={onDelete}
                                                            color="error"
                                                            style={{border:"2px solid red"}}
                                                        >
                                                            Delete Permanently
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </DialogActions>
                                        </Dialog>
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    ) : (
                        <NotFound />
                    )}
                </Box>
            ) : (
                <NotFound />
            )}
        </Box>
    );
}

export default checkAuth(Myaccout);
