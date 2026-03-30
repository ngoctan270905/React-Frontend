import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AccountPage from "./pages/AccountPage";

// Import các file phục vụ trang Admin
import AdminLayout from "./components/admin/layouts/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage"; 
import UserlistPage from "./pages/admin/UserlistPage";

export const router = createBrowserRouter([
    // ──── ROUTES NGƯỜI DÙNG ────
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
    },

    // ──── ROUTES ADMIN (NESTED) ────
    {
        path: "/admin",
        element: (
            <ProtectedRoute> 
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardPage />,
            },
            {
                path: "dashboard",
                element: <DashboardPage />,
            },
            {
                path: "users",
                element: <UserlistPage />,
            }
        ]
    }
]);
