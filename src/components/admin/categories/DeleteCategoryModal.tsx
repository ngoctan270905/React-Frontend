import { LuTrash2, LuX } from "react-icons/lu";
import { deleteCategory, type CategoryListItem } from "../../../api/categories";
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: CategoryListItem | null;
}

export function DeleteCategoryModal({ isOpen, onClose, category }: DeleteCategoryModalProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (categoryId: string) => deleteCategory(categoryId),

    onSuccess: (data) => {
      console.log("Xóa thành công:", data.message);
      alert("Xóa danh mục thành công!");

      // Tự động làm mới danh sách categories sau khi xóa
      queryClient.invalidateQueries({
        queryKey: ['categories', 'list']
      });

      // Đóng modal sau khi xóa thành công
      onClose();
    },

    onError: (error: any) => {
      console.error("Xóa thất bại:", error);
      alert("Xóa danh mục thất bại! Vui lòng kiểm tra lại (có thể danh mục này đang chứa sản phẩm hoặc danh mục con).");
    },
  });

  const isDeleting = deleteMutation.isPending;

  if (!isOpen || !category) return null;

  const handleConfirmDelete = () => {
    if (category?.id) {
      deleteMutation.mutate(category.id);
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
            <h3 className="delete-modal-headline">Xác nhận xóa danh mục</h3>
            <p className="delete-modal-description">
              Bạn có chắc chắn muốn xóa danh mục <strong>{category.name}</strong>?
              <br />Hành động này không thể hoàn tác và dữ liệu sẽ mất vĩnh viễn.
            </p>
          </div>
        </div>

        <div className="delete-modal-actions-footer">
          <button className="delete-modal-btn-cancel" onClick={onClose} disabled={isDeleting}>
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
