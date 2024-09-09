import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { update, getUser } from "../api/user";
import { updateUser } from "../redux/authSlice"; // Import updateUser action
import { toast } from "react-toastify";
import { Box, Button, DialogTitle, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const AvatarContainer = styled("div")({
    position: "relative",
    width: 100,
    height: 100,
    overflow: "hidden",
    borderRadius: "50%",
    border: "2px solid black",
});

const EditContainer = styled("div")({
    position: "relative",
    width: 100,
    height: 100,
    overflow: "hidden",
    borderRadius: "8px",
});

const Overlay = styled("div")({
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100px",
    height: "100px",
    background: "rgba(0, 0, 0, 0.5)",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
    clipPath: "circle(50% at 50% 50%)",
    pointerEvents: "none",
});

const Avatar = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover",
});

const EditIconButton = styled(IconButton)({
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: "50%",
});

export default function MyAccount({ setEditDialog, user, cookies, dispatch }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [warnings, setWarnings] = useState({});

    useEffect(() => {
        setEditData(user);
    }, []);

    const fetchUserData = async () => {
        getUser(user.id, cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                dispatch(updateUser(res.data));
            } else {
                toast.error(res?.message ?? "Something went wrong");
            }
        });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleEditClick = () => setIsEditing(true);

    const handleSaveClick = (e) => {
        e.preventDefault();
        const body = new FormData();
        body.append("id", editData.id);
        body.append("username", editData.username);
        body.append("email", editData.email);
        body.append("mobile", editData.mobile);
        body.append("role", editData.role);

        if (file) {
            body.append("avatar", file);
        }

        update(body, cookies.AUTH_TOKEN).then((res) => {
            if (res?.ok) {
                toast.success(res?.message ?? "User updated successfully");
                fetchUserData();
                setIsEditing(false);
                setWarnings({});
            } else {
                setWarnings(res?.errors);
                toast.error(res?.message ?? "Something went wrong");
            }
        });
    };

    const handleChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setPreview(fileReader.result);
        };
        if (selectedFile) {
            fileReader.readAsDataURL(selectedFile);
        }
    };

    return (
        <>
            {isEditing ? (
                <Box>
                    <Box component="form" onSubmit={handleSaveClick}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <AccountCircleIcon sx={{ fontSize: 40, mr: 1 }} />
                            <Typography variant="h6">Edit Profile</Typography>
                        </Box>
                        <Box>
                            <label
                                htmlFor="avatar"
                                style={{ display: "block" }}
                            >
                                Profile Picture:
                            </label>
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                            />
                            <label htmlFor="avatar">
                                <EditContainer>
                                    <Avatar
                                        src={
                                            preview ??
                                            `http://localhost:8000/storage/${user?.avatar}`
                                        }
                                        alt="Avatar"
                                    />
                                    <Overlay />
                                </EditContainer>
                            </label>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                label="Username"
                                name="username"
                                value={editData?.username ?? ""}
                                onChange={handleChange}
                                error={warnings?.username}
                                helperText={warnings?.username}
                            />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                label="Email"
                                name="email"
                                value={editData?.email ?? ""}
                                onChange={handleChange}
                                error={warnings?.email}
                                helperText={warnings?.email}
                            />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                label="Mobile"
                                name="mobile"
                                value={editData?.mobile ?? ""}
                                onChange={handleChange}
                                error={warnings?.mobile}
                                helperText={warnings?.mobile}
                            />
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 2,
                                backgroundColor: "green",
                                "&:hover": {
                                    backgroundColor: "green",
                                },
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={() => setIsEditing(false)}
                            sx={{
                                mt: 2,
                                backgroundColor: "#007bff",
                                color: "white",
                                ml: 2,
                                "&:hover": {
                                    backgroundColor: "#0069d9",
                                    color: "white",
                                },
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <AccountCircleIcon sx={{ fontSize: 40, mr: 1 }} />
                        <Typography variant="h6">My Profile</Typography>
                    </Box>
                    <IconButton
                        onClick={() => setEditDialog(null)}
                        id="close-account-icon"
                        style={{ position: "absolute", top: 10, right: 10 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <AvatarContainer>
                        <Avatar
                            src={`http://localhost:8000/storage/${user?.avatar}`}
                            alt="Avatar"
                        />
                        <EditIconButton
                            onClick={handleEditClick}
                            id="edit-account-icon"
                        >
                            <EditIcon />
                        </EditIconButton>
                    </AvatarContainer>
                    <Typography variant="h6">
                        username: {user?.username ?? ""}
                    </Typography>
                    <Typography variant="h6">
                        email: {user?.email ?? ""}
                    </Typography>
                    <Typography variant="h6">
                        mobile: {user?.mobile ?? ""}
                    </Typography>
                </Box>
            )}
        </>
    );
}
