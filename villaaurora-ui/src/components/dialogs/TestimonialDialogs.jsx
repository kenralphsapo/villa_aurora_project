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
    addTestimonial,
    deleteTestimonial,
    showAllTestimonials,
    updateTestimonial,
} from "../../api/testimonial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faStar } from "@fortawesome/free-solid-svg-icons";

export function TestimonialDialogs() {
    //For Testimonials

    const [testiomonialRows, setTestimonialRows] = useState([]);
    const [deleteTestimonialDialog, setDeleteTestimonialDialog] =
        useState(null);
    const [editTestimonialDialog, setEditTestimonialDialog] = useState(null);
    const [createTestimonialDialog, setCreateTestimonialDialog] =
        useState(false);
    const [loading, setLoading] = useState(false);

    const [warnings, setWarnings] = useState({});

    const [rating, setRating] = useState(0);

    const onStarValue = (starValue) => {
        setRating(starValue);
    };

    const testimonialcolumns = [
        { field: "id", headerName: "Transaction ID", width: 150 },
        { field: "feedback", headerName: "Feedback", width: 250 },
        { field: "rating", headerName: "Rating" },
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
                            setEditTestimonialDialog({ ...params.row })
                        }
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                            setDeleteTestimonialDialog(params.row.id)
                        }
                    >
                        Delete
                    </Button>
                </Box>
            ),
            width: 200,
        },
    ];
    const onCreateTestimonial = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                transaction_id: $("#transaction_id").val(),
                feedback: $("#feedback").val(),
                rating: rating,
            };

            addTestimonial(body)
                .then((res) => {
                    console.log(res);
                    if (res?.ok) {
                        toast.success(res?.message ?? "Testimonial successful");
                        setCreateTestimonialDialog(false);
                        refreshData();
                        setWarnings({});
                        setRating(0);
                    } else {
                        toast.error(
                            res?.message ?? "Testimonial creation failed."
                        );
                        setWarnings(res?.errors);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const refreshData = () => {
        showAllTestimonials().then((res) => {
            if (res?.ok) {
                setTestimonialRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };
    useEffect(refreshData, []);

    const onEditTestimonial = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            updateTestimonial(
                {
                    feedback: editTestimonialDialog.feedback,
                    rating: editTestimonialDialog.rating,
                },
                editTestimonialDialog.id
            )
                .then((res) => {
                    if (res?.ok) {
                        toast.success(
                            res?.message ?? "Testimonial has updated"
                        );
                        setEditTestimonialDialog(null);
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

    const onDeleteTestimonial = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            deleteTestimonial(deleteTestimonialDialog)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Room has deleted");
                        setDeleteTestimonialDialog(null);
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

    return (
        <Box className="mt-2" id="section5">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    py: 2,
                }}
            >
                <Typography variant="h2">Testimonials</Typography>
                <Button
                    sx={{ mr: 5 }}
                    onClick={() => setCreateTestimonialDialog(true)}
                >
                    <FontAwesomeIcon icon={faAdd} className="addbtn" />
                </Button>
            </Box>

            <DataGrid
                autoHeight
                columns={testimonialcolumns}
                rows={testiomonialRows}
            />
            <Dialog open={createTestimonialDialog}>
                <DialogTitle>Create Transaction Form</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={onCreateTestimonial}>
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
                            />
                        </Box>
                        <Box>
                            <Box sx={{ mt: 1 }}>
                                <Typography>Rating</Typography>
                                <Box
                                    style={{
                                        textAlign: "center",
                                        fontSize: "24px",
                                        color: "#ffc107",
                                    }}
                                >
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <FontAwesomeIcon
                                            key={value}
                                            icon={faStar}
                                            style={{
                                                cursor: "pointer",
                                                color:
                                                    value <= rating
                                                        ? "#ffc107"
                                                        : "#e4e5e9",
                                                marginRight: "5px",
                                            }}
                                            onClick={() =>
                                                onStarValue(value)
                                            }
                                        />
                                    ))}
                                </Box>
                            </Box>
                        </Box>

                        <Box className="d-flex justify-content-center align-items-center mt-2">
                            <Button
                                color="info"
                                onClick={() =>
                                    setCreateTestimonialDialog(false)
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

            {/* Delete Testimonial */}
            <Dialog open={!!deleteTestimonialDialog}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Do you want to delete this Testimonial ID:{" "}
                        {deleteTestimonialDialog}
                    </Typography>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: !!deleteTestimonialDialog ? "flex" : "none",
                    }}
                >
                    <Button onClick={() => setDeleteTestimonialDialog(null)}>
                        Cancel
                    </Button>
                    <Button disabled={loading} onClick={onDeleteTestimonial}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            {/* EDIT Testimonial */}
            <Dialog open={!!editTestimonialDialog}>
                <DialogTitle>Edit Testimonial</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{ p: 1 }}
                        onSubmit={onEditTestimonial}
                    >
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                onChange={(e) =>
                                    setEditTestimonialDialog({
                                        ...editTestimonialDialog,
                                        feedback: e.target.value,
                                    })
                                }
                                value={editTestimonialDialog?.feedback ?? ""}
                                size="small"
                                label="Feedback"
                                type="text"
                                fullWidth
                            />
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                onChange={(e) =>
                                    setEditTestimonialDialog({
                                        ...editTestimonialDialog,
                                        rating: e.target.value,
                                    })
                                }
                                value={editTestimonialDialog?.rating ?? ""}
                                size="small"
                                label="Rating"
                                type="number"
                                fullWidth
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
                    <Button onClick={() => setEditTestimonialDialog(null)}>
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={() => {
                            $("#testimonial-btn").trigger("click");
                        }}
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
