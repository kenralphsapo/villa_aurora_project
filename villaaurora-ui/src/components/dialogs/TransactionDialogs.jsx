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
import React, { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

import $ from "jquery";
import { toast } from "react-toastify";
import {
    addTransaction,
    deleteTransaction,
    showAllTransactions,
    updateTransaction,
} from "../../api/transaction";
import { getAllDataPivot } from "../../api/pivot";

export function TransactionDialogs() {
    const [transactionRows, setTransactionRows] = useState([]);
    //For Transactions
    const [createTransactionDialog, setCreateTransactionDialog] =
        useState(false);
    const [deleteTransactionDialog, setDeleteTransactionDialog] =
        useState(null);
    const [editTransactionDialog, setEditTransactionDialog] = useState(null);

    const [loading, setLoading] = useState(false);

    const [pivotrows, setPivotRows] = useState([]);
    // For Transactions
    const transactioncolumns = [
        { field: "id", headerName: "ID" },
        { field: "user_id", headerName: "User ID" },
        { field: "room_id", headerName: "Room ID" },
        { field: "rent_start", headerName: "Rent Start", width: 100 },
        { field: "rent_end", headerName: "Rent End", width: 160 },
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
                user_id: $("#user_id").val(),
                room_id: $("#room_id").val(),
                rent_start: $("#rent_start").val(),
                rent_end: $("#rent_end").val(),
                service_id: $("#service_id").val(),
            };

            addTransaction(body)
                .then((res) => {
                    if (res?.success) {
                        toast.success(res?.message ?? "Transaction successful");
                        // Additional logic if needed after successful transaction
                    } else {
                        toast.error(
                            res?.message ?? "Transaction creation failed."
                        );
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
                        TrefreshData();
                    } else {
                        toast.error(res?.message ?? "Something went wrong.");
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const onDeleteTransaction = (e) => {
        if (!loading) {
            setLoading(true);
            deleteTransaction(deleteTransactionDialog)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(
                            res?.message ?? "Transaction has deleted"
                        );
                        setDeleteTransactionDialog(null);
                        TrefreshData();
                    } else {
                        toast.error(res?.message ?? "Something went wrong.");
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const TrefreshData = () => {
        showAllTransactions().then((res) => {
            if (res?.ok) {
                setTransactionRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    useEffect(TrefreshData, []);

    const pivotcolumns = [
        { field: "service_id", headerName: "Service ID" },
        { field: "transaction_id", headerName: "Transaction ID" },
        { field: "price", headerName: "Price" },
    ];

    const PivotrefreshData = () => {
        getAllDataPivot().then((res) => {
            if (res?.ok) {
                // Assuming the response data contains an "id" field
                const rowsWithId = res.data.map((row, index) => ({
                    ...row,
                    id: index + 1, // Generate a unique ID for each row
                }));
                setPivotRows(rowsWithId);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    useEffect(PivotrefreshData, []);

    return (
        <Box id="section4">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 2,
                }}
            >
                <Typography variant="h2">Transactions</Typography>
                <Button
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
            <Box className="custom-width">
                <Typography variant="h3">Pivot table</Typography>
                <DataGrid autoHeight columns={pivotcolumns} rows={pivotrows} />
            </Box>
            {/* Create Transaction */}
            <Dialog open={!!createTransactionDialog}>
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
                        </Box>
                        <Box>
                            <TextField
                                id="room_id"
                                label="Room ID"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
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
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
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
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>
                        <Box>
                            <TextField
                                id="service_id"
                                label="Service ID(s)"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                helperText="Enter service IDs separated by commas"
                            />
                        </Box>
                        <Box className="d-flex justify-content-center align-items-center">
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
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Edit Transaction */}
            <Dialog open={!!editTransactionDialog}>
                <DialogTitle>Edit Transaction</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{ p: 1 }}
                        onSubmit={onEditTransaction}
                    >
                        <Box sx={{ mt: 1 }}>
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
                        </Box>
                        <Box sx={{ mt: 1 }}>
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
                        </Box>
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
            {/* Delete Transaction */}
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
