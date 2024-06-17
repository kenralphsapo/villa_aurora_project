import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    TextField,
    TextareaAutosize,
    Autocomplete,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControlLabel,
    Checkbox,
    Button,
    Select,
    MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";
import { showAllServices } from "../api/service";
import { showAllRooms } from "../api/room";
import { login } from "../api/auth";
import { addTransaction } from "../api/transaction";
import checkAuth from "../hoc/checkAuth"; // Assuming checkAuth HOC is defined in '../hoc/checkAuth'
import $ from "jquery";

function Undead() {
    const [loading, setLoading] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    const [serviceIds, setServiceIds] = useState([]);
    const [newServiceId, setNewServiceId] = useState("");
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDialogServices, setSelectedDialogServices] = useState([]);
    const [serviceRows, setServiceRows] = useState([]);
    const [roomRows, setRoomRows] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies();
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleAddServiceId = () => {
        const newId = newServiceId.trim();
        if (newId !== "") {
            setServiceIds([...serviceIds, newId]);
            setNewServiceId("");
        }
    };

    // Function to remove a service ID from the list
    const handleRemoveServiceId = (index) => {
        const updatedServiceIds = [...serviceIds];
        updatedServiceIds.splice(index, 1);
        setServiceIds(updatedServiceIds);
    };

    // Function to create a new transaction
    const onCreateTransaction = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                user_id: user?.id,
                room_id: selectedRoom, // Use selectedRoom state here
                rent_start: $("#rent_start").val(),
                rent_end: $("#rent_end").val(),
                service_id: serviceIds,
            };

            addTransaction(body)
                .then((res) => {
                    console.log(res);
                    if (res?.success) {
                        toast.success(res?.message ?? "Transaction successful");
                        setOpenDialog(false);
                        // TrefreshData();
                        // PivotrefreshData();
                        // setWarnings({});
                    } else {
                        toast.error(
                            res?.message ?? "Transaction creation failed."
                        );
                        // setWarnings(res?.errors);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

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
                                    <TextField
                                        id="service_id"
                                        label="Service ID(s)"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        value={newServiceId}
                                        onChange={(e) =>
                                            setNewServiceId(e.target.value)
                                        }
                                        helperText="Enter service ID and click Add"
                                    />

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleAddServiceId}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        Add
                                    </Button>
                                    {serviceIds.map((serviceId, index) => (
                                        <Box
                                            key={index}
                                            mt={1}
                                            display="flex"
                                            alignItems="center"
                                        >
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                value={serviceId}
                                                disabled
                                            />
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() =>
                                                    handleRemoveServiceId(index)
                                                }
                                                style={{ marginLeft: "10px" }}
                                            >
                                                Remove
                                            </Button>
                                        </Box>
                                    ))}
                                    <Grid item xs={12} lg={6}>
                                        <Select
                                            id="room_id"
                                            value={selectedRoom}
                                            onChange={(e) =>
                                                setSelectedRoom(e.target.value)
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
                                    <Grid item xs={12} className="text-center">
                                        <Button
                                            type="submit"
                                            className="form-control mt-5"
                                            disabled={loading}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
        </section>
    );
}

export default checkAuth(Undead);
