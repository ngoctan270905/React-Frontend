import { LuTrash2, LuX } from "react-icons/lu"
import { type UserListItem } from "../../../api/users_management"

interface DeleteUserModalProps {
  isOpen: boolean
  onClose: () => void
  user: UserListItem | null
}

export function DeleteUserModal({ isOpen, onClose, user }: DeleteUserModalProps) {
  if (!isOpen || !user) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body" style={{ paddingBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-24px' }}>
            <button className="modal-close" onClick={onClose}>
              <LuX />
            </button>
          </div>
          
          <div className="modal-icon-box danger">
            <LuTrash2 size={24} />
          </div>

          <div className="modal-confirm-content">
            <h3>Xác nhận xóa</h3>
            <p>
              Bạn có chắc chắn muốn xóa người dùng <strong>{user.fullname}</strong>? 
              Hành động này không thể hoàn tác.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Hủy bỏ
          </button>
          <button className="btn btn-danger">
            Xác nhận xóa
          </button>
        </div>
      </div>
    </div>
  )
}
