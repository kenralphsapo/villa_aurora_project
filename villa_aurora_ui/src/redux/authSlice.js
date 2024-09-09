// redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { revokeToken } from "../api/auth";

// Define initial state
const initialState = {
    isAuthenticated: false,
    user: null,
};

// Define async thunk for logout

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (token, { rejectWithValue }) => {
        try {
            const response = await revokeToken(token);
            if (!response.ok) {
                return rejectWithValue("Failed to revoke token");
            }
            const data = await response.json(); // Extract JSON data
            return data; // Return only the necessary data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
    },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
