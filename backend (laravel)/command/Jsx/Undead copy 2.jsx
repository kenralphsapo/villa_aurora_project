import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { showAllServices } from "../api/service";
import { useSelector } from "react-redux";
import { showAllTransactions, updateTransaction } from "../api/transaction";

export default function Undead() {
    const user = useSelector((state) => state.auth.user);
    const [transactionRows, setTransactionRows] = useState([]);
    const [createTransactionDialog, setCreateTransactionDialog] =
        useState(false);
    const [deleteTransactionDialog, setDeleteTransactionDialog] =
        useState(null);
    const [editTransactionDialog, setEditTransactionDialog] = useState(null);

    const [warnings, setWarnings] = useState({});
    const [loading, setLoading] = useState(false);

    const [serviceRows, setServiceRows] = useState([]);
    const [pivotRows, setPivotRows] = useState([]);

    const [serviceIds, setServiceIds] = useState([]);
    const [addId, setAddId] = useState("");
    const [position, setPosition] = useState(false);

    // For  users
    const [rows, setRows] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");

    // for rooms
    const [roomRows, setRoomRows] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState("");

    const [cookies] = useCookies(["AUTH_TOKEN"]);
    const [serviceid, setServiceId] = useState([]);
    const addServiceId = (e) => {
        const value = e.target.value;
        const service = serviceRows.find((service) => service.id == value);
        if (service && !serviceid.find((s) => s.id === service.id)) {
            setServiceId([...serviceid, service]);
        }
    };
    const transactioncolumns = [
        { field: "id", headerName: "ID" },
        { field: "user_id", headerName: "User ID" },
        { field: "room_id", headerName: "Room ID" },
        { field: "rent_start", headerName: "Rent Start", width: 100 },
        { field: "rent_end", headerName: "Rent End", width: 100 },
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
                        onClick={() =>
                            setEditTransactionDialog({ ...params.row })
                        }
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                            setDeleteTransactionDialog(params.row.id)
                        }
                    >
                        Delete
                    </Button>
                </Box>
            ),
            width: 200,
        },
    ];

    const refreshData = () => {
        showAllTransactions().then((res) => {
            if (res?.ok) {
                setTransactionRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    useEffect(() => {
        refreshData();
    }, []);

    const removeServiceId = (serviceIdToRemove) => {
        const updatedserviceid = serviceid.filter(
            (service) => service.id !== serviceIdToRemove
        );
        setServiceId(updatedserviceid);
    };

    const onEditTransaction = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            updateTransaction(
                {
                    user_id: editTransactionDialog.user_id,
                    room_id: editTransactionDialog.room_id,
                    rent_start: editTransactionDialog.rent_start,
                    rent_end: editTransactionDialog.rent_end,
                    service_id: serviceid.map((service) => service.id),
                },
                editTransactionDialog.id
            )
                .then((res) => {
                    if (res?.success) {
                        toast.success(
                            res?.message ?? "Transaction updated successfully."
                        );
                        setEditTransactionDialog(null);
                        refreshData();
                        setWarnings({});
                    } else {
                        toast.error(
                            res?.message ?? "Failed to update transaction."
                        );
                        setWarnings(res?.errors);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const ServiceRefreshData = () => {
        showAllServices().then((res) => {
            if (res?.ok) {
                setServiceRows(res.data);
            } else {
                toast.error(res?.message ?? "Something went wrong.");
            }
        });
    };

    useEffect(() => {
        ServiceRefreshData();
    }, []);
    return (
        <>
            <DataGrid
                autoHeight
                columns={transactioncolumns}
                rows={transactionRows}
            />
            <Dialog open={!!editTransactionDialog}>
                <DialogTitle>Edit Transaction</DialogTitle>
                <DialogContent>
                    <Box sx={{ p: 2 }}>
                        <Box>
                            <TextField
                                fullWidth
                                label="User ID"
                                value={editTransactionDialog?.user_id ?? ""}
                                onChange={(e) =>
                                    setEditTransactionDialog((prevState) => ({
                                        ...prevState,
                                        user_id: e.target.value,
                                    }))
                                }
                                variant="outlined"
                                margin="normal"
                            />
                            {warnings?.user_id ? (
                                <Typography component="small" color="error">
                                    {warnings.user_id}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                label="Room ID"
                                value={editTransactionDialog?.room_id ?? ""}
                                onChange={(e) =>
                                    setEditTransactionDialog((prevState) => ({
                                        ...prevState,
                                        room_id: e.target.value,
                                    }))
                                }
                                variant="outlined"
                                margin="normal"
                            />
                            {warnings?.room_id ? (
                                <Typography component="small" color="error">
                                    {warnings.room_id}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                label="Rent Start"
                                type="date"
                                value={editTransactionDialog?.rent_start ?? ""}
                                onChange={(e) =>
                                    setEditTransactionDialog((prevState) => ({
                                        ...prevState,
                                        rent_start: e.target.value,
                                    }))
                                }
                                variant="outlined"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {warnings?.rent_start ? (
                                <Typography component="small" color="error">
                                    {warnings.rent_start}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                label="Rent End"
                                type="date"
                                value={editTransactionDialog?.rent_end ?? ""}
                                onChange={(e) =>
                                    setEditTransactionDialog((prevState) => ({
                                        ...prevState,
                                        rent_end: e.target.value,
                                    }))
                                }
                                variant="outlined"
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {warnings?.rent_end ? (
                                <Typography component="small" color="error">
                                    {warnings.rent_end}
                                </Typography>
                            ) : null}
                        </Box>
                        <Box>
                            <Box>
                                <FormControl
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                >
                                    <InputLabel>Select Service ID</InputLabel>
                                    <Select
                                        value=""
                                        onChange={addServiceId}
                                        fullWidth
                                    >
                                        {serviceRows.map((service) => (
                                            <MenuItem
                                                key={service.id}
                                                value={service.id}
                                            >
                                                {service.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {warnings?.service_id ? (
                                    <Typography component="small" color="error">
                                        {warnings.service_id}
                                    </Typography>
                                ) : null}
                            </Box>
                        </Box>
                        <Box mt={2}>
                            {serviceid.map((service) => (
                                <Box
                                    key={service.id} // Ensure service.id is unique
                                    mt={1}
                                    display="flex"
                                    alignItems="center"
                                >
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        margin="normal"
                                        value={service.name}
                                        disabled
                                    />
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() =>
                                            removeServiceId(service.id)
                                        }
                                        style={{ marginLeft: "10px" }}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                        <Button type="submit" style={{ display: "none" }}>
                            Submit
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{ border: "2px solid lightblue" }}
                        onClick={() => setEditTransactionDialog(null)}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="success"
                        sx={{ border: "2px solid lightgreen" }}
                        disabled={loading}
                        onClick={onEditTransaction}
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
