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
    deleteTestimonial,
    showAllTestimonials,
    updateTestimonial,
} from "../../api/testimonial";

export function TestimonialDialogs() {
    //For Testimonials

    const [testiomonialRows, setTestimonialRows] = useState([]);
    const [deleteTestimonialDialog, setDeleteTestimonialDialog] =
        useState(null);
    const [editTestimonialDialog, setEditTestimonialDialog] = useState(null);

    const [loading, setLoading] = useState(false);
    // For Testimonials
    const testimonialcolumns = [
        { field: "id", headerName: "Transaction ID", width: 200 },
        { field: "feedback", headerName: "Feedback", width: 350 },
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

    const TestrefreshData = () => {
        showAllTestimonials().then((res) => {
            if (res?.ok) {
                setTestimonialRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };
    useEffect(TestrefreshData, []);

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
                        TestrefreshData();
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
        if (!loading) {
            setLoading(true);
            deleteTestimonial(deleteTestimonialDialog)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Room has deleted");
                        setDeleteTestimonialDialog(null);
                        TestrefreshData();
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
            <Typography variant="h2">Testimonials</Typography>
            <DataGrid
                autoHeight
                columns={testimonialcolumns}
                rows={testiomonialRows}
            />

            
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
