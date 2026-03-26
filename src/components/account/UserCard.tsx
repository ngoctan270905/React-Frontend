export default function UserCard() {
  return (
    <div className="user-card">
      <div className="avatar-wrap">
        <img 
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80" 
          alt="Avatar" 
        />
        <div className="avatar-edit">
          <i className="ph ph-camera"></i>
        </div>
      </div>
      <h3>Nguyễn Minh Anh</h3>
      <span>minhanhstyle@gmail.com</span>
      <div className="member-badge">Gold Member</div>
    </div>
  );
}