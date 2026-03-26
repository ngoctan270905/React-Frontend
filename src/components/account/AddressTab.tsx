import AddressCard from "./AddressCard";

export default function AddressTab() {
  return (
    <div id="tab-address" className="tab-content active">
      <div className="section-block">
        <div className="block-header">
          <h2>Địa Chỉ Của Tôi</h2>
        </div>
        <div className="address-grid">
          
          {/* Gọi Component tĩnh - Nó sẽ tự hiện đúng nội dung "Nguyễn Minh Anh" bạn viết bên trong */}
          <AddressCard /> 

          {/* Nếu muốn hiện thêm 1 cái địa chỉ khác mà không dùng logic, 
              bạn cứ gọi thêm 1 lần nữa (nội dung sẽ giống hệt cái trên) */}
          <AddressCard />

          <div className="add-address">
            <i className="ph ph-plus-circle"></i>
            <span>Thêm Địa Chỉ Mới</span>
          </div>
        </div>
      </div>
    </div>
  );
}