import React, { useEffect, useState } from "react";
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import checkAuth from "../hoc/checkAuth";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { ServiceDialog } from "../components/dialogs/ServiceDialogs";
import { RoomDialog } from "../components/dialogs/RoomDialogs";
import { TransactionDialogs } from "../components/dialogs/TransactionDialogs";
import { TestimonialDialogs } from "../components/dialogs/TestimonialDialogs";
import { UserDialogs } from "../components/dialogs/UserDialogs";
import BottomNav from "../components/BottomNav";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
function Admin() {
    const user = useSelector((state) => state.auth.user);
    const [deleteDialog, setDeleteDialog] = useState(null);
    const [editDialog, setEditDialog] = useState(null);
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const [cookies] = useCookies(["AUTH_TOKEN"]);

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "username", headerName: "Username", width: 150 },
        { field: "mobile", headerName: "Mobile", width: 150 },
        { field: "email", headerName: "Email", width: 150 },
        { field: "role", headerName: "Role" },
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

    return (
        <Box>
            <Box id="custom-admin">
                <AppBar
                    id="custom-navbar"
                    position="static"
                    style={{ textAlign: "center" }}
                >
                    <Toolbar
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                            <Typography variant="h3">
                                Welcome{" "}
                                {user?.username ?? "Wait, Who are you??"}
                            </Typography>
                        </Box>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Box>
                    <Box id="table">
                        <UserDialogs />
                        <ServiceDialog />
                        <RoomDialog />
                        <TransactionDialogs />
                        <TestimonialDialogs />
                    </Box>
                    <BottomNav />
                </Box>
            </Box>
        </Box>
    );
}

export default checkAuth(Admin);
