import { NavLink } from "react-router-dom";
import { 
  FiLayout, 
  FiUsers, 
  FiShoppingCart, 
  FiBook, 
  FiMail, 
  FiMessageSquare, 
  FiChevronRight,
  FiGrid 
} from "react-icons/fi";

export default function Sidebar() {
  const menuItems = [
    { id: "dashboard", label: "Dashboards", icon: <FiLayout />, path: "/admin/dashboard", hasArrow: true },
    { id: "users", label: "Quản lý người dùng", icon: <FiUsers />, path: "/admin/users", hasArrow: true },
    { id: "categories", label: "Quản lý danh mục", icon: <FiGrid />, path: "/admin/categories", hasArrow: true },
    { id: "academy", label: "Academy", icon: <FiBook />, path: "/admin/academy", hasArrow: true },
    { id: "email", label: "Email", icon: <FiMail />, path: "/admin/email", hasArrow: false },
    { id: "chat", label: "Chat", icon: <FiMessageSquare />, path: "/admin/chat", hasArrow: false },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        <div className="admin-logo-icon">F</div>
        <span className="admin-logo-text">FASHION</span>
      </div>

      <nav className="admin-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => 
              `admin-nav-item ${isActive ? "admin-active" : ""}`
            }
          >
            <div className="admin-nav-icon">{item.icon}</div>
            <span className="admin-nav-label">{item.label}</span>
            {item.hasArrow && (
              <span className="admin-nav-arrow"><FiChevronRight /></span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
