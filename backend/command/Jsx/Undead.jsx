import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import $ from "jquery";
import { DataGrid } from "@mui/x-data-grid";
import { React, useEffect, useState } from "react";
import {
    addTestimonial,
    showAllTestimonials,
} from "../../villaaurora-ui/src/api/testimonial";
import { toast } from "react-toastify";

export default function Undead() {
    const [testiomonialRows, setTestimonialRows] = useState([]);
    const [createTestimonialDialog, setCreateTestimonialDialog] =
        useState(false);
    const [loading, setLoading] = useState(false);
    const TestrefreshData = () => {
        showAllTestimonials().then((res) => {
            console.log(res);
            if (res?.ok) {
                setTestimonialRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };
    const [warnings, setWarnings] = useState({});
    useEffect(TestrefreshData, []);
    // For Testimonials
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
                transaction_id: document.getElementById("transaction_id").value,
                feedback: document.getElementById("feedback").value,
                rating: document.getElementById("rating").value,
            };

            addTestimonial(body)
                .then((res) => {
                    console.log(res);
                    if (res.success) {
                        toast.success(res.message ?? "Testimonial successful");
                        setCreateTestimonialDialog(false);
                        TestrefreshData();
                        setWarnings({});
                    } else {
                        toast.error(
                            res.message ?? "Testimonial creation failed."
                        );
                        setWarnings(res.errors);
                    }
                })
                .catch((error) => {
                    console.error("Error creating testimonial:", error);
                    toast.error(
                        "Failed to create testimonial. Please try again."
                    );
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <>
            <Button
                sx={{ mr: 5 }}
                onClick={() => setCreateTestimonialDialog(true)}
            >
                <FontAwesomeIcon icon={faAdd} className="addbtn" />
                Fuck You puickachu
            </Button>
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
                            <TextField
                                id="rating"
                                label="Rating"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                            />
                            {warnings?.rating ? (
                                <Typography component="small" color="error">
                                    {warnings.rating}
                                </Typography>
                            ) : null}
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
        </>
    );
}
