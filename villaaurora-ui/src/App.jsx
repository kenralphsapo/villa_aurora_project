import { useState } from "react";
import { RouterProvider, createBrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Admin from "./pages/Admin";
import ForgotPassword from "./pages/ForgotPassword";
import Myaccount from "./pages/Myaccount";
import Undead from "./pages/Undead";
import ResetPassword from "./pages/ResetPassword";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/admin",
            element: <Admin />,
        },
        {
            path: "/forgotpass",
            element: <ForgotPassword />,
        },
        {
            path: "/guest",
            element: <Myaccount />,
        },
        {
            path: "*",
            element: <NotFound />,
        },
        {
            path: "/hi",
            element: <Undead />,
        },
        {
            path: "/reset-password",
            element: <ResetPassword />,
        }
    ]);

    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
}

export default App;
