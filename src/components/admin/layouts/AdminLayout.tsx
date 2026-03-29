import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div className="shell">
        <Header />

        <main className="main">
          {/* DashboardPage sẽ được render vào đây */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}