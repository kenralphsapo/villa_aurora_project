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
    deleteTransaction,
    showAllTransactions,
    updateTransaction,
} from "../../api/transaction";

export function TransactionDialogs() {
    const [transactionRows, setTransactionRows] = useState([]);
    //For Transactions
    const [deleteTransactionDialog, setDeleteTransactionDialog] =
        useState(null);
    const [editTransactionDialog, setEditTransactionDialog] = useState(null);

    const [loading, setLoading] = useState(false);
    // For Transactions
    const transactioncolumns = [
        { field: "id", headerName: "ID" },
        { field: "user_id", headerName: "User ID", width: 130 },
        { field: "room_id", headerName: "Room ID", width: 130 },
        { field: "rent_start", headerName: "Rent Start", width: 160 },
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

    const TrefreshData = () => {
        showAllTransactions().then((res) => {
            if (res?.ok) {
                setTransactionRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    const onDeleteTransaction = (e) => {
        if (!loading) {
            setLoading(true);
            deleteTransaction(deleteTransactionDialog)
                .then((res) => {
                    if (res?.ok) {
                        console.log(res);
                        toast.success(
                            res?.message ?? "Transaction has deleted"
                        );
                        setTransactionDeleteDialog(null);
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

    useEffect(TrefreshData, []);
    return (
        <Box id="section4">
            <Typography variant="h2">Transactions</Typography>
            <DataGrid
                autoHeight
                columns={transactioncolumns}
                rows={transactionRows}
            />
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
                    <Button onClick={() => setTransactionDeleteDialog(null)}>
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
