import { LuX, LuUpload } from "react-icons/lu";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory, type CategoryListItem } from "../../../api/categories";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryListItem[];
}

export default function AddCategoryModal({ isOpen, onClose, categories }: AddCategoryModalProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState<string>("");
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setSlug("");
      setDescription("");
      setParentId("");
      setIsActive(true);
      setImage(null);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview("");
    }
  }, [isOpen]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      const objectUrl = URL.createObjectURL(file);
      setImage(file);
      setImagePreview(objectUrl);
    }
  };

  const addMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onClose();
    },
    onError: (error: Error) => {
      alert(error.message);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      alert("Vui lòng nhập tên danh mục");
      return;
    }
    addMutation.mutate({
      name,
      slug: slug || null,
      description: description || null,
      parent_id: parentId || null,
      is_active: isActive,
      image: image
    });
  };

  if (!isOpen) return null;

  const parentCategories = categories.filter(c => c.level === 1);

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div 
        className="edit-modal-container" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '850px' }} // Tăng chiều rộng để form nằm ngang
      >
        {/* Header */}
        <div className="edit-modal-header">
          <h3 className="edit-modal-title">Thêm danh mục mới</h3>
          <button className="edit-modal-close-btn" onClick={onClose}>
            <LuX />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="edit-modal-body" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '32px' }}>
            
            {/* Cột trái: Ảnh */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="edit-modal-avatar-wrapper" style={{ marginBottom: '16px', width: '100%' }}>
                <div 
                  className="edit-modal-avatar-circle" 
                  style={{ 
                    borderRadius: '16px', 
                    width: '100%', 
                    height: '240px', // Hình vuông hoặc chữ nhật đứng nhẹ
                    border: '2px dashed #e2e8f0',
                    background: '#f8fafc',
                    margin: '0'
                  }}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ borderRadius: '14px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#94a3b8' }}>
                      <LuUpload size={32} />
                      <span style={{ fontSize: '13px', marginTop: '8px', fontWeight: 500 }}>Ảnh danh mục</span>
                    </div>
                  )}
                </div>
              </div>
              <label className="edit-modal-upload-label" style={{ width: '100%', textAlign: 'center', padding: '10px' }}>
                Chọn hình ảnh
                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
              </label>
            </div>

            {/* Cột phải: Các trường thông tin */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="edit-modal-grid-fields">
                <div className="edit-modal-form-group">
                  <label className="edit-modal-field-label">Tên danh mục <span style={{color: 'var(--red)'}}>*</span></label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="edit-modal-input-text"
                    placeholder="Nhập tên..."
                    required
                  />
                </div>
                <div className="edit-modal-form-group">
                  <label className="edit-modal-field-label">Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="edit-modal-input-text"
                    placeholder="danh-muc-tu-dong"
                  />
                </div>
              </div>

              <div className="edit-modal-grid-fields">
                <div className="edit-modal-form-group">
                  <label className="edit-modal-field-label">Danh mục cha</label>
                  <select 
                    value={parentId} 
                    onChange={(e) => setParentId(e.target.value)} 
                    className="edit-modal-select-field"
                  >
                    <option value="">Không có (Danh mục gốc)</option>
                    {parentCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="edit-modal-form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                   <div className="edit-modal-status-check" style={{ marginBottom: '10px' }}>
                    <input
                      type="checkbox"
                      id="cat_active_status"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                    />
                    <label htmlFor="cat_active_status" style={{ fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
                      Hoạt động
                    </label>
                  </div>
                </div>
              </div>

              <div className="edit-modal-form-group">
                <label className="edit-modal-field-label">Mô tả chi tiết</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="edit-modal-input-text"
                  style={{ height: '100px', padding: '12px', resize: 'none' }}
                  placeholder="Nhập mô tả ngắn về danh mục này..."
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="edit-modal-footer">
            <button type="button" className="edit-modal-btn-secondary" onClick={onClose}>
              Hủy bỏ
            </button>
            <button 
              type="submit"
              className="edit-modal-btn-primary" 
              disabled={addMutation.isPending}
            >
              {addMutation.isPending ? 'Đang thực hiện...' : 'Xác nhận thêm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
