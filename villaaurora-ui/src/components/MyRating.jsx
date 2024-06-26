import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, Rating, TextField, TextareaAutosize, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addTestimonial } from '../api/testimonial';


export default function MyRating() {
    const [open, setOpen] = useState(false);
    const [transactionId, setTransactionId] = useState(null);
    const [createTestimonialDialog, setCreateTestimonialDialog] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [warnings, setWarnings] = useState({});
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const getTransactionId = params.get("transaction_id");

        if (getTransactionId) {
            setOpen(true);
            setTransactionId(getTransactionId);
        }
    }, [location.search]);

    const onCreateTestimonial = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true)
            const body = {
                transaction_id: transactionId,
                feedback,
                rating,
            };
            addTestimonial(body)
                .then((res) => {
                    if (res && res.ok) {
                        toast.success(res.message ?? "Testimonial successful");
                        setCreateTestimonialDialog(false);
                        setRating(0);
                        setFeedback("");
                        setWarnings({});
                    } else {
                        toast.error(res?.message ?? "Testimonial creation failed.");
                        setWarnings(res?.errors ?? {});
                    }
                })
                .catch((error) => {
                    console.error("Error adding testimonial:", error);
                    toast.error("An error occurred while submitting the testimonial.");
                })
                .finally(() => {
                    setLoading(false); 
                });
        }
    };
    

    return (
        <>
            {open ? (
                <Dialog open={!createTestimonialDialog}>
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
                                    value={transactionId ?? ''}
                                    disabled
                                    style={{display:"none"}}
                                />
                            </Box>
                     
                            <Box sx={{ mt: 1 }}>
                                <Typography>Rating</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={rating}
                                    style={{fontSize: "30px"}}
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                    }}
                                />
                                {warnings?.rating && (
                                    <Typography component="small" color="error">
                                        {warnings.rating}
                                    </Typography>
                                )}
                            </Box>
                            <Box>
                            <TextareaAutosize
                                    id="feedback"
                                    label="Feedback"
                                    variant="outlined"
                                    margin="normal"
                                    style={{width:"500px", height:"20vh"}}
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    required
                                    placeholder="Feedback"
                                />
                                {warnings?.feedback && (
                                    <Typography component="small" color="error">
                                        {warnings.feedback}
                                    </Typography>
                                )}
                            </Box>
                            <Box className="d-flex justify-content-center align-items-stretch bg-success mt-2">
                                <Button
                                    disabled={loading}
                                    type="submit"
                                    style={{ color:'white' }}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </DialogContent>
                </Dialog>
            ): null}
        </>
    );
}
