import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    TextField,
    TextareaAutosize,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    InputLabel,
    FormControl,
    Typography,
    CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { showAllServices } from "../api/service";
import { showAllRooms } from "../api/room";
import { addTransaction } from "../api/transaction";
import checkAuth from "../hoc/checkAuth";
import Confetti from "react-dom-confetti";
import ReCAPTCHA from "react-google-recaptcha";
import $ from "jquery";

function BookingForm() {
    const [loading, setLoading] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [serviceRows, setServiceRows] = useState([]);
    const [roomRows, setRoomRows] = useState([]);
    const user = useSelector((state) => state.auth.user);
    const [showConfetti, setShowConfetti] = useState(false);
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const sitekey = "6LfWSv8pAAAAAL2M3-5GYvTMpysv01VOjrEbmmEg";
    const [warnings, setWarnings] = useState({});

    const ServicefreshData = () => {
        showAllServices().then((res) => {
            if (res?.ok) {
                setServiceRows(res.data);
            } else {
                toast.error(res?.message ?? "Failed to fetch services.");
            }
        });
    };
    useEffect(ServicefreshData, []);

    const RoomrefreshData = () => {
        showAllRooms().then((res) => {
            if (res?.ok) {
                setRoomRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    useEffect(RoomrefreshData, []);

    const onSelectService = (service) => {
        setSelectedServices((prevServices) => {
            const serviceExists = prevServices.some((s) => s.id == service.id);

            if (!serviceExists) {
                return [...prevServices, service];
            } else {
                return prevServices.filter((s) => s.id !== service.id);
            }
        });
    };

    const onCreateTransaction = (e) => {
        e.preventDefault();
        if (!loading) {
            if (!recaptchaValue) {
                toast.error("Please complete the reCAPTCHA.");
                return;
            }

            const serviceIds = selectedServices.map((service) => service.id);

            const body = {
                user_id: user?.id,
                room_id: selectedRoom,
                rent_start: $("#rent_start").val(),
                rent_end: $("#rent_end").val(),
                service_id: serviceIds,
            };

            addTransaction(body)
                .then((res) => {
                    console.log(res);
                    if (res?.success) {
                        toast.success(res?.message ?? "Transaction successful");
                        setSelectedServices([]);
                        setSelectedRoom(null);
                        e.target.reset();
                        setShowConfetti(true);
                        setOpenDialog(false);
                        setWarnings({});
                        setRecaptchaValue(null);
                    } else {
                        toast.error(
                            res?.message ?? "Transaction creation failed."
                        );
                        setWarnings(res?.errors);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        if (showConfetti) {
            setTimeout(() => {
                setShowConfetti(false);
            }, 3000);
        }
    }, [showConfetti]);

    return (
        <section
            className="booking-section section-padding"
            id="booking-section"
        >
            <Box className="container">
                <Box className="row">
                    <Box className="col-lg-10 col-12 mx-auto">
                        <Box 
                        component="form"
                            className="custom-form booking-form"
                            onSubmit={onCreateTransaction}
                        >
                            <Box className="text-center mb-5">
                                <h2 className="mb-1">Make a Reservation</h2>
                                <p>
                                    Please fill out the form and we will get
                                    back to you.
                                </p>
                            </Box>

                            <Box className="booking-form-body">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            id="name"
                                            label="Fullname"
                                            variant="outlined" 
                                            margin="normal"
                                            fullWidth
                                            required
                                            value={user?.username ?? ""}
                                        />
                                        {warnings?.user_id ? (
                                            <Typography
                                                component="small"
                                                color="error"
                                            >
                                                {warnings.user_id}
                                            </Typography>
                                        ) : null}
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            id="mobile"
                                            label="Mobile"
                                            type="number"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            required
                                            value={user?.mobile ?? ""}
                                        />
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            id="rent_start"
                                            name="rent_start"
                                            type="date"
                                            variant="outlined"
                                            margin="normal"
                                            label="Date Start"
                                            fullWidth
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        {warnings?.rent_start ? (
                                            <Typography
                                                component="small"
                                                color="error"
                                            >
                                                {warnings.rent_start}
                                            </Typography>
                                        ) : null}
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <TextField
                                            id="rent_end"
                                            name="rent_end"
                                            type="date"
                                            variant="outlined"
                                            margin="normal"
                                            label="Date End"
                                            fullWidth
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        {warnings?.rent_end ? (
                                            <Typography
                                                component="small"
                                                color="error"
                                            >
                                                {warnings.rent_end}
                                            </Typography>
                                        ) : null}
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <Button
                                            onClick={() => setOpenDialog(true)}
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                        >
                                            Select Services
                                        </Button>
                                        {warnings?.service_id ? (
                                            <Typography
                                                component="small"
                                                color="error"
                                            >
                                                {warnings.service_id}
                                            </Typography>
                                        ) : null}
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="room_id">
                                                Room Available
                                            </InputLabel>
                                            <Select
                                                id="room_id"
                                                value={selectedRoom ?? ""}
                                                onChange={(e) =>
                                                    setSelectedRoom(
                                                        e.target.value
                                                    )
                                                }
                                                label="Room ID"
                                                variant="outlined"
                                                fullWidth
                                            >
                                                {roomRows.map((room) => (
                                                    <MenuItem
                                                        key={room.id}
                                                        value={room.id}
                                                    >
                                                        {room.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {warnings?.room_id ? (
                                                <Typography
                                                    component="small"
                                                    color="error"
                                                >
                                                    {warnings.room_id}
                                                </Typography>
                                            ) : null}
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextareaAutosize
                                            name="message"
                                            rows="3"
                                            className="form-control"
                                            id="message"
                                            placeholder="Comments (Optional)"
                                        ></TextareaAutosize>
                                    </Grid>
                                    <Dialog
                                        open={openDialog}
                                        fullWidth
                                        maxWidth="sm"
                                    >
                                        <DialogTitle>
                                            Select Services
                                        </DialogTitle>
                                        <DialogContent>
                                            {serviceRows.map((service) => (
                                                <FormControlLabel
                                                    key={service.id}
                                                    control={
                                                        <Checkbox
                                                            checked={selectedServices.some(
                                                                (s) =>
                                                                    s.id ==
                                                                    service.id
                                                            )}
                                                            onChange={() =>
                                                                onSelectService(
                                                                    service
                                                                )
                                                            }
                                                        />
                                                    }
                                                    label={`${service.name} - ₱${service.price}`}
                                                />
                                            ))}
                                        </DialogContent>
                                        <DialogActions>
                                            <Button
                                                onClick={() =>
                                                    setOpenDialog(false)
                                                }
                                                color="primary"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                color="success"
                                                onClick={() =>
                                                    setOpenDialog(false)
                                                }
                                            >
                                                Save
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <Grid container justify="center">
                                        <Grid
                                            item
                                            xs={12}
                                            className="text-center"
                                        >
                                            <Box
                                                style={{
                                                    display: "inline-block",
                                                }}
                                            >
                                                <ReCAPTCHA
                                                    sitekey={sitekey}
                                                    onChange={(value) =>
                                                        setRecaptchaValue(value)
                                                    }
                                                />
                                            </Box>
                                            <Button
                                                type="submit"
                                                className="form-control"
                                                disabled={loading}
                                            >
                                                Submit
                                            </Button>
                                            {loading && <CircularProgress />}
                                        </Grid>
                                    </Grid>
                                    <Confetti active={showConfetti} />
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </section>
    );
}

export default checkAuth(BookingForm);
