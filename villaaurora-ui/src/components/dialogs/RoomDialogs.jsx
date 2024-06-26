import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

import $ from "jquery";
import { toast } from "react-toastify";
import { addRoom, deleteRoom, showAllRooms, updateRoom } from "../../api/room";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function RoomDialog() {
    const [roomRows, setRoomRows] = useState([]);
    const [deleteRoomDialog, setRoomDeleteDialog] = useState(null);
    const [editRoomDialog, setEditRoomDialog] = useState(null);
    const [createRoomDialog, setCreateRoomDialog] = useState(false);

    const [warnings, setWarnings] = useState({});
    const [loading, setLoading] = useState(false);

    const roomcolumns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "name", headerName: "Room Name" },
        { field: "price", headerName: "Room Price" },
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
                        onClick={() => setEditRoomDialog({ ...params.row })}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => setRoomDeleteDialog(params.row.id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
            width: 350,
        },
    ];

    const refreshData = () => {
        showAllRooms().then((res) => {
            if (res?.ok) {
                setRoomRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    const onEditRoom = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            updateRoom(
                {
                    name: editRoomDialog.name,
                    price: editRoomDialog.price,
                },
                editRoomDialog.id
            )
                .then((res) => {
                    console.log(res);
                    if (res?.ok) {
                        toast.success(res?.message ?? "Room has updated");
                        setEditRoomDialog(null);
                        refreshData();
                        setWarnings({});
                    } else {
                        toast.error(res?.message ?? "Something went wrong.");
                        setWarnings(res.data);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    useEffect(refreshData, []);

    const onCreateRoom = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                name: $("#name").val(),
                price: $("#price").val(),
            };

            addRoom(body)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Room has been created");
                        setCreateRoomDialog(false);
                        refreshData();
                        setWarnings({});
                    } else {
                        toast.error(res?.message ?? "Something went wrong.");
                        setWarnings(res.data);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };
    const onDeleteRoom = (e) => {
        if (!loading) {
            setLoading(true);
            deleteRoom(deleteRoomDialog)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Room has deleted");
                        setRoomDeleteDialog(null);
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
        <Box id="section3">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    py: 2,
                }}
            >
                <Typography variant="h2">Rooms</Typography>
                <Button
                    sx={{ mr: 5 }}
                    onClick={() => setCreateRoomDialog(true)}
                >
                    <Tooltip title="Add Room">
                    <FontAwesomeIcon icon={faAdd} className="addbtn" />
                    </Tooltip>

                </Button>
            </Box>
            <DataGrid autoHeight columns={roomcolumns} rows={roomRows} />
            {/* Create Room */}
            <Dialog open={!!createRoomDialog}>
                <DialogTitle>Create Room Form</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={onCreateRoom}>
                        <Box>
                            <TextField
                                id="name"
                                label="Room Name"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                            />
                            {warnings?.name ? (
                                <Typography component="small" color="error">
                                    {warnings.name}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box>
                            <TextField
                                id="price"
                                label="Price"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                type="name"
                            />
                            {warnings?.price ? (
                                <Typography component="small" color="error">
                                    {warnings.price}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box className="d-flex justify-content-end align-items-center">
                            <Button
                                color="info"
                                onClick={() => setCreateRoomDialog(false)}
                                style={{border:"2px solid blue"}}
                            >
                                Close
                            </Button>
                            <Button
                                id="roombtn"
                                disabled={loading}
                                type="submit"
                                color="success"
                                style={{border:"2px solid green", marginLeft:"10px"}}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
            {/* Delete Room */}
            <Dialog open={!!deleteRoomDialog}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Do you want to delete this Room ID: {deleteRoomDialog}
                    </Typography>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: !!deleteRoomDialog ? "flex" : "none",
                    }}
                >
                    <Button onClick={() => setRoomDeleteDialog(null)} style={{border: "2px solid blue"}}>
                        Cancel
                    </Button>
                    <Button disabled={loading} onClick={onDeleteRoom} color="error" style={{border: "2px solid red"}}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Room */}
            <Dialog open={!!editRoomDialog}>
                <DialogTitle>Edit Room</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ p: 1 }} onSubmit={onEditRoom}>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                onChange={(e) =>
                                    setEditRoomDialog({
                                        ...editRoomDialog,
                                        name: e.target.value,
                                    })
                                }
                                value={editRoomDialog?.name ?? ""}
                                size="small"
                                label="Room name"
                                type="text"
                                fullWidth
                            />
                            {warnings?.name ? (
                                <Typography component="small" color="error">
                                    {warnings.name}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                onChange={(e) =>
                                    setEditRoomDialog({
                                        ...editRoomDialog,
                                        price: e.target.value,
                                    })
                                }
                                value={editRoomDialog?.price ?? ""}
                                size="small"
                                label="Price"
                                type="text"
                                fullWidth
                            />
                            {warnings?.price ? (
                                <Typography component="small" color="error">
                                    {warnings.price}
                                </Typography>
                            ) : null}
                        </Box>
                        <Button
                            id="room-btn"
                            type="submit"
                            sx={{ display: "none" }}
                        >
                            Submit
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button style={{border: "2px solid lightblue"}} onClick={() => setEditRoomDialog(null)}>
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={() => {
                            $("#room-btn").trigger("click");
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
