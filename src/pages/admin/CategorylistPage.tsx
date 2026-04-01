import CategorylistTab from "../../components/admin/categories/CategorylistTab";

export default function CategorylistPage() {
  return (
    <div className="main">
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-main)" }}>
          Quản lý danh mục
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Xem và quản lý danh mục sản phẩm
        </p>
      </div>

      <CategorylistTab />
    </div>
  );
}
