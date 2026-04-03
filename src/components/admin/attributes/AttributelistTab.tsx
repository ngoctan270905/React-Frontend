import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import {
  LuPlus,
} from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { GetAllAttributes, type AttributeItem, type AttributeValue } from "../../../api/attributes";
import AddAttributeModal from "./AddAttributeModal";
import UpdateAttributeModal from "./UpdateAttributeModal";

const columnHelper = createColumnHelper<AttributeItem>();

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  text: { label: "Nhập văn bản", color: "#6366f1" },
  color: { label: "Bảng màu", color: "#ec4899" },
  select: { label: "Danh sách chọn", color: "#10b981" },
  button: { label: "Nút chọn", color: "#f59e0b" },
  radio: { label: "Chọn một", color: "#3b82f6" },
  checkbox: { label: "Chọn nhiều", color: "#8b5cf6" },
};

export default function AttributelistTab() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState<AttributeItem | null>(null);
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["attributes", "list"],
    queryFn: GetAllAttributes,
  });

  const attributes = data?.data.attributes || [];

  const handleEditClick = (attribute: AttributeItem) => {
    setSelectedAttribute(attribute);
    setIsUpdateModalOpen(true);
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Tên thuộc tính",
        cell: (info) => (
          <div style={{ fontWeight: 600, color: "var(--text-main)", fontSize: "14px" }}>
            {info.getValue()}
          </div>
        ),
      }),
      columnHelper.accessor("code", {
        header: "Mã",
        cell: (info) => (
          <code style={{ 
            fontSize: "12px", 
            color: "#64748b",
            background: "#f8f9fa",
            padding: "2px 6px",
            borderRadius: "4px",
            border: "1px solid #eee"
          }}>{info.getValue()}</code>
        ),
      }),
      columnHelper.accessor("type", {
        header: "Loại nhập liệu",
        cell: (info) => {
          const type = info.getValue();
          const config = TYPE_LABELS[type] || { label: type, color: "#64748b" };
          return (
            <span style={{ 
              fontSize: "12px",
              fontWeight: 500,
              color: config.color,
              background: `${config.color}15`,
              padding: "4px 10px",
              borderRadius: "20px",
              border: `1px solid ${config.color}30`
            }}>
              {config.label}
            </span>
          );
        },
      }),
      columnHelper.accessor("values", {
        header: "Giá trị hiển thị",
        cell: (info) => {
          const values = info.getValue() as AttributeValue[];
          const type = info.row.original.type;
          
          if (!values || values.length === 0) return <span style={{ color: "#94a3b8", fontSize: "13px" }}>Trống</span>;
          
          return (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
              {values.slice(0, 10).map((v, idx) => {
                if (type === 'color' || v.colorCode) {
                  return (
                    <div 
                      key={idx}
                      title={v.value}
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: v.colorCode || "#eee",
                        border: "1px solid #000",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                      }}
                    />
                  );
                }

                if (type === 'button') {
                  return (
                    <span 
                      key={idx}
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        background: "#fff",
                        color: "#1e293b",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        border: "1.5px solid #e2e8f0",
                        minWidth: "28px",
                        textAlign: "center",
                        display: "inline-block",
                      }}
                    >
                      {v.value}
                    </span>
                  );
                }
                
                return (
                  <span 
                    key={idx}
                    style={{
                      fontSize: "11px",
                      background: "#f1f5f9",
                      color: "#475569",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    {v.value}
                  </span>
                );
              })}
              {values.length > 10 && (
                <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                  +{values.length - 10}
                </span>
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor("isVariantAttribute", {
        header: "Biến thể",
        cell: (info) => (
          <span className={`badge ${info.getValue() ? "badge-completed" : "badge-cancelled"}`}>
            {info.getValue() ? "Có" : "Không"}
          </span>
        ),
      }),
      columnHelper.accessor("isFilterable", {
        header: "Lọc",
        cell: (info) => (
          <span className={`badge ${info.getValue() ? "badge-completed" : "badge-cancelled"}`}>
            {info.getValue() ? "Có" : "Không"}
          </span>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Hành động",
        cell: (info) => {
          const attribute = info.row.original;
          return (
            <div className="custom-action-group">
              <button 
                className="action-btn-item" 
                title="Sửa"
                onClick={() => handleEditClick(attribute)}
              >
                <FiEdit size={18} />
              </button>
            </div>
          );
        },
      }),
    ],
    []
  );

  const table = useReactTable({
    data: attributes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div style={{ padding: 20 }}>Đang tải thuộc tính...</div>;
  if (isError) return <div style={{ padding: 20 }}>Lỗi khi tải dữ liệu</div>;

  return (
    <div>
      <div className="filter-bar-wrapper">
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
          <button className="btn-add-new" onClick={() => setIsAddModalOpen(true)}>
            <LuPlus size={20} />
            <span>Thêm thuộc tính</span>
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} style={{ textAlign: "center", padding: "32px 0", color: "#94a3b8" }}>
                    Không tìm thấy thuộc tính nào
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="admin-table-footer" style={{ 
          padding: '16px 24px', 
          borderTop: '1px solid #ebebeb',
          background: '#fcfcfd',
          borderRadius: '0 0 12px 12px'
        }}>
          <div style={{ fontSize: '13.5px', color: '#64748b' }}>
            Tổng cộng <strong>{attributes.length}</strong> thuộc tính
          </div>
        </div>
      </div>

      <AddAttributeModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      <UpdateAttributeModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        attribute={selectedAttribute}
      />
    </div>
  );
}
