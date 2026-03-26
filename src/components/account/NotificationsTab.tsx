import NotificationItem from "./NotificationItem";

export default function NotificationsTab() {
  return (
    <div id="tab-notifications" className="tab-content active">
      <div className="section-block">
        <div className="block-header">
          <h2>Cài Đặt Thông Báo</h2>
        </div>
        <div>
          <NotificationItem title="Cập Nhật Đơn Hàng" desc="Nhận thông báo khi đơn hàng được xác nhận, vận chuyển hoặc giao thành công." defaultOff={false} />
          <NotificationItem title="Khuyến Mãi & Ưu Đãi" desc="Nhận thông tin về các chương trình giảm giá và ưu đãi độc quyền." defaultOff={false} />
          <NotificationItem title="Hàng Mới Về" desc="Cập nhật về các bộ sưu tập và sản phẩm mới nhất từ CEIN." defaultOff={true} />
          <NotificationItem title="Điểm Thưởng" desc="Nhận thông báo khi có điểm thưởng mới hoặc điểm sắp hết hạn." defaultOff={false} />
          <NotificationItem title="Bản Tin Email" desc="Nhận tạp chí phong cách và câu chuyện từ thương hiệu CEIN." defaultOff={true} />
        </div>
      </div>
    </div>
  );
}