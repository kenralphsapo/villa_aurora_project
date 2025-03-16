// redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";


// Define initial state
const initialState = {
    isAuthenticated: false,
    user: null,
};
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
          },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
    },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
