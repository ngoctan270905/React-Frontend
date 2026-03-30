import { 
  FiChevronLeft, 
  FiSearch, 
  FiGlobe, 
  FiMoon, 
  FiGrid, 
  FiBell 
} from "react-icons/fi";

export default function Header() {
  return (
    <header className="admin-header">
      {/* Nút toggle Sidebar */}
      <div className="admin-header-toggle">
        <FiChevronLeft size={20} />
      </div>

      {/* Thanh tìm kiếm */}
      <div className="admin-search-bar">
        <FiSearch size={18} style={{ marginRight: 6 }} />
        Tìm kiếm
      </div>

      <div className="admin-header-right">
        {/* Icon: Ngôn ngữ (Globe) */}
        <div className="admin-h-icon">
          <FiGlobe size={20} />
        </div>

        {/* Icon: Chế độ tối (Moon) */}
        <div className="admin-h-icon">
          <FiMoon size={20} />
        </div>

        {/* Icon: Menu phím tắt (Grid) */}
        <div className="admin-h-icon">
          <FiGrid size={20} />
        </div>

        {/* Icon: Thông báo (Bell) */}
        <div className="admin-h-icon" style={{ position: "relative" }}>
          <FiBell size={20} />
          <div className="admin-notif-dot"></div>
        </div>

        {/* Avatar người dùng */}
        <div className="admin-h-icon">
          <div className="admin-avatar">
            <span className="admin-avatar-fallback">JD</span>
          </div>
          <div className="admin-online-dot"></div>
        </div>
      </div>
    </header>
  );
}