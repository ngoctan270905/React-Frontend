import { LuX } from "react-icons/lu"
import { type UserListItem } from "../../../api/users_management"

interface EditUserModalProps {
  isOpen: boolean
  onClose: () => void
  user: UserListItem | null
}

export function EditUserModal({ isOpen, onClose, user }: EditUserModalProps) {
  if (!isOpen || !user) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h3 className="modal-title">Chỉnh sửa người dùng</h3>
          <button className="modal-close" onClick={onClose}>
            <LuX />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Avatar Section */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px', gap: '12px' }}>
            <div className="admin-avatar" style={{ width: '80px', height: '80px', fontSize: '24px', border: '3px solid var(--purple-light)' }}>
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.fullname} />
              ) : (
                <span className="admin-avatar-fallback">
                  {user.fullname.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              )}
            </div>
            <button className="btn btn-secondary" style={{ height: '32px', padding: '0 12px', fontSize: '12px' }}>
              Thay đổi ảnh đại diện
            </button>
          </div>

          <div className="form-group">
            <label className="form-label">Họ và tên</label>
            <input 
              type="text" 
              defaultValue={user.fullname}
              className="form-input"
              placeholder="Nhập họ tên..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              defaultValue={user.email}
              className="form-input"
              placeholder="example@gmail.com"
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Số điện thoại</label>
              <input 
                type="text" 
                defaultValue={user.phone_number}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Vai trò</label>
              <select defaultValue={user.role} className="form-select">
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
            <input 
              type="checkbox" 
              id="is_active" 
              defaultChecked={user.is_active}
              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="is_active" className="form-label" style={{ marginBottom: 0, cursor: 'pointer' }}>
              Kích hoạt tài khoản
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Hủy
          </button>
          <button className="btn btn-primary">
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  )
}
