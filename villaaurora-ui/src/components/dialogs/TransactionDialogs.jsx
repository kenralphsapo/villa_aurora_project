import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
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

export function TransactionDialogs() {
    const [transactionRows, setTransactionRows] = useState([]);
    const [createTransactionDialog, setCreateTransactionDialog] =
        useState(false);
    const [deleteTransactionDialog, setDeleteTransactionDialog] =
        useState(null);
    const [editTransactionDialog, setEditTransactionDialog] = useState(null);

    const [warnings, setWarnings] = useState({});
    const [loading, setLoading] = useState(false);

    const [serviceRows, setServiceRows] = useState([]);
    const [pivotRows, setPivotRows] = useState([]);

    const [serviceIds, setServiceIds] = useState([]);
    const [newServiceId, setNewServiceId] = useState("");
    const [position, setPosition] = useState(false);

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

    const handleAddServiceId = () => {
        const newId = newServiceId.trim();
        if (newId !== "") {
            setServiceIds([...serviceIds, newId]);
            setNewServiceId("");
        }
    };

    const handleRemoveServiceId = (index) => {
        const updatedServiceIds = [...serviceIds];
        updatedServiceIds.splice(index, 1);
        setServiceIds(updatedServiceIds);
    };

    const onCreateTransaction = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                user_id: $("#user_id").val(),
                room_id: $("#room_id").val(),
                rent_start: $("#rent_start").val(),
                rent_end: $("#rent_end").val(),
                service_id: serviceIds,
            };

            addTransaction(body)
                .then((res) => {
                    if (res?.success) {
                        toast.success(res?.message ?? "Transaction successful");
                        setCreateTransactionDialog(false);
                        refreshData();
                        setWarnings({});
                        setServiceIds([]);
                        setNewServiceId("");
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

    const onEditTransaction = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            updateTransaction(
                {
                    rent_start: editTransactionDialog.rent_start,
                    rent_end: editTransactionDialog.rent_end,
                },
                editTransactionDialog.id
            )
                .then((res) => {
                    if (res?.ok) {
                        toast.success(
                            res?.message ?? "Transaction has updated"
                        );
                        setEditTransactionDialog(null);
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

    const onDeleteTransaction = () => {
        if (!loading) {
            setLoading(true);
            deleteTransaction(deleteTransactionDialog)
                .then((res) => {
                    if (res?.success) {
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
        showAllTransactions().then((res) => {
            if (res?.ok) {
                const services = res.data.flatMap((transaction) =>
                    transaction.services.map((service) => ({
                        id: service.id,
                        name: service.name,
                        price: service.pivot.price,
                    }))
                );

                // Extract pivot data for pivotRows
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
        <Box id="section4">
            <Box sx={{ display: "flex", justifyContent: "flex-start", py: 2 }}>
                <Typography variant="h2">Transactions</Typography>
                <Button
                    sx={{ mr: 5 }}
                    onClick={() => setCreateTransactionDialog(true)}
                >
                    <FontAwesomeIcon icon={faAdd} className="addbtn" />
                </Button>
            </Box>
            <DataGrid
                autoHeight
                columns={transactioncolumns}
                rows={transactionRows}
            />
            <Box className="custom-width">
                <Typography variant="h3">
                    {position ? "Service columns " : "Pivot Table "}
                    <FontAwesomeIcon
                        icon={faRefresh}
                        onClick={() => setPosition(!position)}
                    />
                </Typography>
                {position ? (
                    <DataGrid
                        autoHeight
                        columns={servicecolumns}
                        rows={serviceRows}
                    />
                ) : (
                    <DataGrid
                        autoHeight
                        columns={pivotcolumns}
                        rows={pivotRows}
                    />
                )}
            </Box>

            {/* Create Transaction Dialog */}
            <Dialog open={createTransactionDialog}>
                <DialogTitle>Create Transaction Form</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={onCreateTransaction}>
                        <Box>
                            <TextField
                                id="user_id"
                                label="User ID"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                            />
                            {warnings?.user_id ? (
                                <Typography component="small" color="error">
                                    {warnings.user_id}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box>
                            <TextField
                                id="room_id"
                                label="Room ID"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            {warnings?.room_id ? (
                                <Typography component="small" color="error">
                                    {warnings.room_id}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box>
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
                        </Box>
                        <Box>
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
                        </Box>

                        <TextField
                            id="service_id"
                            label="Service ID(s)"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={newServiceId}
                            onChange={(e) => setNewServiceId(e.target.value)}
                            helperText="Enter service ID and click Add"
                        />
                        {warnings?.service_id ? (
                            <Typography component="small" color="error">
                                {warnings.service_id}
                            </Typography>
                        ) : null}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddServiceId}
                            style={{ marginLeft: "10px" }}
                        >
                            Add
                        </Button>
                        {serviceIds.map((serviceId, index) => (
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
                                    value={serviceId}
                                    disabled
                                />
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleRemoveServiceId(index)}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Remove
                                </Button>
                            </Box>
                        ))}
                        <Box className="d-flex justify-content-center align-items-center mt-2">
                            <Button
                                color="info"
                                onClick={() =>
                                    setCreateTransactionDialog(false)
                                }
                            >
                                Close
                            </Button>
                            <Button
                                disabled={loading}
                                type="submit"
                                color="success"
                                style={{ marginLeft: "10px" }}
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
                    <Box
                        component="form"
                        sx={{ p: 1 }}
                        onSubmit={onEditTransaction}
                    >
                        <TextField
                            onChange={(e) =>
                                setEditTransactionDialog({
                                    ...editTransactionDialog,
                                    rent_start: e.target.value,
                                })
                            }
                            value={editTransactionDialog?.rent_start ?? ""}
                            size="small"
                            label="Rent Start"
                            type="date"
                            fullWidth
                        />
                        <TextField
                            onChange={(e) =>
                                setEditTransactionDialog({
                                    ...editTransactionDialog,
                                    rent_end: e.target.value,
                                })
                            }
                            value={editTransactionDialog?.rent_end ?? ""}
                            size="small"
                            label="Rent End"
                            type="date"
                            fullWidth
                        />
                        <Button
                            id="transaction-btn"
                            type="submit"
                            sx={{ display: "none" }}
                        >
                            Submit
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditTransactionDialog(null)}>
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={() => {
                            $("#transaction-btn").trigger("click");
                        }}
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
                    <Button onClick={() => setDeleteTransactionDialog(null)}>
                        Cancel
                    </Button>
                    <Button disabled={loading} onClick={onDeleteTransaction}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
