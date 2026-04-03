import { LuX, LuPlus, LuTrash2 } from "react-icons/lu";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateAttribute, type AttributeItem, type AttributeValue, type AttributeUpdateData } from "../../../api/attributes";

interface UpdateAttributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  attribute: AttributeItem | null;
}

const TYPE_OPTIONS = [
  { value: "text", label: "Nhập văn bản" },
  { value: "color", label: "Bảng màu" },
  { value: "select", label: "Danh sách chọn" },
  { value: "button", label: "Nút chọn" },
  { value: "radio", label: "Chọn một" },
];

export default function UpdateAttributeModal({ isOpen, onClose, attribute }: UpdateAttributeModalProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useState("text");
  const [isVariantAttribute, setIsVariantAttribute] = useState(true);
  const [isFilterable, setIsFilterable] = useState(true);
  const [values, setValues] = useState<AttributeValue[]>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isOpen && attribute) {
      setName(attribute.name);
      setCode(attribute.code);
      setType(attribute.type);
      setIsVariantAttribute(attribute.isVariantAttribute);
      setIsFilterable(attribute.isFilterable);
      setValues(attribute.values || []);
    }
  }, [isOpen, attribute]);

  const addValue = () => {
    setValues([...values, { value: "", colorCode: type === 'color' ? "#000000" : undefined }]);
  };

  const removeValue = (index: number) => {
    setValues(values.filter((_, i) => i !== index));
  };

  const updateValueField = (index: number, field: keyof AttributeValue, newValue: string) => {
    const updated = [...values];
    updated[index] = { ...updated[index], [field]: newValue };
    setValues(updated);
  };

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; updateData: AttributeUpdateData }) => 
      UpdateAttribute(data.id, data.updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attributes"] });
      onClose();
    },
    onError: (error: Error) => {
      alert(error.message);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attribute) return;
    if (!name || !code) {
      alert("Vui lòng nhập đầy đủ tên và mã thuộc tính");
      return;
    }
    
    updateMutation.mutate({
      id: attribute.id,
      updateData: {
        name,
        code,
        type,
        isVariantAttribute,
        isFilterable,
        values: values.filter(v => v.value.trim() !== "")
      }
    });
  };

  if (!isOpen || !attribute) return null;

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div 
        className="edit-modal-container" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '700px' }}
      >
        <div className="edit-modal-header">
          <h3 className="edit-modal-title">Cập nhật thuộc tính</h3>
          <button className="edit-modal-close-btn" onClick={onClose}>
            <LuX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="edit-modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div className="edit-modal-form-group">
                <label className="edit-modal-field-label">Tên thuộc tính <span style={{color: 'var(--red)'}}>*</span></label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="edit-modal-input-text"
                  placeholder="Ví dụ: Kích thước, Màu sắc..."
                  required
                />
              </div>
              <div className="edit-modal-form-group">
                <label className="edit-modal-field-label">Mã thuộc tính <span style={{color: 'var(--red)'}}>*</span></label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="edit-modal-input-text"
                  placeholder="Ví dụ: size, color..."
                  required
                />
              </div>
            </div>

            <div className="edit-modal-form-group" style={{ marginBottom: '20px' }}>
              <label className="edit-modal-field-label">Kiểu nhập liệu / hiển thị</label>
              <select 
                value={type} 
                onChange={(e) => {
                  const newType = e.target.value;
                  setType(newType);
                  setValues(values.map(v => ({
                    ...v,
                    colorCode: newType === 'color' ? (v.colorCode || "#000000") : undefined
                  })));
                }} 
                className="edit-modal-select-field"
              >
                {TYPE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '16px', 
              marginBottom: '24px'
            }}>
              {/* Ô 1: Làm biến thể */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                background: '#f8fafc',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid #eef2f6'
              }}>
                <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '22px', cursor: 'pointer', flexShrink: 0 }}>
                  <input
                    type="checkbox"
                    style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
                    checked={isVariantAttribute}
                    onChange={(e) => setIsVariantAttribute(e.target.checked)}
                  />
                  <span style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: isVariantAttribute ? 'var(--purple)' : '#cbd5e1',
                    transition: '0.3s', borderRadius: '34px'
                  }}>
                    <span style={{
                      position: 'absolute', height: '16px', width: '16px',
                      left: isVariantAttribute ? '20px' : '4px', bottom: '3px',
                      backgroundColor: 'white', transition: '0.3s', borderRadius: '50%',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }} />
                  </span>
                </label>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#1e293b', lineHeight: 1.2 }}>Làm biến thể</span>
                  <span style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>Dùng phân loại SP</span>
                </div>
              </div>

              {/* Ô 2: Hiện bộ lọc */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                background: '#f8fafc',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid #eef2f6'
              }}>
                <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '22px', cursor: 'pointer', flexShrink: 0 }}>
                  <input
                    type="checkbox"
                    style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
                    checked={isFilterable}
                    onChange={(e) => setIsFilterable(e.target.checked)}
                  />
                  <span style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: isFilterable ? 'var(--purple)' : '#cbd5e1',
                    transition: '0.3s', borderRadius: '34px'
                  }}>
                    <span style={{
                      position: 'absolute', height: '16px', width: '16px',
                      left: isFilterable ? '20px' : '4px', bottom: '3px',
                      backgroundColor: 'white', transition: '0.3s', borderRadius: '50%',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }} />
                  </span>
                </label>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#1e293b', lineHeight: 1.2 }}>Hiện bộ lọc</span>
                  <span style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>Dùng lọc tìm kiếm</span>
                </div>
              </div>
            </div>

            <div className="values-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <label className="edit-modal-field-label" style={{ marginBottom: 0 }}>Danh sách giá trị</label>
                <button 
                  type="button" 
                  onClick={addValue}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '6px 12px', background: 'var(--purple)', color: '#fff',
                    border: 'none', borderRadius: '6px', fontSize: '13px', cursor: 'pointer'
                  }}
                >
                  <LuPlus size={16} /> Thêm giá trị
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {values.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8', border: '1px dashed #e2e8f0', borderRadius: '8px' }}>
                    Chưa có giá trị nào được thêm
                  </div>
                )}
                {values.map((val, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {type === 'color' && (
                      <div style={{ position: 'relative', width: '40px', height: '40px' }}>
                        <input
                          type="color"
                          value={val.colorCode}
                          onChange={(e) => updateValueField(idx, 'colorCode', e.target.value)}
                          style={{
                            width: '100%', height: '100%', padding: 0, border: 'none',
                            borderRadius: '50%', cursor: 'pointer', overflow: 'hidden',
                            backgroundColor: 'transparent'
                          }}
                        />
                        <div style={{ 
                          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                          borderRadius: '50%', border: '2px solid #000', pointerEvents: 'none',
                          backgroundColor: val.colorCode
                        }} />
                      </div>
                    )}
                    <input
                      type="text"
                      value={val.value}
                      onChange={(e) => updateValueField(idx, 'value', e.target.value)}
                      className="edit-modal-input-text"
                      placeholder={type === 'color' ? "Tên màu (ví dụ: Đỏ)" : "Giá trị (ví dụ: L, XL, Cotton...)"}
                      style={{ flex: 1 }}
                    />
                    <button 
                      type="button" 
                      onClick={() => removeValue(idx)}
                      style={{
                        padding: '8px', color: 'var(--red)', background: 'var(--red-pale)',
                        border: 'none', borderRadius: '6px', cursor: 'pointer'
                      }}
                    >
                      <LuTrash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="edit-modal-footer">
            <button type="button" className="edit-modal-btn-secondary" onClick={onClose}>
              Hủy bỏ
            </button>
            <button 
              type="submit"
              className="edit-modal-btn-primary" 
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? 'Đang cập nhật...' : 'Lưu thay đổi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
