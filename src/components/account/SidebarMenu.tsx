export default function SidebarMenu({ activeTab, setActiveTab }: any) {
  const menuItems = [
    { id: "overview", label: "Tổng Quan", icon: "ph-squares-four" },
    { id: "profile", label: "Thông Tin Cá Nhân", icon: "ph-user-circle" },
    { id: "orders", label: "Đơn Hàng Của Tôi", icon: "ph-package" },
    { id: "wishlist", label: "Yêu Thích", icon: "ph-heart" },
    { id: "address", label: "Địa Chỉ", icon: "ph-map-pin" },
    { id: "notifications", label: "Thông Báo", icon: "ph-bell" },
  ];

  return (
    <nav className="sidebar-nav">
      {menuItems.map((item) => (
        <a
          key={item.id}
          className={activeTab === item.id ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab(item.id);
          }}
        >
          <i className={`ph ${item.icon}`}></i>
          {item.label}
          <i className="ph ph-caret-right nav-arrow"></i>
        </a>
      ))}
    </nav>
  );
}