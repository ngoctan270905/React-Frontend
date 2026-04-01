import { LuTrash2, LuX } from "react-icons/lu";
import { deleteUser, type UserListItem } from "../../../api/users_management";
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserListItem | null;
  onConfirm?: (userId: string) => void; // Thêm callback để thực hiện xóa
}

export function DeleteUserModal({ isOpen, onClose, user, onConfirm }: DeleteUserModalProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (userId: string) => deleteUser(userId),

    onSuccess: (data, userId) => {
      console.log("Xóa thành công:", data.message);
      alert("Xóa người dùng thành công!");

      // Tự động làm mới danh sách user sau khi xóa
      queryClient.invalidateQueries({
        queryKey: ['users', 'list']
      });

      // Đóng modal sau khi xóa thành công
      onClose();
    },

    onError: (error: any) => {
      console.error("Xóa thất bại:", error);
      alert("Xóa người dùng thất bại!");
    },
  });

  const isDeleting = deleteMutation.isPending;

  if (!isOpen || !user) return null;

  const handleConfirmDelete = () => {
    if (user?.id) {
      deleteMutation.mutate(user.id);
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
          <button className="delete-modal-btn-danger" onClick={handleConfirmDelete} disabled={isDeleting}>
            {isDeleting ? "Đang xóa..." : "Xác nhận xóa"}
          </button>
        </div>
      </div>
    </div>
  );
}