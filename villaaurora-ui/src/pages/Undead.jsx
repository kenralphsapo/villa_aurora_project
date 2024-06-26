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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import { showAllTransactions, updateTransaction } from "../api/transaction";
import { DataGrid } from "@mui/x-data-grid";
import { showAllServices } from "../api/service";

export default function Undead() {
    const [transactionRows, setTransactionRows] = useState([]);
    const [editTransactionDialog, setEditTransactionDialog] = useState(null);
    const [availableServiceIds, setAvailableServiceIds] = useState([]);
    const [selectedServiceIds, setSelectedServiceIds] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAvailableServiceIds();
    }, []);

    const fetchAvailableServiceIds = () => {
        showAllServices().then((res) => {
            if (res?.ok) {
                setAvailableServiceIds(res.data);
            } else {
                toast.error(res?.message ?? "Failed to fetch services.");
            }
        });
    };

    const addServiceId = (event) => {
        const serviceIdToAdd = availableServiceIds.find(
            (service) => service.id === event.target.value
        );
        if (serviceIdToAdd) {
            setSelectedServiceIds([...selectedServiceIds, serviceIdToAdd]);
        }
    };

    const removeServiceId = (serviceIdToRemove) => {
        const updatedSelectedServiceIds = selectedServiceIds.filter(
            (service) => service.id !== serviceIdToRemove
        );
        setSelectedServiceIds(updatedSelectedServiceIds);
    };

    const onEditTransaction = (e) => {
        e.preventDefault();
        if (!loading && editTransactionDialog) {
            setLoading(true);

            const updatedTransaction = {
                user_id: editTransactionDialog.user_id,
                room_id: editTransactionDialog.room_id,
                rent_start: editTransactionDialog.rent_start,
                rent_end: editTransactionDialog.rent_end,
                service_id: selectedServiceIds.map((service) => service.id),
            };

            updateTransaction(updatedTransaction, editTransactionDialog.id)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Transaction updated successfully.");
                        setEditTransactionDialog(null);
                        refreshData();
                    } else {
                        toast.error(res?.message ?? "Failed to update transaction.");
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
                setTransactionRows(res.data);
            } else {
                toast.error(res?.message ?? "Failed to fetch transactions.");
            }
        });
    };

    useEffect(() => {
        refreshData();
    }, []);

    const transactioncolumns = [
        { field: "id", headerName: "ID" },
        { field: "user_id", headerName: "User ID" },
        { field: "room_id", headerName: "Room ID" },
        { field: "rent_start", headerName: "Rent Start", width: 120 },
        { field: "rent_end", headerName: "Rent End", width: 120 },
        { field: "created_at", headerName: "Created At", width: 200 },
        { field: "updated_at", headerName: "Updated At", width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            filterable: false,
            width: 160,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        gap: 1,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setEditTransactionDialog(params.row)}
                    >
                        Edit
                    </Button>
                </Box>
            ),
        },
    ];

    return (
        <>
            <DataGrid
                autoHeight
                columns={transactioncolumns}
                rows={transactionRows}
            />

            <Dialog open={!!editTransactionDialog}>
                <DialogTitle>Edit Transaction</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={onEditTransaction} sx={{ p: 2 }}>
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
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel>Select Service ID</InputLabel>
                            <Select
                                value="" // Initialize with empty string or null
                                onChange={addServiceId}
                                fullWidth
                            >
                                {availableServiceIds.map((service) => (
                                    <MenuItem key={service.id} value={service.id}>
                                        {service.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box mt={2}>
                            {selectedServiceIds.map((service, index) => (
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
                                        onClick={() => removeServiceId(service.id)}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                        {/* Ensure there is a hidden submit button */}
                        <Button type="submit" style={{ display: "none" }}>
                            Submit
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditTransactionDialog(null)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={onEditTransaction}
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
