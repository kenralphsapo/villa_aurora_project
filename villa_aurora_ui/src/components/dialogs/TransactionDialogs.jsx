import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Rating,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import $ from "jquery";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import {
    addTransaction,
    deleteTransaction,
    showAllTransactions,
    updateTransaction,
} from "../../api/transaction";

export function TransactionDialogs() {
    const [transactionRows, setTransactionRows] = useState([]);
    const [deleteDialog, setDeleteDialog] = useState(null);
    const [editDialog, setEditDialog] = useState(null);
    const [createDialog, setCreateDialog] = useState(false);
    const [warnings, setWarnings] = useState({});
    const [cookies] = useCookies(["AUTH_TOKEN"]);
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(0);
    // For Testimonials
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
        showAllTransactions(cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                setTransactionRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };
    useEffect(refreshData, []);

    const onEdit = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            updateTransaction({}, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(
                            res?.message ?? "Testimonial has updated"
                        );
                        setEditDialog(null);
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

    const onDelete = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            deleteTransaction(deleteDialog, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(
                            res?.message ?? "Testimonial has deleted"
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

    const onCreate = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                transaction_id: $("#transaction_id").val(),
                feedback: $("#feedback").val(),
                rating: rating,
            };

            addTransaction(body, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(
                            res?.message ?? "Service has been created"
                        );
                        setCreateDialog(false);
                        refreshData();
                        setWarnings({});
                        setRating(0);
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
        <Box className="mt-2" id="section5">
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
            <Dialog open={!!createDialog}>
                <DialogTitle>Create Transaction Form</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={onCreate}>
                        <Box>
                            <TextField
                                id="transaction_id"
                                label="Transaction ID"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                            />
                        </Box>
                        <Box>
                            <TextField
                                id="feedback"
                                label="Feedback"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                error={!!warnings?.feedback}
                                helperText={warnings?.feedback}
                            />
                        </Box>
                        <Box>
                            <Typography>Rating</Typography>
                            <Rating
                                name="simple-controlled"
                                value={rating}
                                onChange={(e, newValue) => {
                                    setRating(newValue);
                                }}
                            />
                            {warnings?.rating ? (
                                <Typography component="small" color="error">
                                    {warnings.rating}
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
                    <Button
                        color="info"
                        onClick={() => {
                            setWarnings({});
                            setCreateDialog(false);
                            setRating(0);
                        }}
                        style={{ border: "2px solid #077bff" }}
                    >
                        Close
                    </Button>
                    <Button
                        onClick={() => {
                            $("#submit_btn").trigger("click");
                        }}
                        id="submitbtn"
                        disabled={loading}
                        color="success"
                        style={{ border: "2px solid green" }}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Delete Testimonial */}
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
                        display: !!deleteDialog ? "flex" : "none",
                    }}
                >
                    <Button
                        onClick={() => setDeleteDialog(null)}
                        style={{ border: "2px solid blue" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={onDelete}
                        color="error"
                        style={{ border: "2px solid red" }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            {/* EDIT Testimonial */}
            <Dialog open={!!editDialog}>
                <DialogTitle>Edit Testimonial</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ p: 1 }} onSubmit={onEdit}>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                onChange={(e) =>
                                    setEditDialog({
                                        ...editDialog,
                                        feedback: e.target.value,
                                    })
                                }
                                value={editDialog?.feedback ?? ""}
                                size="small"
                                label="Feedback"
                                type="text"
                                fullWidth
                            />
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Typography>Rating</Typography>
                            <Rating
                                name="rating-edit"
                                value={editDialog?.rating ?? 0}
                                onChange={(e, newValue) =>
                                    setEditDialog({
                                        ...editDialog,
                                        rating: newValue,
                                    })
                                }
                            />
                        </Box>
                        <Button
                            id="testimonial-btn"
                            type="submit"
                            sx={{ display: "none" }}
                        >
                            Submit
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setEditDialog(null)}
                        style={{ border: "2px solid #077bff" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={() => {
                            $("#testimonial-btn").trigger("click");
                        }}
                        style={{
                            border: "2px solid orangered",
                            color: "orangered",
                        }}
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
