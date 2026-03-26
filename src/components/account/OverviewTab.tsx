import OrderCard from "./OrderCard";

export default function OverviewTab() {
  return (
    <div id="tab-overview" className="tab-content active">
      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-item">
          <div className="num">12</div>
          <div className="label">Đơn Hàng</div>
        </div>
        <div className="stat-item">
          <div className="num">5</div>
          <div className="label">Yêu Thích</div>
        </div>
        <div className="stat-item">
          <div className="num">2.400</div>
          <div className="label">Điểm Thưởng</div>
        </div>
        <div className="stat-item">
          <div className="num">Gold</div>
          <div className="label">Hạng Thành Viên</div>
        </div>
      </div>

      {/* Loyalty Points Section */}
      <div className="section-block">
        <div className="block-header">
          <h2>Điểm Thưởng & Hạng Thành Viên</h2>
          <span className="edit-link">
            Chi tiết <i className="ph ph-arrow-right"></i>
          </span>
        </div>
        <div className="points-bar-wrap">
          <div className="points-bar-header">
            <h4>Hạng Gold — 2.400 điểm</h4>
            <span>Cần thêm 600 điểm để lên Platinum</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill"></div>
          </div>
          <div className="progress-label">
            <span>Gold (2.000đ)</span>
            <span>Platinum (3.000đ)</span>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="section-block">
        <div className="block-header">
          <h2>Đơn Hàng Gần Đây</h2>
          <span className="edit-link">
            Xem tất cả <i className="ph ph-arrow-right"></i>
          </span>
        </div>
        
        {/* Chỉ gọi tên Component, không truyền bất kỳ logic hay data nào */}
        <OrderCard />
        <OrderCard />
      </div>
    </div>
  );
}