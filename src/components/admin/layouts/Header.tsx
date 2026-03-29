export default function Header() {
  return (
    <header className="header">
      {/* Nút toggle Sidebar */}
      <div className="header-toggle">‹</div>

      {/* Thanh tìm kiếm */}
      <div className="search-bar">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        Tìm kiếm
      </div>

      <div className="header-right">
        {/* Icon: Ngôn ngữ (Globe) */}
        <div className="h-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>

        {/* Icon: Chế độ tối (Moon) - BỔ SUNG */}
        <div className="h-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>

        {/* Icon: Menu phím tắt (Grid) - BỔ SUNG */}
        <div className="h-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
        </div>

        {/* Icon: Thông báo (Bell) - BỔ SUNG */}
        <div className="h-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <div className="notif-dot"></div>
        </div>

        {/* Avatar người dùng */}
        <div className="h-icon">
    <div className="avatar">
      <span className="avatar-fallback">JD</span>
    </div>
    <div className="online-dot"></div>
  </div>
      </div>
    </header>
  );
}