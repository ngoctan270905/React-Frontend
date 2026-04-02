import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

import {
  LuTrash2,
  LuPlus,
  LuEye,
  LuChevronLeft,
  LuChevronRight,
  LuSettings2,
  LuCheck,
  LuArrowUp,
  LuArrowDown,
  LuArrowUpDown,
} from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import getCategoryList, { type CategoryListItem } from "../../../api/categories";
import FilterCategory from "./FilterCategory";
import AddCategoryModal from "./AddCategoryModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import { DeleteCategoryModal } from "./DeleteCategoryModal";

const columnHelper = createColumnHelper<CategoryListItem>();

const STATUS_OPTIONS = ["Tất cả", "Active", "Inactive"];

function organizeTwoLevels(categories: CategoryListItem[]): CategoryListItem[] {
  const result: CategoryListItem[] = [];
  const parents = categories.filter(c => c.level === 1).sort((a, b) => a.sort_order - b.sort_order);
  const children = categories.filter(c => c.level === 2);

  parents.forEach(parent => {
    result.push(parent);
    const subCats = children
      .filter(child => child.parent_id === parent.id)
      .sort((a, b) => a.sort_order - b.sort_order);
    result.push(...subCats);
  });

  return result;
}

export default function CategorylistTab() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState<CategoryListItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories", "list", pagination.pageIndex, pagination.pageSize],
    queryFn: () => getCategoryList(pagination.pageIndex + 1, pagination.pageSize),
    placeholderData: (prev) => prev,
  });

  const rawCategories = data?.data.items || [];
  const totalCount = data?.data.total_count || 0;
  const pageCount = Math.ceil(totalCount / pagination.pageSize);
  
  const parentOptions = useMemo(() => {
    const parents = rawCategories.filter(c => c.level === 1).map(c => c.name);
    return ["Tất cả", ...parents];
  }, [rawCategories]);

  const hierarchizedData = useMemo(() => {
    return organizeTwoLevels(rawCategories);
  }, [rawCategories]);

  const handleEditClick = (category: CategoryListItem) => {
    setSelectedCategory(category);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (category: CategoryListItem) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };
  
  // Định nghĩa các cột cho react-table
  const columns = useMemo(
    () => [
      columnHelper.accessor("image_url", {
        header: "Hình ảnh",
        enableSorting: false,
        enableColumnFilter: false,
        cell: (info) => (
          <div className="admin-avatar" style={{ width: 40, height: 40, borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border)" }}>
            <img
              src={info.getValue() || "/default-category.png"} 
              alt={info.row.original.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ),
      }),
      columnHelper.accessor("name", {
        header: "Tên danh mục",
        cell: (info) => {
          const { level } = info.row.original;
          const indent = level === 2 ? 32 : 0;
          
          return (
            <div style={{ 
              paddingLeft: `${indent}px`,
              color: level === 1 ? "var(--text-main)" : "#64748b",
              fontWeight: level === 1 ? 600 : 400,
              fontSize: "14px",
              display: "flex",
              alignItems: "center"
            }}>
              {info.getValue()}
            </div>
          );
        },
      }),
      columnHelper.accessor("parent_id", {
        id: "parent_name",
        header: "Danh mục cha",
        filterFn: (row, _columnId, filterValue) => {
          if (filterValue === "Tất cả") return true;
          const parentId = row.original.parent_id;
          if (!parentId) return filterValue === "Không có";
          const parent = rawCategories.find(c => c.id === parentId);
          return parent?.name === filterValue;
        },
        cell: (info) => { 
          const { level, parent_id } = info.row.original;
          if (level === 1 || !parent_id) {
            return <span style={{ color: "#94a3b8", fontSize: "13px" }}>Không có</span>;
          }
          const parent = rawCategories.find(c => c.id === parent_id);
          return (
            <span style={{ 
              color: "var(--purple)", 
              fontSize: "13px", 
              fontWeight: 500,
              background: "var(--purple-pale)",
              padding: "2px 8px",
              borderRadius: "4px"
            }}>
              {parent ? parent.name : "N/A"}
            </span>
          );
        },
      }),
      columnHelper.accessor("slug", {
        header: "Slug",
        cell: (info) => <code style={{ // cell 
          fontSize: "12px", 
          color: "#64748b",
          background: "#f8f9fa",
          padding: "2px 6px",
          borderRadius: "4px",
          border: "1px solid #eee"
        }}>{info.getValue()}</code>,
      }),
      columnHelper.accessor("is_active", {
        header: "Trạng thái",
        filterFn: (row, columnId, filterValue) => {
          if (filterValue === "Tất cả") return true;
          const status = row.getValue(columnId);
          return filterValue === "Active" ? status === true : status === false;
        },
        cell: (info) => (
          <span className={`badge ${info.getValue() ? "badge-completed" : "badge-cancelled"}`}>
            {info.getValue() ? "Active" : "Inactive"}
          </span>
        ),
      }),
      columnHelper.accessor("sort_order", {
        header: "Thứ tự",
        cell: (info) => <span style={{ color: "#64748b" }}>{info.getValue()}</span>,
      }),
      columnHelper.display({
        id: "actions",
        header: "Hành động",
        cell: (info) => {
          const category = info.row.original;
          return (
            <div className="custom-action-group">
              <button className="action-btn-item" title="Xem chi tiết">
                <LuEye size={18} />
              </button>
              <button 
                className="action-btn-item" 
                title="Sửa"
                onClick={() => handleEditClick(category)}
              >
                <FiEdit size={18} />
              </button>
              <button 
                className="action-btn-item delete-red" 
                title="Xóa"
                onClick={() => handleDeleteClick(category)}
              >
                <LuTrash2 size={18} />
              </button>
            </div>
          );
        },
      }),
    ],
    [rawCategories]
  );

  const table = useReactTable({
    data: hierarchizedData,
    columns,
    state: {
      globalFilter,
      columnFilters,
      sorting,
      pagination,
      columnVisibility,
    },
    manualPagination: true, 
    pageCount: pageCount, 
    onPaginationChange: setPagination, 
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) return <div style={{ padding: 20 }}>Đang tải danh mục...</div>;
  if (isError) return <div style={{ padding: 20 }}>Lỗi khi tải dữ liệu</div>;

  const currentParentFilter = (table.getColumn("parent_name")?.getFilterValue() as string) || "Tất cả";
  const currentStatusFilter = (table.getColumn("is_active")?.getFilterValue() as string) || "Tất cả";

  const resetFilters = () => {
    setGlobalFilter("");
    setColumnFilters([]);
    setSorting([]);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    setColumnVisibility({});
  };

  const hasFilter = globalFilter !== "" || columnFilters.length > 0 || sorting.length > 0;

  return (
    <div>
      <div className="filter-bar-wrapper">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <FilterCategory
              globalFilter={globalFilter}
              onGlobalFilterChange={setGlobalFilter}
              parentFilter={currentParentFilter}
              parentOptions={parentOptions}
              onParentChange={(val) => table.getColumn("parent_name")?.setFilterValue(val)}
              statusFilter={currentStatusFilter}
              statusOptions={STATUS_OPTIONS}
              onStatusChange={(val) => table.getColumn("is_active")?.setFilterValue(val)}
              onReset={resetFilters}
              hasFilter={hasFilter}
            />

            {/* --- Column Visibility Toggle --- */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowColumnDropdown(!showColumnDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0 16px',
                  height: '46px',
                  background: '#fff',
                  border: '1px solid #e8ecf0',
                  borderRadius: '10px',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  color: '#475569',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}
              >
                <LuSettings2 size={16} />
                Cột
              </button>

              {showColumnDropdown && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                  zIndex: 1000,
                  padding: '8px',
                  minWidth: '180px'
                }}>
                  <div style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Hiển thị cột
                  </div>
                  {table.getAllLeafColumns().map(column => {
                    if (column.id === 'actions') return null;
                    return (
                      <div 
                        key={column.id}
                        onClick={() => column.toggleVisibility()}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 12px',
                          fontSize: '13.5px',
                          color: column.getIsVisible() ? '#0f172a' : '#94a3b8',
                          cursor: 'pointer',
                          borderRadius: '6px',
                          transition: 'background 0.15s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          border: '1.5px solid',
                          borderColor: column.getIsVisible() ? '#7367f0' : '#cbd5e1',
                          background: column.getIsVisible() ? '#7367f0' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff'
                        }}>
                          {column.getIsVisible() && <LuCheck size={12} strokeWidth={3} />}
                        </div>
                        <span style={{ flex: 1 }}>
                          {typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <button className="btn-add-new" onClick={() => setIsAddModalOpen(true)}>
            <LuPlus size={20} />
            <span>Thêm danh mục</span>
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
                    <th 
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default', userSelect: 'none' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                            {{
                              asc: <LuArrowUp />,
                              desc: <LuArrowDown />,
                            }[header.column.getIsSorted() as string] ?? <LuArrowUpDown />}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} style={{ textAlign: "center", padding: "32px 0", color: "#94a3b8" }}>
                    Không tìm thấy danh mục nào
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

        {/* --- Pagination Footer --- */}
        <div className="admin-table-footer" style={{ 
          padding: '16px 24px', 
          borderTop: '1px solid #ebebeb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#fcfcfd',
          borderRadius: '0 0 12px 12px'
        }}>
          <div style={{ fontSize: '13.5px', color: '#64748b' }}>
            Tổng cộng <strong>{totalCount}</strong> danh mục
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                background: table.getCanPreviousPage() ? '#fff' : '#f1f5f9',
                cursor: table.getCanPreviousPage() ? 'pointer' : 'not-allowed',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <LuChevronLeft size={18} />
            </button>
            
            <div style={{ fontSize: '13.5px', color: '#475569', fontWeight: 500 }}>
              Trang {pagination.pageIndex + 1} / {table.getPageCount() || 1}
            </div>
            
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                background: table.getCanNextPage() ? '#fff' : '#f1f5f9',
                cursor: table.getCanNextPage() ? 'pointer' : 'not-allowed',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <LuChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <AddCategoryModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        categories={rawCategories}
      />

      <UpdateCategoryModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        categories={rawCategories}
        category={selectedCategory}
      />

      <DeleteCategoryModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        category={selectedCategory}
      />
    </div>
  );
}
