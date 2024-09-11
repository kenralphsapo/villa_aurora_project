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
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { showAllServices } from "../api/service";
import { showAllRooms } from "../api/room";
import { addTransaction, showAllTransactions } from "../api/transaction";
import checkAuth from "../hoc/checkAuth";
import ReCAPTCHA from "react-google-recaptcha";
import $ from "jquery";
import MyCalendar from "./MyCalendar";
import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
function BookingForm() {
    const [loading, setLoading] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [serviceRows, setServiceRows] = useState([]);
    const [roomRows, setRoomRows] = useState([]);
    const user = useSelector((state) => state.auth.user);
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const sitekey = "6LfWSv8pAAAAAL2M3-5GYvTMpysv01VOjrEbmmEg";
    const [warnings, setWarnings] = useState({});
    const [cookies] = useCookies(["AUTH_TOKEN"]);
    const [dataSaved, setDataSaved] = useState(false);

    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
            setLoading(true);
            addTransaction(body, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Transaction successful");
                        setSelectedServices([]);
                        setSelectedRoom(null);
                        e.target.reset();
                        setOpenDialog(false);
                        setWarnings({});
                        setRecaptchaValue(null);
                        refreshData();
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

    const onSelectService = (service) => {
        setSelectedServices((prevServices) => {
            const services = prevServices.some((s) => s.id === service.id);

            if (!services) {
                return [...prevServices, service];
            } else {
                return prevServices.filter((s) => s.id !== service.id);
            }
        });
    };

    useEffect(() => {
        if (cookies.AUTH_TOKEN) {
            showAllServices(cookies.AUTH_TOKEN).then((res) => {
                if (res?.ok) {
                    setServiceRows(res.data);
                    setDataSaved(true);
                } else {
                    toast.error(res?.message ?? "Failed to fetch services.");
                }
            });

            showAllRooms(cookies.AUTH_TOKEN).then((res) => {
                if (res?.ok) {
                    setRoomRows(res.data);
                } else {
                    toast.error(res?.message ?? "Something went wrong.");
                }
            });
        }
    }, [cookies.AUTH_TOKEN]);

    const refreshData = () => {
        showAllTransactions(cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                const mapevents = res.data.map((transaction) => {
                    return {
                        id: transaction.id,
                        title: `Reserve`,
                        start: new Date(transaction.rent_start),
                        end: new Date(transaction.rent_end),
                        user_id: transaction.user_id,
                        tooltip: `Room ID: ${transaction.room_id}\nRent Start: ${transaction.rent_start}\nRent End: ${transaction.rent_end}`,
                    };
                });
                setEvents(mapevents);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    useEffect(() => {
        if (cookies.AUTH_TOKEN) {
            refreshData();
        }
    }, [cookies.AUTH_TOKEN]);

    return (
        <>
            <MyCalendar
                events={events}
                setEvents={setEvents}
                localizer={localizer}
                isMobile={isMobile}
                cookies={cookies}
            />
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
                                                value={
                                                    dataSaved
                                                        ? user?.username
                                                        : ""
                                                }
                                            />
                                            {warnings?.user_id && (
                                                <Typography
                                                    component="small"
                                                    color="error"
                                                >
                                                    {warnings.user_id}
                                                </Typography>
                                            )}
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
                                                value={
                                                    dataSaved
                                                        ? user?.mobile
                                                        : ""
                                                }
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
                                                error={!!warnings.rent_start}
                                            />
                                            {warnings?.rent_start && (
                                                <Typography
                                                    component="small"
                                                    color="error"
                                                >
                                                    {warnings.rent_start}
                                                </Typography>
                                            )}
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
                                                error={!!warnings.rent_end}
                                            />
                                            {warnings?.rent_end && (
                                                <Typography
                                                    component="small"
                                                    color="error"
                                                >
                                                    {warnings.rent_end}
                                                </Typography>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <Button
                                                onClick={() =>
                                                    setOpenDialog(true)
                                                }
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                            >
                                                Select Services
                                            </Button>
                                            {warnings?.service_id && (
                                                <Typography
                                                    component="small"
                                                    color="error"
                                                >
                                                    {warnings.service_id}
                                                </Typography>
                                            )}
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
                                                    error={!!warnings.room_id}
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
                                                {warnings?.room_id && (
                                                    <Typography
                                                        component="small"
                                                        color="error"
                                                    >
                                                        {warnings.room_id}
                                                    </Typography>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextareaAutosize
                                                name="message"
                                                rows="3"
                                                className="form-control"
                                                id="message"
                                                placeholder="Comments (Optional)"
                                            />
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
                                                                        s.id ===
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
                                                    sx={{
                                                        border: "1px solid #007bff",
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    color="success"
                                                    onClick={() =>
                                                        setOpenDialog(false)
                                                    }
                                                    sx={{
                                                        border: "1px solid green",
                                                    }}
                                                >
                                                    Save
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                        <Grid
                                            container
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                className="text-center"
                                            >
                                                <Box
                                                    sx={{
                                                        display: "inline-block",
                                                        width: "100%",
                                                        maxWidth: "300px",
                                                    }}
                                                >
                                                    {!loading && (
                                                        <Box id="captcha-container">
                                                            <ReCAPTCHA
                                                                sitekey={
                                                                    sitekey
                                                                }
                                                                onChange={(
                                                                    value
                                                                ) =>
                                                                    setRecaptchaValue(
                                                                        value
                                                                    )
                                                                }
                                                                id="captcha"
                                                            />
                                                        </Box>
                                                    )}
                                                </Box>
                                                <Button
                                                    type="submit"
                                                    className="form-control"
                                                    disabled={loading}
                                                    sx={{ mt: 2 }}
                                                >
                                                    Submit
                                                </Button>
                                                {loading && (
                                                    <CircularProgress
                                                        sx={{ mt: 2 }}
                                                    />
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </section>
        </>
    );
}

export default checkAuth(BookingForm);
