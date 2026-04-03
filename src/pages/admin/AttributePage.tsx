import AttributelistTab from "../../components/admin/attributes/AttributelistTab";

export default function AttributePage() {
    return (
        <div className="main">
            <div style={{ marginBottom: "24px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-main)" }}>
                    Quản lý thuộc tính
                </h1>
                <p style={{
                    color: "var(--text-muted)",
                    fontSize: "14px",
                
                }}>         
                    Xem và quản lý thuộc tính sản phẩm
                </p>
                </div>
                <AttributelistTab />
        </div>
    );
}