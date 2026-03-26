import WishlistCard from "./WishlistCard";

export default function WishlistTab() {
  return (
    <div id="tab-wishlist" className="tab-content active">
      <div className="section-block">
        <div className="block-header">
          <h2>Sản Phẩm Yêu Thích (5)</h2>
        </div>
        
        <div className="wishlist-grid">
          {/* Gọi Component tĩnh 5 lần giống như file HTML gốc */}
          <WishlistCard />
          <WishlistCard />
          <WishlistCard />
          <WishlistCard />
          <WishlistCard />
        </div>
      </div>
    </div>
  );
}