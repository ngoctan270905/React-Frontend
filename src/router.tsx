import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AccountPage from "./pages/AccountPage";

// Import thêm các file phục vụ trang Admin
import AdminLayout from "./components/admin/layouts/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage"; 

export const router = createBrowserRouter([
    // ──── ROUTES NGƯỜI DÙNG (GIỮ NGUYÊN) ────
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

    // ──── THÊM MỚI LOGIC TRANG ADMIN ────
    {
        path: "/admin",
        element: (
            <ProtectedRoute> 
                {/* Bạn có thể thêm RoleCheck ở đây nếu muốn chỉ Admin mới vào được */}
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true, // Khớp với đường dẫn /admin
                element: <DashboardPage />,
            },
            {
                path: "users", // Khớp với đường dẫn /admin/users
                element: <DashboardPage />, // Dùng chung component dashboard có cái bảng của bạn
            }
        ]
    }
]);