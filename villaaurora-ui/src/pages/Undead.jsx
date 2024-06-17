import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faStar } from "@fortawesome/free-solid-svg-icons";
import { addTestimonial, showAllTestimonials } from "../api/testimonial";
import { toast } from "react-toastify";

export default function Undead() {
    const [createTestimonialDialog, setCreateTestimonialDialog] =
        useState(false);
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(0);

    const handleStarClick = (starValue) => {
        setRating(starValue);
    };

    const onCreateTestimonial = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                transaction_id: document.getElementById("transaction_id").value,
                feedback: document.getElementById("feedback").value,
                rating: rating,
            };

            addTestimonial(body)
                .then((res) => {
                    console.log(res);
                    if (res?.ok) {
                        toast.success(res?.message ?? "Testimonial successful");
                        setCreateTestimonialDialog(false);
                        TestrefreshData();
                    } else {
                        toast.error(
                            res?.message ?? "Testimonial creation failed."
                        );
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };
    const [testiomonialRows, setTestimonialRows] = useState([]);
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

    return (
        <>
            <Button
                sx={{ mr: 5 }}
                onClick={() => setCreateTestimonialDialog(true)}
            >
                <FontAwesomeIcon icon={faAdd} className="addbtn" />
            </Button>
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
                            <Typography variant="subtitle1" gutterBottom>
                                Rating
                            </Typography>
                            <div style={{ fontSize: "24px", color: "#ffc107" }}>
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
                                        onClick={() => handleStarClick(value)}
                                    />
                                ))}
                            </div>
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
