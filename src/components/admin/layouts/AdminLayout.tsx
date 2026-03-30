import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../../../styles/Admin.css";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div className="shell">
        <Header />

        <main className="main">
          {/* Nội dung các trang con (DashboardTab, UserlistTab) sẽ đổ vào đây dựa trên URL */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
