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
    Tooltip,
    Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faRefresh } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";

import {
    addTransaction,
    deleteTransaction,
    showAllTransactions,
    updateTransaction,
} from "../../api/transaction";
import { showAllRooms } from "../../api/room";
import { index } from "../../api/user";
import { useCookies } from "react-cookie";
import { showAllServices } from "../../api/service";
import { useSelector } from "react-redux";

export function TransactionDialogs() {
    const user = useSelector((state) => state.auth.user);
    const [transactionRows, setTransactionRows] = useState([]);
    const [createTransactionDialog, setCreateTransactionDialog] =
        useState(false);
    const [deleteTransactionDialog, setDeleteTransactionDialog] =
        useState(null);
    const [editTransactionDialog, setEditTransactionDialog] = useState(null);
    const [serviceNames, setServiceNames] = useState([]);
    const [warnings, setWarnings] = useState({});
    const [loading, setLoading] = useState(false);

    const [serviceRows, setServiceRows] = useState([]);
    const [pivotRows, setPivotRows] = useState([]);

    const [serviceIds, setServiceIds] = useState([]);
    const [addId, setAddId] = useState("");
    const [position, setPosition] = useState(false);

    // For  users
    const [rows, setRows] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");

    // for rooms
    const [roomRows, setRoomRows] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState("");

    const [cookies] = useCookies(["AUTH_TOKEN"]);
    const [serviceid, setServiceId] = useState([]);

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
                        onClick={() =>
                            setEditTransactionDialog({ ...params.row })
                        }
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                            setDeleteTransactionDialog(params.row.id)
                        }
                    >
                        Delete
                    </Button>
                </Box>
            ),
            width: 200,
        },
    ];

    //  Create transaction Area
    const onAddService = () => {
        const service = serviceNames.find((s) => s.name === addId);
        if (service && !serviceIds.includes(service.id)) {
            setServiceIds([...serviceIds, service.id]);
            setAddId("");
        } else {
            toast.error("Service name is invalid or already added.");
        }
    };

    const onRemoveService = (id) => {
        setServiceIds(serviceIds.filter((serviceId) => serviceId !== id));
    };

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
                    if (res?.success) {
                        toast.success(res?.message ?? "Transaction successful");
                        setCreateTransactionDialog(false);
                        refreshData();
                        setWarnings({});
                        setServiceIds([]);
                        setAddId("");
                        setRoomRows([]);
                        setRows([]);
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

    //  Edit transaction Area
    const onEditTransaction = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            updateTransaction(
                {
                    user_id: editTransactionDialog.user_id,
                    room_id: editTransactionDialog.room_id,
                    rent_start: editTransactionDialog.rent_start,
                    rent_end: editTransactionDialog.rent_end,
                    service_id: serviceid.map((service) => service.id),
                },
                editTransactionDialog.id,
                cookies.AUTH_TOKEN
            )
                .then((res) => {
                    if (res?.success) {
                        toast.success(
                            res?.message ?? "Transaction updated successfully."
                        );
                        setEditTransactionDialog(null);
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

    const addServiceId = (e) => {
        const value = e.target.value;
        const service = serviceRows.find((service) => service.id == value);
        if (service) {
            setServiceId([...serviceid, service]);
        }
    };

    const removeServiceId = (serviceIdToRemove) => {
        const updatedserviceid = serviceid.filter(
            (service) => service.id !== serviceIdToRemove
        );
        setServiceId(updatedserviceid);
    };

    const ServiceRefreshData = () => {
        showAllServices(cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                setServiceRows(res.data);
            } else {
                toast.error(res?.message ?? "Failed to fetch services.");
            }
        });
    };

    const UserrefreshData = () => {
        index(cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                setRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    const RoomrefreshData = () => {
        showAllRooms(cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                setRoomRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    useEffect(() => {
        UserrefreshData();
        RoomrefreshData();
        ServiceRefreshData();
    }, []);

    const onDeleteTransaction = () => {
        if (!loading) {
            setLoading(true);
            deleteTransaction(deleteTransactionDialog, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(
                            res?.message ?? "Transaction has been deleted"
                        );
                        setDeleteTransactionDialog(null);
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

    const servicecolumns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Name", width: 100 },
        { field: "price", headerName: "Price" },
    ];

    const pivotcolumns = [
        { field: "service_id", headerName: "Service ID" },
        { field: "transaction_id", headerName: "Transaction ID", width: 200 },
        { field: "price", headerName: "Price" },
    ];

    const refreshData = () => {
        showAllTransactions(cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                const services = res.data.flatMap((transaction) =>
                    transaction.services.map((service) => ({
                        id: service.id,
                        name: service.name,
                        price: service.pivot.price,
                    }))
                );

                const pivot = res.data.flatMap((transaction) =>
                    transaction.services.map((service) => ({
                        id: `${service.id}-${transaction.id}`,
                        service_id: service.id,
                        transaction_id: transaction.id,
                        price: service.pivot.price,
                    }))
                );
                setTransactionRows(res.data);
                setServiceRows(services);
                setPivotRows(pivot);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <Box className="mt-2" id="section4">
            <Box
                sx={{ display: "flex", justifyContent: "space-between", py: 2 }}
            >
                <Typography variant="h2">Transactions</Typography>
                <Button
                    variant="contained"
                    color="info"
                    sx={{ mr: 5 }}
                    onClick={() => setCreateTransactionDialog(true)}
                >
                    Create Transaction
                </Button>
            </Box>
            <DataGrid
                autoHeight
                columns={transactioncolumns}
                rows={transactionRows}
            />
            <Box
                sx={{ display: "flex", justifyContent: "space-between", py: 2 }}
            >
                <Typography variant="h2">Pivot Table</Typography>
                <Button
                    variant="contained"
                    color="info"
                    sx={{ mr: 5 }}
                    onClick={() => setPosition(!position)}
                >
                    Switch Pivot
                </Button>
            </Box>
            {position ? (
                <DataGrid
                    autoHeight
                    columns={servicecolumns}
                    rows={serviceRows}
                />
            ) : (
                <DataGrid autoHeight columns={pivotcolumns} rows={pivotRows} />
            )}
            {/* Create Transaction Dialog */}
            <Dialog
                open={createTransactionDialog}
                sx={{ width: 400, margin: "auto" }}
            >
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
                        <TextField
                            id="rent_start"
                            label="Rent Start"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="date"
                            InputLabelProps={{ shrink: true }}
                        />
                        {warnings?.rent_start ? (
                            <Typography component="small" color="error">
                                {warnings.rent_start}
                            </Typography>
                        ) : null}
                        <TextField
                            id="rent_end"
                            label="Rent End"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="date"
                            InputLabelProps={{ shrink: true }}
                        />
                        {warnings?.rent_end ? (
                            <Typography component="small" color="error">
                                {warnings.rent_end}
                            </Typography>
                        ) : null}

                        <TextField
                            id="service_id"
                            label="Service Name"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={addId}
                            onChange={(e) => setAddId(e.target.value)}
                            helperText="Enter service name and click Add"
                        />
                        {warnings?.service_id ? (
                            <Typography component="small" color="error">
                                {warnings.service_id}
                            </Typography>
                        ) : null}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onAddService}
                            style={{ marginLeft: "10px" }}
                        >
                            Add
                        </Button>
                        {serviceIds.map((serviceId, index) => {
                            const service = serviceNames.find(
                                (s) => s.id === serviceId
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
                                        value={service?.name || ""}
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
                                    setCreateTransactionDialog(false);
                                    setWarnings({});
                                    setServiceIds([]);
                                    setAddId("");
                                    setRoomRows([]);
                                    setRows([]);
                                }}
                                style={{ border: "2px solid blue" }}
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
            <Dialog open={!!editTransactionDialog}>
                <DialogTitle>Edit Transaction</DialogTitle>
                <DialogContent>
                    <Box sx={{ p: 2 }}>
                        <Box>
                            <TextField
                                fullWidth
                                label="User ID"
                                value={editTransactionDialog?.user_id ?? ""}
                                onChange={(e) =>
                                    setEditTransactionDialog((prevState) => ({
                                        ...prevState,
                                        user_id: e.target.value,
                                    }))
                                }
                                variant="outlined"
                                margin="normal"
                            />
                            {warnings?.user_id ? (
                                <Typography component="small" color="error">
                                    {warnings.user_id}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                label="Room ID"
                                value={editTransactionDialog?.room_id ?? ""}
                                onChange={(e) =>
                                    setEditTransactionDialog((prevState) => ({
                                        ...prevState,
                                        room_id: e.target.value,
                                    }))
                                }
                                variant="outlined"
                                margin="normal"
                            />
                            {warnings?.room_id ? (
                                <Typography component="small" color="error">
                                    {warnings.room_id}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                label="Rent Start"
                                type="date"
                                value={editTransactionDialog?.rent_start ?? ""}
                                onChange={(e) =>
                                    setEditTransactionDialog((prevState) => ({
                                        ...prevState,
                                        rent_start: e.target.value,
                                    }))
                                }
                                variant="outlined"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {warnings?.rent_start ? (
                                <Typography component="small" color="error">
                                    {warnings.rent_start}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                label="Rent End"
                                type="date"
                                value={editTransactionDialog?.rent_end ?? ""}
                                onChange={(e) =>
                                    setEditTransactionDialog((prevState) => ({
                                        ...prevState,
                                        rent_end: e.target.value,
                                    }))
                                }
                                variant="outlined"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {warnings?.rent_end ? (
                                <Typography component="small" color="error">
                                    {warnings.rent_end}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box>
                            <Box>
                                <FormControl
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                >
                                    <InputLabel>Select Service ID</InputLabel>
                                    <Select
                                        value=""
                                        onChange={addServiceId}
                                        fullWidth
                                    >
                                        {serviceRows.map((service) => (
                                            <MenuItem
                                                key={service.id}
                                                value={service.id}
                                            >
                                                {service.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {warnings?.service_id ? (
                                    <Typography component="small" color="error">
                                        {warnings.service_id}
                                    </Typography>
                                ) : null}
                            </Box>
                        </Box>
                        <Box mt={2}>
                            {serviceid.map((service, index) => (
                                <Box
                                    key={index}
                                    mt={1}
                                    display="flex"
                                    alignItems="center"
                                >
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        margin="normal"
                                        value={service.name}
                                        disabled
                                    />
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() =>
                                            removeServiceId(service.id)
                                        }
                                        style={{ marginLeft: "10px" }}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                        <Button type="submit" style={{ display: "none" }}>
                            Submit
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{ border: "2px solid lightblue" }}
                        onClick={() => setEditTransactionDialog(null)}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="success"
                        sx={{ border: "2px solid lightgreen" }}
                        disabled={loading}
                        onClick={onEditTransaction}
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Transaction Dialog */}
            <Dialog open={!!deleteTransactionDialog}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Do you want to delete this Transaction ID:{" "}
                        {deleteTransactionDialog}
                    </Typography>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: !!deleteTransactionDialog ? "flex" : "none",
                    }}
                >
                    <Button
                        onClick={() => setDeleteTransactionDialog(null)}
                        style={{ border: "2px solid blue" }}
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
