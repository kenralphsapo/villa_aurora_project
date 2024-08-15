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
import { addRoom, deleteRoom, showAllRooms, updateRoom } from "../../api/room";

export function RoomDialog() {
    // For Rooms
    const [roomRows, setRoomRows] = useState([]);
    const [deleteRoomDialog, setRoomDeleteDialog] = useState(null);
    const [editRoomDialog, setEditRoomDialog] = useState(null);
    const [createRoomDialog, setCreateRoomDialog] = useState(null);

    const [loading, setLoading] = useState(false);
    // For Rooms
    const roomcolumns = [
        { field: "id", headerName: "ID" },
        { field: "name", headerName: "Room Name", width: 160 },
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
            width: 200,
        },
    ];

    const RrefreshData = () => {
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
                },
                editRoomDialog.id
            )
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Room has updated");
                        setEditRoomDialog(null);
                        RrefreshData();
                    } else {
                        toast.error(res?.message ?? "Something went wrong.");
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    useEffect(RrefreshData, []);

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
                        RrefreshData();
                    } else {
                        toast.error(res?.message ?? "Something went wrong.");
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
                        RrefreshData();
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
                    justifyContent: "space-between",
                    py: 2,
                }}
            >
                <Typography variant="h2">Rooms</Typography>
                <Button
                    variant="contained"
                    color="info"
                    sx={{ mr: 5 }}
                    onClick={() => setCreateRoomDialog(true)}
                >
                    Create Room
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
                        </Box>
                        <Box>
                            <TextField
                                id="price"
                                label="Price"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                            />
                        </Box>
                        <Box className="d-flex justify-content-center align-items-center">
                            <Button
                                color="info"
                                onClick={() => setCreateRoomDialog(false)}
                            >
                                Close
                            </Button>
                            <Button
                                id="roombtn"
                                disabled={loading}
                                type="submit"
                                color="success"
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
                    <Button onClick={() => setRoomDeleteDialog(null)}>
                        Cancel
                    </Button>
                    <Button disabled={loading} onClick={onDeleteRoom}>
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
                    <Button onClick={() => setEditRoomDialog(null)}>
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={() => {
                            $("#room-btn").trigger("click");
                        }}
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
