export default function AddressCard() {
  return (
    <div className="address-card default">
      <div className="default-tag">Mặc Định</div>
      <h5>Nguyễn Minh Anh</h5>
      <p>+84 912 345 678</p>
      <p>
        28 Lý Thường Kiệt, Phường Hàng Bài,
        <br />
        Quận Hoàn Kiếm, Hà Nội
      </p>
      <div className="address-card-actions">
        <button className="btn-sm btn-outline">Chỉnh Sửa</button>
        <button className="btn-sm btn-outline">Xóa</button>
      </div>
    </div>
  );
}