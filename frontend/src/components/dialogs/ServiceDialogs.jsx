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
import {
    addService,
    deleteService,
    showAllServices,
    updateService,
} from "../../api/service";

import $ from "jquery";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";

export function ServiceDialog() {
    const [serviceRows, setServiceRows] = useState([]);

    const [createServDialog, setCreateServDialog] = useState(false);
    const [deleteServiceDialog, setServiceDeleteDialog] = useState(null);
    const [editServiceDialog, setEditServiceDialog] = useState(null);
    const [cookies] = useCookies(["AUTH_TOKEN"]);
    const [warnings, setWarnings] = useState({});
    const [loading, setLoading] = useState(false);

    const servicecolumns = [
        { field: "id", headerName: "ID", width: 10 },
        { field: "name", headerName: "Service Name", width: 160 },
        { field: "price", headerName: "Price", width: 160 },
        { field: "created_at", headerName: "Create At", width: 200 },
        { field: "updated_at", headerName: "Update At", width: 200 },
        {
            field: "image",
            headerName: "Image",
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <img
                    src={params.row.image}
                    alt="Service Image"
                    style={{ width: "100px", height: "100px" }}
                />
            ),
            width: 150,
        },
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
                        onClick={() => setEditServiceDialog({ ...params.row })}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => setServiceDeleteDialog(params.row.id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
            width: 200,
        },
    ];

    const refreshData = () => {
        showAllServices(cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                setServiceRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    useEffect(refreshData, []);

    const onCreateService = (e) => {
        e.preventDefault();
        if (!loading) {
            const imageInput = $("#image")[0];
            const imageFile = imageInput.files[0];
            // https://stackoverflow.com/questions/68161053/how-can-i-upload-image-to-database-with-react-image-upload-dependency
            const body = new FormData();
            body.append("name", $("#name").val());
            body.append("price", $("#price").val());
            body.append("image", imageFile);

            addService(body, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(
                            res?.message ?? "Service has been created"
                        );
                        setCreateServDialog(false);
                        refreshData();
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

    const onDeleteService = (e) => {
        if (!loading) {
            setLoading(true);
            deleteService(deleteServiceDialog, cookies.AUTH_TOKEN)
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Service has deleted");
                        setServiceDeleteDialog(null);
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

    const onEditService = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            updateService(
                {
                    name: editServiceDialog.name,
                    price: editServiceDialog.price,
                },
                editServiceDialog.id,
                cookies.AUTH_TOKEN
            )
                .then((res) => {
                    if (res?.ok) {
                        toast.success(res?.message ?? "Service has updated");
                        setEditServiceDialog(null);
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
        <Box id="section2">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    py: 2,
                }}
            >
                <Typography variant="h2">Services</Typography>
                <Button
                    sx={{ mr: 5 }}
                    onClick={() => setCreateServDialog(true)}
                >
                    <Tooltip title="Add Service">
                        <FontAwesomeIcon icon={faAdd} className="addbtn" />
                    </Tooltip>
                </Button>
            </Box>
            <DataGrid autoHeight columns={servicecolumns} rows={serviceRows} />
            {/* Create Service */}
            <Dialog
                open={!!createServDialog}
                style={{ maxWidth: "400px", display: "block", margin: "auto" }}
            >
                <DialogTitle>Create Service Form</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={onCreateService}>
                        <Box>
                            <TextField
                                id="name"
                                label="Service Name"
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
                            />
                            {warnings?.price ? (
                                <Typography component="small" color="error">
                                    {warnings.price}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                required
                            />
                            {warnings?.image ? (
                                <Typography component="small" color="error">
                                    {warnings.image}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box className="d-flex justify-content-end align-items-center">
                            <Button
                                color="info"
                                onClick={() => setCreateServDialog(false)}
                                style={{ border: "2px solid blue" }}
                            >
                                Close
                            </Button>
                            <Button
                                id="submitbtn"
                                disabled={loading}
                                type="submit"
                                color="success"
                                style={{
                                    border: "2px solid green",
                                    marginLeft: "10px",
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Delete Service */}
            <Dialog open={!!deleteServiceDialog}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Do you want to delete this Service ID:{" "}
                        {deleteServiceDialog}
                    </Typography>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: !!deleteServiceDialog ? "flex" : "none",
                    }}
                >
                    <Button
                        onClick={() => setServiceDeleteDialog(null)}
                        style={{ border: "2px solid blue" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={onDeleteService}
                        color="error"
                        style={{ border: "2px solid red" }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Service */}
            <Dialog
                open={!!editServiceDialog}
                style={{ maxWidth: "400px", display: "block", margin: "auto" }}
            >
                <DialogTitle>Edit Service</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{ p: 1 }}
                        onSubmit={onEditService}
                    >
                        <Box sx={{ mt: 1 }}>
                            <TextField
                                onChange={(e) =>
                                    setEditServiceDialog({
                                        ...editServiceDialog,
                                        name: e.target.value,
                                    })
                                }
                                value={editServiceDialog?.name ?? ""}
                                size="small"
                                label="Service name"
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
                                    setEditServiceDialog({
                                        ...editServiceDialog,
                                        price: e.target.value,
                                    })
                                }
                                value={editServiceDialog?.price ?? ""}
                                size="small"
                                label="Price"
                                type="number"
                                fullWidth
                            />
                            {warnings?.price ? (
                                <Typography component="small" color="error">
                                    {warnings.password}
                                </Typography>
                            ) : null}
                        </Box>
                        <Button
                            id="service-btn"
                            type="submit"
                            sx={{ display: "none" }}
                        >
                            Submit
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ border: "2px solid lightblue" }}
                        onClick={() => setEditServiceDialog(null)}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={() => {
                            $("#service-btn").trigger("click");
                        }}
                        color="success"
                        style={{ border: "2px solid lightgreen" }}
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}