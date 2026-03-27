import { useUser } from "../../context/UserContext";
// Khai báo kiểu dữ liệu cho props
interface UserCardProps {
  onOpenModal: () => void;
}

export default function UserCard({ onOpenModal }: UserCardProps) {
  const { user } = useUser()
  
  return (
    <div className="user-card">
      <div className="avatar-wrap">
        <img 
          src={user?.data.avatar_url || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80'} 
          alt="Avatar" 
        />
        <div className="avatar-edit" onClick={onOpenModal}>
          <i className="ph ph-camera"></i>
        </div>
      </div>
      <h3>{user?.data.fullname || ''}</h3>
      <span>{user?.data.email || ''}</span>
      <div className="member-badge">Gold Member</div>
    </div>
  );
}