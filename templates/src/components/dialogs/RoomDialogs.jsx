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

export function RoomDialog({
    createDialog,
    setCreateDialog,
    editDialog,
    setEditDialog,
    deleteDialog,
    setDeleteDialog,
    loading,
    setLoading,
    warnings,
    setWarnings,
    cookies,
}) {
    // For Rooms
    const [roomRows, setRoomRows] = useState([]);
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
                        onClick={() => setEditDialog({ ...params.row })}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => setDeleteDialog(params.row.id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
            width: 200,
        },
    ];

    const refreshData = () => {
        showAllRooms(cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                setRoomRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    const onEdit = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            updateRoom(
                {
                    id: editDialog.id,
                    name: editDialog.name,
                    price: editDialog.price,
                },
                cookies.AUTH_TOKEN
            )
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Room has updated");
                        setEditDialog(null);
                        refreshData();
                        setWarnings({});
                    } else {
                        toast.error(res?.message ?? "Something went wrong.");
                        setWarnings(res?.errors);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    useEffect(refreshData, []);

    const onCreate = (e) => {
        e.preventDefault();
        if (!loading) {
            const body = {
                name: $("#name").val(),
                price: $("#price").val(),
            };

            addRoom(body, cookies.AUTH_TOKEN)
                .then((res) => {
                    console.log(res);
                    if (res?.ok) {
                        toast.success(res?.message ?? "Room has been created");
                        setCreateDialog(false);
                        refreshData();
                        setWarnings({});
                    } else {
                        toast.error(res?.message ?? "Something went wrong.");
                        setWarnings(res?.errors);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };
    const onDelete = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            deleteRoom(deleteDialog, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Room has deleted");
                        setDeleteDialog(null);
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
        <Box className="mt-2" id="section3">
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
                    onClick={() => setCreateDialog(true)}
                >
                    Create Room
                </Button>
            </Box>
            <DataGrid autoHeight columns={roomcolumns} rows={roomRows} />
            {/* Create Room */}
            <Dialog open={!!createDialog}>
                <DialogTitle>Create Room Form</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={onCreate}>
                        <Box>
                            <TextField
                                id="name"
                                label="Room Name"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                errors={!!warnings?.name}
                                helperText={warnings?.name}
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
                                errors={!!warnings?.price}
                                helperText={warnings?.price}
                            />
                        </Box>
                        <Box>
                            <Button
                                id="submit_btn"
                                disabled={loading}
                                type="submit"
                                sx={{ display: "none" }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="info"
                        onClick={() => {
                            setWarnings({});
                            setCreateDialog(false);
                        }}
                        style={{ border: "2px solid #077bff" }}
                    >
                        Close
                    </Button>
                    <Button
                        onClick={() => {
                            $("#submit_btn").trigger("click");
                        }}
                        id="submitbtn"
                        disabled={loading}
                        style={{ border: "2px solid green", color: "green" }}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Delete Room */}
            <Dialog open={!!deleteDialog}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Do you want to delete this Room ID: {deleteDialog}
                    </Typography>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: !!deleteDialog ? "flex" : "none",
                    }}
                >
                    <Button
                        onClick={() => setDeleteDialog(null)}
                        style={{ border: "2px solid #077bff" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={onDelete}
                        style={{ border: "2px solid red", color: "red" }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Room */}
            <Dialog open={!!editDialog}>
                <DialogTitle>Edit Room</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ p: 1 }} onSubmit={onEdit}>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                onChange={(e) =>
                                    setEditDialog({
                                        ...editDialog,
                                        name: e.target.value,
                                    })
                                }
                                value={editDialog?.name ?? ""}
                                size="small"
                                label="Room name"
                                type="text"
                                fullWidth
                            />
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                onChange={(e) =>
                                    setEditDialog({
                                        ...editDialog,
                                        price: e.target.value,
                                    })
                                }
                                value={editDialog?.price ?? ""}
                                size="small"
                                label="Price"
                                type="number"
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
                    <Button
                        onClick={() => setEditDialog(null)}
                        style={{ border: "2px solid #077bff" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={() => {
                            $("#room-btn").trigger("click");
                        }}
                        style={{
                            border: "2px solid orangered",
                            color: "orangered",
                        }}
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
