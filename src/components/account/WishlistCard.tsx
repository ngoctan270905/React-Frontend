export default function WishlistCard() {
  return (
    <div className="wishlist-card">
      <div className="wishlist-img">
        <img 
          src="https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&w=400&q=80" 
          alt="" 
        />
        <div className="wishlist-remove">
          <i className="ph ph-x"></i>
        </div>
      </div>
      <h5>Alpaca Wool Cropped Cardigan</h5>
      <p>5.200.000đ</p>
    </div>
  );
}