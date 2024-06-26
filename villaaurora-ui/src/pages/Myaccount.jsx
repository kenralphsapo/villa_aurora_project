import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    TextareaAutosize,
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
import "./css/bootstrap-min.css";
import { destroy, update } from "../api/user";
import NotFound from "./NotFound";

function Myaccout() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [cookies] = useCookies(["AUTH_TOKEN"]);
    const [loading, setLoading] = useState(false);

    const [deleteDialog, setDeleteDialog] = useState(null);
    const [deletePermanentDialog, setDeletePermanentDialog] = useState(null);
    if (user?.role !== "guest") {
        return <NotFound />;
    }

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
                    dispatch(updateUser(res.data));
                    toast.success(res?.message ?? "Updated in successfully.");
                } else {
                    toast.error(res?.message ?? "Something went wrong.");
                }
            });
        }
    };

    const onDelete = (e) => {
        if (!loading) {
            setLoading(true);
            destroy(deletePermanentDialog, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Account has deleted");
                        setDeleteDialog(null);
                        navigate("/");
                        dispatch(update(res.data));
                    } else {
                        toast.error(res?.message ?? "Something went wrong.");
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <Box>
            {user?.role !== "admin" ? (
                <Box id="homebg">
                    <Box className="row">
                        <Box
                            id="sidebarMenu"
                            className="col-md-3 col-lg-2 d-md-block sidebar collapse p-0"
                        >
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
                                    >
                                        Villa Aurora Private Resort
                                    </Typography>
                                </Link>
                                <Typography
                                    variant="h6"
                                    sx={{ color: "black", mt: 2 }}
                                >
                                    Welcome{" "}
                                    {user?.username ?? "Wait, Who are you??"}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="col-md-8 ms-sm-auto col-lg-9 p-0">
                        <Box
                            className="d-flex justify-content-center align-items-center"
                            style={{ height: "100vh" }}
                        >
                            <Box
                                id="custom-account"
                                sx={{
                                    boxShadow: "0 0 10px black",
                                    borderRadius: "10px",
                                    width: "400px",
                                    p: "20px",
                                }}
                                component="form"
                                onSubmit={onSubmit}
                            >
                                <Typography
                                    variant="h3"
                                    sx={{ textAlign: "center" }}
                                >
                                    EDIT ACCOUNT
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                    <TextField
                                        size="small"
                                        label="Username"
                                        type="text"
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        value={username}
                                        placeholder={user?.username ?? "User"}
                                        fullWidth
                                    />
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField
                                        onChange={(e) =>
                                            setMobile(e.target.value)
                                        }
                                        value={mobile}
                                        size="small"
                                        label="Mobile"
                                        type="text"
                                        placeholder={user?.mobile ?? "Mobile"}
                                        fullWidth
                                    />
                                </Box>
                                <Box sx={{ mt: 1 }}>
                                    <TextField
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        value={email}
                                        size="small"
                                        label="Email"
                                        type="email"
                                        placeholder={user?.email ?? "Email"}
                                        fullWidth
                                    />
                                </Box>
                                <Button
                                    type="submit"
                                    id="custom-edit"
                                    disabled={loading}
                                >
                                    Edit
                                </Button>
                                <Button
                                    type="submit"
                                    color="info"
                                    href="/"
                                    id="custom-submit"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => setDeleteDialog(user.id)}
                                    id="custom-deletebtn"
                                >
                                    Delete
                                </Button>
                                <Dialog open={!!deleteDialog}>
                                    <DialogTitle>Are you sure?</DialogTitle>
                                    <DialogContent>
                                        <Typography>
                                            Do you want to delete this Account
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
                                        >
                                            Confirm
                                        </Button>
                                        <Dialog open={!!deletePermanentDialog}>
                                            <DialogTitle>
                                                Terms and Conditions
                                            </DialogTitle>
                                            <DialogContent>
                                                <Typography>
                                                    By deleting this account,
                                                    you acknowledge that it will
                                                    no longer be possible to log
                                                    in to this account once it
                                                    is deleted.
                                                </Typography>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button
                                                    disabled={loading}
                                                    onClick={onDelete}
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
                </Box>
            ) : (
                <NotFound />
            )}
        </Box>
    );
}

export default checkAuth(Myaccout);
