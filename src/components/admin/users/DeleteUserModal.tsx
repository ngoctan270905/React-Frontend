import { LuTrash2, LuX } from "react-icons/lu";
import { type UserListItem } from "../../../api/users_management";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserListItem | null;
  onConfirm?: (userId: string) => void; // Thêm callback để thực hiện xóa
}

export function DeleteUserModal({ isOpen, onClose, user, onConfirm }: DeleteUserModalProps) {
  if (!isOpen || !user) return null;

  const handleConfirmDelete = () => {
    if (onConfirm) {
      onConfirm(user.id);
    }
  };

  return (
    <div className="delete-modal-overlay" onClick={onClose}>
      <div className="delete-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="delete-modal-body">
          <div className="delete-modal-top-actions">
            <button className="delete-modal-close-icon" onClick={onClose}>
              <LuX />
            </button>
          </div>
          
          <div className="delete-modal-danger-icon-box">
            <LuTrash2 size={32} />
          </div>

          <div className="delete-modal-text-content">
            <h3 className="delete-modal-headline">Xác nhận xóa</h3>
            <p className="delete-modal-description">
              Bạn có chắc chắn muốn xóa người dùng <strong>{user.fullname}</strong>? 
              <br />Hành động này không thể hoàn tác và dữ liệu sẽ mất vĩnh viễn.
            </p>
          </div>
        </div>

        <div className="delete-modal-actions-footer">
          <button className="delete-modal-btn-cancel" onClick={onClose}>
            Hủy bỏ
          </button>
          <button className="delete-modal-btn-danger" onClick={handleConfirmDelete}>
            Xác nhận xóa
          </button>
        </div>
      </div>
    </div>
  );
}