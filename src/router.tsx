import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import UserDetailPage from "./pages/UserDetailPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "users",
                element: <UsersPage />
            },
            {
                path: "users/:id",
                element: <UserDetailPage />
            },
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                )

            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }

])