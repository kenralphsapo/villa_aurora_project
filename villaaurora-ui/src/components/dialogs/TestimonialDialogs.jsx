import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Rating,
    Tooltip
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { addTestimonial, deleteTestimonial, showAllTestimonials, updateTestimonial } from "../../api/testimonial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

export function TestimonialDialogs() {
    // For Testimonials
    const user = useSelector((state) => state.auth.user)
    const [testiomonialRows, setTestimonialRows] = useState([]);
    const [deleteTestimonialDialog, setDeleteTestimonialDialog] = useState(null);
    const [editTestimonialDialog, setEditTestimonialDialog] = useState(null);
    const [createTestimonialDialog, setCreateTestimonialDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [warnings, setWarnings] = useState({});
    const [rating, setRating] = useState(0);
    const [cookies] = useCookies(["AUTH_TOKEN"]);
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

            addTestimonial(body, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Testimonial successful");
                        setCreateTestimonialDialog(false);
                        refreshData();
                        setWarnings({});
                        setRating(0);
                    } else {
                        toast.error(res?.message ?? "Testimonial creation failed.");
                        setWarnings(res?.errors);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const refreshData = () => {
        showAllTestimonials(cookies.AUTH_TOKEN).then((res) => {
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
                editTestimonialDialog.id,
                cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Testimonial has updated");
                        setEditTestimonialDialog(null);
                        refreshData();
                        setWarnings({});
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

    const onDeleteTestimonial = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            deleteTestimonial(deleteTestimonialDialog, cookies.AUTH_TOKEN)
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
                {user?.role == "admin" && (
                        <Tooltip title="Add Testimonial">
                        <FontAwesomeIcon icon={faAdd} className="addbtn" />
                        </Tooltip>
                )}
                </Button>
            </Box>

            <DataGrid
                autoHeight
                columns={testimonialcolumns}
                rows={testiomonialRows}
            />
            {/* Create testimonial */}
            <Dialog open={createTestimonialDialog}>
                <DialogTitle>Create Testimonial Form</DialogTitle>
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
                              {warnings?.transaction_id ? (
                            <Typography component="small" color="error">
                                {warnings.transaction_id}
                            </Typography>
                        ) : null}
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
                              {warnings?.feedback ? (
                            <Typography component="small" color="error">
                                {warnings.feedback}
                            </Typography>
                        ) : null}
                        </Box>
                        <Box>
                            <Box sx={{ mt: 1 }}>
                                <Typography>Rating</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={rating}
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                    }}
                                />
                                  {warnings?.rating ? (
                            <Typography component="small" color="error">
                                {warnings.rating}
                            </Typography>
                        ) : null}
                            </Box>
                        </Box>

                        <Box className="d-flex justify-content-end align-items-center mt-2">
                            <Button
                                color="info"
                                onClick={() =>
                                    setCreateTestimonialDialog(false)
                                }
                                style={{border:"2px solid blue"}}
                            >
                                Close
                            </Button>
                            <Button
                                disabled={loading}
                                type="submit"
                                color="success"
                                style={{ marginLeft: "10px", border:"2px solid green"}}
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
                    <Button onClick={() => setDeleteTestimonialDialog(null)} style={{border: "2px solid blue"}}>
                        Cancel
                    </Button>
                    <Button disabled={loading} onClick={onDeleteTestimonial} color="error" style={{border: "2px solid red"}}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            {/* EDIT Testimonial */}
            <Dialog open={!!editTestimonialDialog} >
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
                                value={
                                    editTestimonialDialog?.feedback ?? ""
                                }
                                size="small"
                                label="Feedback"
                                type="text"
                                fullWidth
                            />
                                {warnings?.feedback ? (
                            <Typography component="small" color="error">
                                {warnings.feedback}
                            </Typography>
                        ) : null}
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
                                {warnings?.rating ? (
                            <Typography component="small" color="error">
                                {warnings.rating}
                            </Typography>
                        ) : null}
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
                    <Button style={{border: "2px solid lightblue"}} onClick={() => setEditTestimonialDialog(null)}>
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={() => {
                            $("#testimonial-btn").trigger("click");
                        }}
                                     color="success"
                        style={{border: "2px solid lightgreen"}}
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
