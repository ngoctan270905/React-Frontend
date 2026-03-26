import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AccountPage from "./pages/AccountPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><HomePage /></ProtectedRoute>,
    },
    {
        path: "/login",
        element: <PublicRoute><Login /></PublicRoute>
    },
    {
        path: "/register",
        element: <PublicRoute><Register /></PublicRoute>
    },
    {
        path: "/account",
        element: <ProtectedRoute><AccountPage /></ProtectedRoute>
    }

])