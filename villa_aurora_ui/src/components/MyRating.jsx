import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Rating,
    TextField,
    TextareaAutosize,
    Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addTestimonial } from "../api/testimonial";
import $ from "jquery";
import { useCookies } from "react-cookie";

export default function MyRating() {
    const [open, setOpen] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const [createTestimonialDialog, setCreateTestimonialDialog] =
        useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [warnings, setWarnings] = useState({});
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [cookies] = useCookies(["AUTH_TOKEN"]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const getTransactionId = params.get("transaction_id");

        if (getTransactionId) {
            setOpen(true);
            setTransactionId(getTransactionId);
            setCreateTestimonialDialog(true);
        }
    }, [location.search]);

    const onCreateTestimonial = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                transaction_id: transactionId,
                feedback: $("#feedback").val(),
                rating: rating,
            };
            setLoading(true);
            addTestimonial(body, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Testimonial successful");
                        setCreateTestimonialDialog(false);
                        setWarnings({});
                        setRating(0);
                        setOpen(false);
                        navigate("/");
                        setLoading(false);
                    } else {
                        toast.error(
                            res?.message ?? "Testimonial creation failed."
                        );
                        setWarnings(res?.errors);
                        setLoading(false);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <>
            {open ? (
                <Dialog open={createTestimonialDialog}>
                    <DialogTitle>Feedback Form</DialogTitle>
                    <DialogContent>
                        <Box component="form" onSubmit={onCreateTestimonial}>
                            <Box>
                                <TextField
                                    id="transaction_id"
                                    label="Transaction ID"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    value={transactionId ?? ""}
                                    disabled
                                    style={{ display: "none" }}
                                />
                                {warnings?.transaction_id ? (
                                    <Typography component="small" color="error">
                                        {warnings.transaction_id}
                                    </Typography>
                                ) : null}
                            </Box>

                            <Box sx={{ mt: 1 }}>
                                <Typography>Rating</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={rating}
                                    style={{ fontSize: "30px" }}
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
                            <Box>
                                <TextareaAutosize
                                    id="feedback"
                                    label="Feedback"
                                    variant="outlined"
                                    margin="normal"
                                    style={{ height: "20vh", width: "400px" }}
                                    value={feedback}
                                    onChange={(e) =>
                                        setFeedback(e.target.value)
                                    }
                                    required
                                    placeholder="Feedback"
                                />
                                {warnings?.feedback ? (
                                    <Typography component="small" color="error">
                                        {warnings.feedback}
                                    </Typography>
                                ) : null}
                            </Box>

                            <Button
                                disabled={loading}
                                type="submit"
                                style={{
                                    color: "white",
                                    backgroundColor: "green",
                                    width: "100%",
                                }}
                            >
                                {loading ? "Loading..." : "Submit"}
                            </Button>
                        </Box>
                    </DialogContent>
                </Dialog>
            ) : null}
        </>
    );
}
