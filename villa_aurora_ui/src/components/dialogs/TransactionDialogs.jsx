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
import { faAdd } from "@fortawesome/free-solid-svg-icons";
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

    const [warnings, setWarnings] = useState({});
    const [loading, setLoading] = useState(false);

    const [serviceRows, setServiceRows] = useState([]);
    const [serviceIds, setServiceIds] = useState([]);
    const [selectedServiceName, setSelectedServiceName] = useState("");
    const [position, setPosition] = useState(false);

    // For users
    const [rows, setRows] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");

    // For rooms
    const [roomRows, setRoomRows] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState("");

    const [cookies] = useCookies(["AUTH_TOKEN"]);
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
                        setCreateTransactionDialog(false);
                        refreshData();
                        setWarnings({});
                        setServiceIds([]);
                        setSelectedServiceName("");
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

    // Edit transaction Area
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
                    service_id: serviceIds,
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

    const ServiceRefreshData = () => {
        showAllServices(cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                const services = res.data;
                setServiceRows(services);

                // Create a map from service name to ID
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
    }, []);

    useEffect(() => {
        RoomrefreshData();
    }, []);

    useEffect(() => {
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
            <Box sx={{ display: "flex", justifyContent: "flex-start", py: 2 }}>
                <Typography variant="h2">Transactions</Typography>
                <Button
                    sx={{ mr: 5 }}
                    onClick={() => setCreateTransactionDialog(true)}
                >
                    {user?.role == "admin" && (
                        <Tooltip title="Add Transaction">
                            <FontAwesomeIcon icon={faAdd} className="addbtn" />
                        </Tooltip>
                    )}
                </Button>
            </Box>
            <DataGrid
                autoHeight
                columns={transactioncolumns}
                rows={transactionRows}
            />

            {/* Create Transaction Dialog */}
            <Dialog open={!!createTransactionDialog}>
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
                        <Box>
                            <TextField
                                fullWidth
                                id="rent_start"
                                label="Rent Start"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                id="rent_end"
                                label="Rent End"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                            <Typography component="small" color="error">
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
                                onClick={() =>
                                    setCreateTransactionDialog(false)
                                }
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
        </Box>
    );
}
