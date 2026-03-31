import { LuX } from "react-icons/lu";
import { updateUser, type UpdateUserPayload, type UserListItem } from "../../../api/users_management";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserListItem | null;
}

export function EditUserModal({ isOpen, onClose, user }: EditUserModalProps) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Giải phóng bộ nhớ nếu đã có preview cũ
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
      
      const objectUrl = URL.createObjectURL(file);
      setAvatar(file);
      setAvatarPreview(objectUrl);
    }
  };

  useEffect(() => {
    if (user) {
      setFullname(user.fullname);
      setEmail(user.email);
      setPhone(user.phone_number);
      setRole(user.role);
      setIsActive(user.is_active);
      setAvatarPreview(""); // Reset preview khi đổi user
    }
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [user]);

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateUserPayload) => updateUser(user!.id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onClose();
    },
    onError: (error: Error) => {
      alert(error.message);
    }
  });

  const handleSubmit = () => {
    updateMutation.mutate({
      fullname,
      email,
      phone_number: phone,
      role,
      is_active: isActive,
      avatar_file: avatar
    });
  };

  if (!isOpen || !user) return null;

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div className="edit-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="edit-modal-header">
          <h3 className="edit-modal-title">Chỉnh sửa người dùng</h3>
          <button className="edit-modal-close-btn" onClick={onClose}>
            <LuX />
          </button>
        </div>

        {/* Body */}
        <div className="edit-modal-body">
          <div className="edit-modal-avatar-wrapper">
            <div className="edit-modal-avatar-circle">
              {avatarPreview || user.avatar_url ? (
                <img
                  src={avatarPreview || user.avatar_url || "/default-avatar.png"}
                  alt={user.fullname}
                />
              ) : (
                <span className="edit-modal-avatar-text">
                  {user.fullname.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              )}
            </div>
            <label className="edit-modal-upload-label">
              Thay đổi ảnh đại diện
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </label>
          </div>

          <div className="edit-modal-form-group">
            <label className="edit-modal-field-label">Họ và tên</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="edit-modal-input-text"
              placeholder="Nhập họ tên..."
            />
          </div>

          <div className="edit-modal-form-group">
            <label className="edit-modal-field-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="edit-modal-input-text"
              placeholder="example@gmail.com"
            />
          </div>

          <div className="edit-modal-grid-fields">
            <div className="edit-modal-form-group">
              <label className="edit-modal-field-label">Số điện thoại</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="edit-modal-input-text"
              />
            </div>
            <div className="edit-modal-form-group">
              <label className="edit-modal-field-label">Vai trò</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                className="edit-modal-select-field"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>

          <div className="edit-modal-status-check">
            <input
              type="checkbox"
              id="edit_active_status"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <label htmlFor="edit_active_status">Kích hoạt tài khoản</label>
          </div>
        </div>

        {/* Footer */}
        <div className="edit-modal-footer">
          <button className="edit-modal-btn-secondary" onClick={onClose}>
            Hủy
          </button>
          <button 
            className="edit-modal-btn-primary" 
            onClick={handleSubmit} 
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </div>
    </div>
  );
}