export default function OrderCard() {
  return (
    <div className="order-card">
      <div className="order-head">
        <div className="order-meta">
          <span className="order-id">#CEIN-20241205</span>
          <span className="order-date">05 tháng 12, 2024</span>
        </div>
        <span className="order-status status-shipping">Đang Vận Chuyển</span>
      </div>
      <div className="order-body">
        <div className="order-products">
          {/* Sản phẩm 1 */}
          <div className="order-product-img">
            <img src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=200&q=80" alt="" />
          </div>
          <div className="order-product-info">
            <h5>Classic Easy Zipper Tote</h5>
            <p>Màu: Black · Size: One Size</p>
            <p>Số lượng: 1</p>
          </div>
          
          {/* Sản phẩm 2 */}
          <div className="order-product-img">
            <img src="https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=200&q=80" alt="" />
          </div>
          <div className="order-product-info">
            <h5>Single-Origin Cashmere Beanie</h5>
            <p>Màu: Beige · Size: Free</p>
            <p>Số lượng: 2</p>
          </div>
        </div>
      </div>
      <div className="order-foot">
        <div className="order-total"><span>Tổng cộng</span>8.900.000đ</div>
        <div className="order-actions">
          <button className="btn-sm btn-outline">Theo Dõi</button>
          <button className="btn-sm btn-dark">Xem Chi Tiết</button>
        </div>
      </div>
    </div>
  );
}