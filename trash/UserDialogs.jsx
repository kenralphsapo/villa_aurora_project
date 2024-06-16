import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    Tooltip,
    IconButton,
} from "@mui/material";
import {
    faArrowUp,
    faCheckCircle,
    faEnvelope,
    faPhone,
    faSun,
    faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

import { toast } from "react-toastify";
import $ from "jquery";

import { DataGrid } from "@mui/x-data-grid";
import { destroy, index, store, update } from "../../api/user";

export function UserDialogs() {
    const user = useSelector((state) => state.auth.user);
    const [createDialog, setCreateDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(null);
    const [editDialog, setEditDialog] = useState(null);

    const [loading, setLoading] = useState(false);
    const [warnings, setWarnings] = useState({});
    const [cookies] = useCookies(["AUTH_TOKEN"]);

    const [rows, setRows] = useState([]);
    //For Users
    const [data, setData] = useState([]); // Assuming you have data state
    const [lastUpdatedTimes, setLastUpdatedTimes] = useState({}); // State to track last update times

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "username", headerName: "Username", width: 150 },
        { field: "mobile", headerName: "Mobile", width: 150 },
        { field: "email", headerName: "Email", width: 150 },
        { field: "role", headerName: "Role" },
        { field: "created_at", headerName: "Create At", width: 200 },
        { field: "updated_at", headerName: "Update At", width: 200 },
        {
            field: "profile",
            headerName: "Profile",
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <img
                    src={params.row.profile}
                    alt="Service Image"
                    style={{ width: "100px", height: "100px" }}
                />
            ),
            width: 200,
        },
        {
            field: "actions",
            headerName: "",
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => setEditDialog({ ...params.row })}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => setDeleteDialog(params.row.id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
            width: 200,
        },
    ];

    const refreshData = () => {
        index(cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                setRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    useEffect(refreshData, []);

    const onCreate = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                username: $("#username").val(),
                password: $("#password").val(),
                password_confirmation: $("#password_confirmation").val(),
                mobile: $("#mobile").val(),
                email: $("#email").val(),
            };

            store(body, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(
                            res?.message ?? "Account has been created"
                        );
                        setCreateDialog(false);
                        setWarnings({});
                        refreshData();
                    } else {
                        toast.error(res?.message ?? "Something went wrong.");
                        setWarnings(res?.errors);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const onDelete = (e) => {
        if (!loading) {
            setLoading(true);
            destroy(deleteDialog, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Account has deleted");
                        setDeleteDialog(null);
                        refreshData();
                    } else {
                        toast.error(res?.message ?? "Something went wrong.");
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const onEdit = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            update(
                {
                    username: editDialog.username,
                    mobile: editDialog.mobile,
                    email: editDialog.email,
                    role: editDialog.role,
                },
                editDialog.id,
                cookies.AUTH_TOKEN
            )
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Account has updated");
                        setEditDialog(null);
                        refreshData();
                    } else {
                        toast.error(res?.message ?? "Something went wrong.");
                        setWarnings(res?.errors);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };
    return (
        <Box sx={{ mt: 2 }} id="section1">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 2,
                }}
            >
                <Typography variant="h2">Users</Typography>
                <Button sx={{ mr: 5 }} onClick={() => setCreateDialog(true)}>
                    Create User
                </Button>
            </Box>
            <DataGrid autoHeight columns={columns} rows={rows} />

            {/* CREATE USER FORM DIALOG */}
            <Dialog
                open={!!createDialog}
                style={{ maxWidth: "400px", display: "block", margin: "auto" }}
            >
                <DialogTitle>Create Form</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={onCreate}>
                        <Box>
                            <TextField
                                id="username"
                                label="Username"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                            />
                            {warnings?.username ? (
                                <Typography component="small" color="error">
                                    {warnings.username}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box>
                            <TextField
                                id="password"
                                label="Password"
                                variant="outlined"
                                margin="normal"
                                type="password"
                                fullWidth
                                required
                            />
                            {warnings?.password ? (
                                <Typography component="small" color="error">
                                    {warnings.password}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box>
                            <TextField
                                id="password_confirmation"
                                label="Repeat Password"
                                variant="outlined"
                                margin="normal"
                                type="password"
                                fullWidth
                                required
                            />
                            {warnings?.password_confirmation ? (
                                <Typography component="small" color="error">
                                    {warnings.password_confirmation}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box>
                            <TextField
                                id="mobile"
                                label="Mobile No."
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                            />
                            {warnings?.mobile ? (
                                <Typography component="small" color="error">
                                    {warnings.mobile}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box>
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                            />
                            {warnings?.email ? (
                                <Typography component="small" color="error">
                                    {warnings.email}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box>
                            <Button
                                id="submit_btn"
                                disabled={loading}
                                type="submit"
                                sx={{ display: "none" }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="info" onClick={() => setCreateDialog(false)}>
                        Close
                    </Button>
                    <Button
                        onClick={() => {
                            $("#submit_btn").trigger("click");
                        }}
                        id="submitbtn"
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* DELETE USER FORM DIALOG */}
            <Dialog open={!!deleteDialog}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Do you want to delete this user ID: {deleteDialog}
                    </Typography>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: !!deleteDialog ? "flex" : "none",
                    }}
                >
                    <Button onClick={() => setDeleteDialog(null)}>
                        Cancel
                    </Button>
                    <Button disabled={loading} onClick={onDelete}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* EDIT USER FORM DIALOG */}
            <Dialog
                open={!!editDialog}
                style={{ maxWidth: "400px", display: "block", margin: "auto" }}
            >
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ p: 1 }} onSubmit={onEdit}>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                onChange={(e) =>
                                    setEditDialog({
                                        ...editDialog,
                                        username: e.target.value,
                                    })
                                }
                                value={editDialog?.username ?? ""}
                                size="small"
                                label="Username"
                                type="text"
                                fullWidth
                            />
                            {warnings?.username ? (
                                <Typography component="small" color="error">
                                    {warnings.username}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                onChange={(e) =>
                                    setEditDialog({
                                        ...editDialog,
                                        mobile: e.target.value,
                                    })
                                }
                                value={editDialog?.mobile ?? ""}
                                size="small"
                                label="Mobile"
                                type="mobile"
                                fullWidth
                            />
                            {warnings?.mobile ? (
                                <Typography component="small" color="error">
                                    {warnings.mobile}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                onChange={(e) =>
                                    setEditDialog({
                                        ...editDialog,
                                        email: e.target.value,
                                    })
                                }
                                value={editDialog?.email ?? ""}
                                size="small"
                                label="Email"
                                type="email"
                                fullWidth
                            />
                            {warnings?.email ? (
                                <Typography component="small" color="error">
                                    {warnings.email}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    labelId="role-label"
                                    value={editDialog?.role ?? ""}
                                    onChange={(e) =>
                                        setEditDialog({
                                            ...editDialog,
                                            role: e.target.value,
                                        })
                                    }
                                >
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="scheduler">
                                        Scheduler
                                    </MenuItem>
                                    <MenuItem value="guest">Guest</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Button
                            id="edit-btn"
                            type="submit"
                            sx={{ display: "none" }}
                        >
                            Submit
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialog(null)}>Cancel</Button>
                    <Button
                        disabled={loading}
                        onClick={() => {
                            $("#edit-btn").trigger("click");
                        }}
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
