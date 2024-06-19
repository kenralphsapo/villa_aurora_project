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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { showAllServices } from "../api/service";
import { showAllRooms } from "../api/room";
import { addTransaction } from "../api/transaction";
import checkAuth from "../hoc/checkAuth"; // Assuming checkAuth HOC is defined in '../hoc/checkAuth'
import Confetti from "react-dom-confetti";

function BookingForm() {
    const [loading, setLoading] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [serviceRows, setServiceRows] = useState([]);
    const [roomRows, setRoomRows] = useState([]);
    const user = useSelector((state) => state.auth.user);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        // Fetch services data
        showAllServices().then((res) => {
            if (res?.ok) {
                setServiceRows(res.data);
            } else {
                toast.error(res?.message ?? "Failed to fetch services.");
            }
        });

        // Fetch rooms data
        showAllRooms().then((res) => {
            if (res?.ok) {
                setRoomRows(res.data);
            } else {
                toast.error(res?.message ?? "Failed to fetch rooms.");
            }
        });
    }, []);

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

    const handleToggleService = (service) => () => {
        const currentIndex = selectedServices.findIndex(
            (selectedService) => selectedService.id == service.id
        );
        const newSelectedServices = [...selectedServices];

        if (currentIndex == -1) {
            newSelectedServices.push(service);
        } else {
            newSelectedServices.splice(currentIndex, 1);
        }

        setSelectedServices(newSelectedServices);
    };

    // Function to create a new transaction
    const onCreateTransaction = (e) => {
        e.preventDefault();
        if (!loading) {
            const serviceIds = selectedServices.map((service) => service.id);

            const body = {
                user_id: user?.id,
                room_id: selectedRoom, // Use selectedRoom state here
                rent_start: e.target.rent_start.value,
                rent_end: e.target.rent_end.value,
                service_id: serviceIds,
                comments: e.target.message.value,
            };

            addTransaction(body)
                .then((res) => {
                    console.log(res);
                    if (res?.success) {
                        toast.success(res?.message ?? "Transaction successful");
                        setSelectedServices([]);
                        setSelectedRoom(null);
                        e.target.reset();
                        setShowConfetti(true); // Toggle confetti on success
                        setOpenDialog(false);
                    } else {
                        toast.error(
                            res?.message ?? "Transaction creation failed."
                        );
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
            }, 3000); // Reset after 3 seconds
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
                        <form
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
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="room_id">
                                                Room Available
                                            </InputLabel>
                                            <Select
                                                id="room_id"
                                                value={selectedRoom}
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
                                                            onChange={handleToggleService(
                                                                service
                                                            )}
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
                                    <Grid item xs={12} className="text-center">
                                        <Button
                                            type="submit"
                                            className="form-control"
                                            disabled={loading}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                    <Confetti active={showConfetti} />
                                </Grid>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
        </section>
    );
}

export default checkAuth(BookingForm);
