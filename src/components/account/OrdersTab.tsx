import OrderCard from "./OrderCard";
// Giả sử bạn tạo thêm các card tĩnh khác để nội dung khác nhau
// import OrderCardDelivered from "./OrderCardDelivered";
// import OrderCardCancelled from "./OrderCardCancelled";

export default function OrdersTab() {
  return (
    <div id="tab-orders" className="tab-content active">
      <div className="section-block">
        <div className="block-header">
          <h2>Đơn Hàng Của Tôi</h2>
        </div>
        <div className="orders-filter">
          <button className="filter-btn active">Tất Cả (12)</button>
          <button className="filter-btn">Đang Giao (1)</button>
          <button className="filter-btn">Đã Nhận (9)</button>
          <button className="filter-btn">Đã Hủy (2)</button>
        </div>

        {/* Gọi Component tĩnh - Không truyền props */}
        <OrderCard /> 
        <OrderCard />
        {/* Nếu bạn muốn nội dung khác đi mà không dùng logic, 
            bạn chỉ cần copy code HTML của đơn hàng khác vào đây 
            hoặc tạo các file OrderCard2, OrderCard3 riêng biệt */}
        
      </div>
    </div>
  );
}