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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import $ from "jquery";

import {
    addTransaction,
    deleteTransaction,
    showAllTransactions,
    updateTransaction,
} from "../../api/transaction";
import { showAllRooms } from "../../api/room";
import { index } from "../../api/user";
import { showAllServices } from "../../api/service";

export function TransactionDialogs({
    createDialog,
    setCreateDialog,
    editDialog,
    setEditDialog,
    deleteDialog,
    setDeleteDialog,
    loading,
    setLoading,
    warnings,
    setWarnings,
    cookies,
}) {
    const [transactionRows, setTransactionRows] = useState([]);
    const [serviceRows, setServiceRows] = useState([]);
    const [serviceIds, setServiceIds] = useState([]);
    const [selectedServiceName, setSelectedServiceName] = useState("");
    // For users
    const [rows, setRows] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    // For rooms
    const [roomRows, setRoomRows] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState("");
    const [serviceMap, setServiceMap] = useState({});

    const transactioncolumns = [
        { field: "id", headerName: "ID" },
        { field: "user_id", headerName: "User ID" },
        { field: "room_id", headerName: "Room ID" },
        { field: "rent_start", headerName: "Rent Start", width: 100 },
        { field: "rent_end", headerName: "Rent End", width: 100 },
        { field: "created_at", headerName: "Create At", width: 200 },
        { field: "updated_at", headerName: "Update At", width: 200 },
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
                        onClick={() => setEditDialog(params.row)}
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

    const onCreateTransaction = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                user_id: selectedUserId,
                room_id: selectedRoomId,
                rent_start: $("#rent_start").val(),
                rent_end: $("#rent_end").val(),
                service_id: serviceIds,
            };
            addTransaction(body, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Transaction successful");
                        refreshData();
                        setWarnings({});
                        setCreateDialog(false);
                        setServiceIds([]);
                        setSelectedServiceName("");
                    } else {
                        toast.error(
                            res?.message ?? "Transaction creation failed."
                        );
                        setWarnings(res?.errors);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const onAddService = () => {
        const serviceId = serviceMap[selectedServiceName];

        if (!serviceId) {
            toast.error("Service not found.");
            return;
        }

        if (serviceIds.includes(serviceId)) {
            toast.error("Service has already been added.");
            return;
        }

        setServiceIds([...serviceIds, serviceId]);
        setSelectedServiceName("");
    };

    const onRemoveService = (id) => {
        setServiceIds(serviceIds.filter((service) => service !== id));
    };

    const onEditTransaction = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            updateTransaction(
                {
                    id: editDialog.id,
                    user_id: editDialog.user_id,
                    room_id: editDialog.room_id,
                    rent_start: editDialog.rent_start,
                    rent_end: editDialog.rent_end,
                    service_id: serviceIds,
                },
                cookies.AUTH_TOKEN
            )
                .then((res) => {
                    if (res?.success) {
                        toast.success(
                            res?.message ?? "Transaction updated successfully."
                        );
                        setEditDialog(null);
                        refreshData();
                        setWarnings({});
                    } else {
                        toast.error(
                            res?.message ?? "Failed to update transaction."
                        );
                        setWarnings(res?.errors);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const fetchServiceData = () => {
        showAllServices(cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                const services = res.data;
                setServiceRows(services);
                const serviceMap = services.reduce((acc, service) => {
                    acc[service.name] = service.id;
                    return acc;
                }, {});
                setServiceMap(serviceMap);
            } else {
                toast.error(res?.message ?? "Failed to fetch services.");
            }
        });
    };

    const fetchUserData = () => {
        index(cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                setRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    const fetchRoomData = () => {
        showAllRooms(cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                setRoomRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    useEffect(() => {
        fetchUserData();
        fetchRoomData();
        fetchServiceData();
    }, []);

    const onDeleteTransaction = () => {
        if (!loading) {
            setLoading(true);
            deleteTransaction(deleteDialog, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(
                            res?.message ?? "Transaction has been deleted"
                        );
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

    const refreshData = () => {
        showAllTransactions(cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                setTransactionRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <Box id="section4">
            <Box
                sx={{ display: "flex", justifyContent: "space-between", py: 2 }}
            >
                <Typography variant="h2">Transactions</Typography>
                <Button
                    sx={{ mr: 5 }}
                    variant="contained"
                    color="info"
                    onClick={() => setCreateDialog(true)}
                >
                    Create Transaction
                </Button>
            </Box>
            <DataGrid
                autoHeight
                columns={transactioncolumns}
                rows={transactionRows}
            />

            {/* Create Transaction Dialog */}
            <Dialog open={!!createDialog}>
                <DialogTitle>Create Transaction Form</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={onCreateTransaction}>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel>User Id/Name</InputLabel>
                            <Select
                                value={selectedUserId}
                                onChange={(e) =>
                                    setSelectedUserId(e.target.value)
                                }
                                fullWidth
                                label="User"
                            >
                                {rows.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.username}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {warnings?.user_id ? (
                            <Typography component="small" color="error">
                                {warnings.user_id}
                            </Typography>
                        ) : null}
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel>Room ID</InputLabel>
                            <Select
                                value={selectedRoomId}
                                onChange={(e) =>
                                    setSelectedRoomId(e.target.value)
                                }
                                fullWidth
                                label="Room"
                            >
                                {roomRows.map((room) => (
                                    <MenuItem key={room.id} value={room.id}>
                                        {room.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {warnings?.room_id ? (
                            <Typography component="small" color="error">
                                {warnings.room_id}
                            </Typography>
                        ) : null}
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                id="rent_start"
                                label="Rent Start"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!warnings?.rent_start}
                                helperText={warnings?.rent_start}
                            />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                id="rent_end"
                                label="Rent End"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!warnings?.rent_end}
                                helperText={warnings?.rent_end}
                            />
                        </Box>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel>Service</InputLabel>
                            <Select
                                value={selectedServiceName}
                                onChange={(e) =>
                                    setSelectedServiceName(e.target.value)
                                }
                                fullWidth
                                label="Service"
                                error={!!warnings?.service_id}
                            >
                                {serviceRows.map((service) => (
                                    <MenuItem
                                        key={service.id}
                                        value={service.name}
                                    >
                                        {service.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {warnings?.service_id ? (
                            <Typography
                                component="small"
                                color="error"
                                sx={{ display: "block" }}
                            >
                                {warnings.service_id}
                            </Typography>
                        ) : null}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onAddService}
                            style={{ marginTop: "10px" }}
                        >
                            Add
                        </Button>

                        {serviceIds.map((serviceId, index) => {
                            const serviceName = Object.keys(serviceMap).find(
                                (name) => serviceMap[name] === serviceId
                            );
                            return (
                                <Box
                                    key={index}
                                    mt={1}
                                    display="flex"
                                    alignItems="center"
                                >
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        value={serviceName}
                                        disabled
                                    />
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() =>
                                            onRemoveService(serviceId)
                                        }
                                        style={{ marginLeft: "10px" }}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            );
                        })}
                        <Box className="d-flex justify-content-end align-items-center mt-2">
                            <Button
                                color="info"
                                onClick={() => {
                                    setCreateDialog(false);
                                    setServiceIds([]);
                                    setSelectedServiceName("");
                                    setWarnings({});
                                }}
                                style={{ border: "2px solid #077bff" }}
                            >
                                Close
                            </Button>
                            <Button
                                disabled={loading}
                                type="submit"
                                color="success"
                                style={{
                                    marginLeft: "10px",
                                    border: "2px solid green",
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Edit Transaction Dialog */}
            <Dialog open={!!editDialog} fullWidth maxWidth="md">
                <DialogTitle>Edit Transaction</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={onEditTransaction}>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel>User</InputLabel>
                            <Select
                                value={editDialog?.user_id ?? ""}
                                onChange={(e) =>
                                    setEditDialog((prev) => ({
                                        ...prev,
                                        user_id: e.target.value,
                                    }))
                                }
                                fullWidth
                                label="User"
                            >
                                {rows.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        {user.username}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {warnings?.user_id && (
                            <Typography component="small" color="error">
                                {warnings.user_id}
                            </Typography>
                        )}
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel>Room</InputLabel>
                            <Select
                                value={editDialog?.room_id ?? ""}
                                onChange={(e) =>
                                    setEditDialog((prev) => ({
                                        ...prev,
                                        room_id: e.target.value,
                                    }))
                                }
                                fullWidth
                                label="Room"
                            >
                                {roomRows.map((room) => (
                                    <MenuItem key={room.id} value={room.id}>
                                        {room.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {warnings?.room_id && (
                            <Typography component="small" color="error">
                                {warnings.room_id}
                            </Typography>
                        )}
                        <TextField
                            id="rent_start"
                            label="Rent Start"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={editDialog?.rent_start ?? ""}
                            onChange={(e) =>
                                setEditDialog((prev) => ({
                                    ...prev,
                                    rent_start: e.target.value,
                                }))
                            }
                            error={!!warnings?.rent_start}
                            helperText={warnings?.rent_start}
                        />

                        <TextField
                            id="rent_end"
                            label="Rent End"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={editDialog?.rent_end ?? ""}
                            onChange={(e) =>
                                setEditDialog((prev) => ({
                                    ...prev,
                                    rent_end: e.target.value,
                                }))
                            }
                            error={!!warnings?.rent_end}
                            helperText={warnings?.rent_end}
                        />

                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel>Service</InputLabel>
                            <Select
                                value={selectedServiceName}
                                onChange={(e) =>
                                    setSelectedServiceName(e.target.value)
                                }
                                fullWidth
                                label="Service"
                            >
                                {Object.keys(serviceMap).map((name) => (
                                    <MenuItem key={name} value={name}>
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {warnings?.service_id && (
                            <Typography component="small" color="error">
                                {warnings.service_id}
                            </Typography>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onAddService}
                            style={{ marginTop: "10px" }}
                        >
                            Add
                        </Button>

                        {serviceIds.map((serviceId, index) => {
                            const serviceName = Object.keys(serviceMap).find(
                                (name) => serviceMap[name] === serviceId
                            );
                            return (
                                <Box
                                    key={index}
                                    mt={1}
                                    display="flex"
                                    alignItems="center"
                                >
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        value={serviceName}
                                        disabled
                                    />
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() =>
                                            onRemoveService(serviceId)
                                        }
                                        style={{ marginLeft: "10px" }}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            );
                        })}

                        <Box className="d-flex justify-content-end align-items-center mt-2">
                            <Button
                                color="info"
                                onClick={() => {
                                    setEditDialog(null);
                                    setWarnings({});
                                }}
                                style={{ border: "2px solid #007bff" }}
                            >
                                Close
                            </Button>
                            <Button
                                disabled={loading}
                                type="submit"
                                color="success"
                                style={{
                                    marginLeft: "10px",
                                    border: "2px solid green",
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Delete Transaction Dialog */}
            <Dialog open={!!deleteDialog}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Do you want to delete this Transaction ID:{" "}
                        {deleteDialog}
                    </Typography>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: !!deleteDialog ? "flex" : "none",
                    }}
                >
                    <Button
                        onClick={() => setDeleteDialog(null)}
                        style={{ border: "2px solid #007bff" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={onDeleteTransaction}
                        color="error"
                        style={{ border: "2px solid red" }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
