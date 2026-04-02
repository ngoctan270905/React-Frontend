import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type SortingState,
  type ColumnFiltersState,
  type PaginationState,
  type VisibilityState,
} from "@tanstack/react-table";

import {
  LuTrash2,
  LuListFilter,
  LuSearch,
  LuRotateCcw,
  LuArrowUp,
  LuArrowDown,
  LuArrowUpDown,
  LuChevronLeft,
  LuChevronRight,
  LuSettings2,
  LuCheck,
} from "react-icons/lu";

import { FiEdit } from "react-icons/fi";

import FilterSelect from "./FilterSelect";
import { getUserList, type UserListItem } from "../../../api/users_management";
import { EditUserModal } from "./EditUserModal";
import { DeleteUserModal } from "./DeleteUserModal";

const ROLES = ["Tất cả", "admin", "user"];
const STATUSES = ["Tất cả", "Active", "Inactive"];
const columnHelper = createColumnHelper<UserListItem>();

// --- Component chính ---
export default function UserlistTab() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);

  const [selectedUser, setSelectedUser] = useState<UserListItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Hàm xử lý khi click nút Edit
  const handleEditClick = (user: UserListItem) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // Hàm xử lý khi click nút Delete
  const handleDeleteClick = (user: UserListItem) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // Hàm reset filter
  const resetFilters = () => {
    setGlobalFilter("");
    setColumnFilters([]);
    setSorting([]);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    setColumnVisibility({});
  };

  // Kiểm tra nếu có bất kỳ filter nào đang được áp dụng để hiển thị nút reset
  const hasFilter = globalFilter !== "" || columnFilters.length > 0 || sorting.length > 0;

  // Fetch API lấy danh sách user
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", "list", pagination.pageIndex, pagination.pageSize],
    queryFn: () => getUserList(pagination.pageIndex + 1, pagination.pageSize),
    placeholderData: (previousData) => previousData,
  });

  const users: UserListItem[] = data?.data.items || [];
  const totalCount = data?.data.total_count || 0;
  const pageCount = Math.ceil(totalCount / pagination.pageSize);

  const columns = useMemo(
    () => [
      columnHelper.accessor("avatar_url", {
        header: "Avatar",
        enableSorting: false,
        enableColumnFilter: false,
        cell: (info) => (
          <div className="admin-avatar" style={{ width: 32, height: 32 }}>
            <img
              src={info.getValue() || "/default-avatar.png"}
              alt={info.row.original.fullname}
            />
          </div>
        ),
      }),
      columnHelper.accessor("fullname", {
        header: "Tên",
        cell: (info) => (
          <span className="product-name">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("email", { header: "Email" }),
      columnHelper.accessor("phone_number", { header: "SDT" }),
      columnHelper.accessor("role", {
        header: "Role",
        filterFn: (row, columnId, filterValue) => {
          if (filterValue === "Tất cả") return true;
          return row.getValue(columnId) === filterValue;
        },
        cell: (info) => (
          <span className="cat-label">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("is_active", {
        header: "Trạng thái",
        filterFn: (row, columnId, filterValue) => {
          if (filterValue === "Tất cả") return true;
          const status = row.getValue(columnId);
          return filterValue === "Active" ? status === true : status === false;
        },
        cell: (info) => (
          <span
            className={`badge ${info.getValue() ? "badge-completed" : "badge-cancelled"
              }`}
          >
            {info.getValue() ? "Active" : "Inactive"}
          </span>
        ),
      }),
      columnHelper.accessor("created_at", {
        header: "Ngày tạo",
        enableColumnFilter: false,
        cell: (info) => {
          const val = info.getValue();
          return val ? new Date(val).toLocaleDateString() : "—";
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "Hành động",
        enableSorting: false,
        enableColumnFilter: false,
        cell: (info) => {
          const user = info.row.original;
          return (
            <div className="custom-action-group">
              <button
                className="action-btn-item"
                onClick={() => handleEditClick(user)}
                title="Sửa"
              >
                <FiEdit size={18} />
              </button>

              <button
                className="action-btn-item delete-red"
                onClick={() => handleDeleteClick(user)}
                title="Xóa"
              >
                <LuTrash2 size={18} />
              </button>
            </div>
          );
        },
      }),
    ],
    []
  );

  // Khởi tạo bảng với react-table
  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      pagination,
      columnVisibility,
    },
    manualPagination: true,
    pageCount: pageCount,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,

    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (isLoading)
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Đang tải danh sách user...</p>
        <span>Vui lòng chờ một chút</span>
      </div>
    );

  if (isError)
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>Lỗi khi tải dữ liệu</h3>
        <p>Đã xảy ra lỗi trong quá trình tải danh sách user.<br />Vui lòng thử lại sau.</p>
      </div>
    );

  const currentRoleFilter = (table.getColumn("role")?.getFilterValue() as string) || "Tất cả"; 
  const currentStatusFilter = (table.getColumn("is_active")?.getFilterValue() as string) || "Tất cả";

  return (
    <div>
      {/* --- Filter Bar --- */}
      <div className="filter-bar-wrapper">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
          <div className="filter-bar" style={{ marginBottom: 0 }}>
            <div className="filter-bar__label">
              <LuListFilter className="filter-bar__icon" />
              <span>Filter By</span>
            </div>
            <div className="filter-bar__divider" />
            <div className="filter-bar__search">
              <LuSearch className="filter-bar__search-icon" />
              <input
                className="filter-bar__search-input"
                placeholder="Tìm kiếm..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>
            <div className="filter-bar__divider" />
            <FilterSelect
              label="Chức vụ"
              value={currentRoleFilter}
              options={ROLES}
              onChange={(val) => table.getColumn("role")?.setFilterValue(val)}
            />
            <div className="filter-bar__divider" />
            <FilterSelect
              label="Trạng thái"
              value={currentStatusFilter}
              options={STATUSES}
              onChange={(val) => table.getColumn("is_active")?.setFilterValue(val)}
            />
            {hasFilter && (
              <>
                <div className="filter-bar__divider" />
                <button
                  className="filter-bar__reset"
                  onClick={resetFilters}
                  type="button"
                >
                  <LuRotateCcw />
                  Reset Filter
                </button>
              </>
            )}
          </div>

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
              Columns
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
                  Toggle Columns
                </div>
                {table.getAllLeafColumns().map(column => {
                  // Không cho phép ẩn cột "Hành động"
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
                        {typeof column.columnDef.header === 'string'
                          ? column.columnDef.header
                          : column.id}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Table --- */}
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
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                  <td
                    colSpan={table.getVisibleFlatColumns().length} // Dùng số lượng cột thực tế đang hiện
                    style={{
                      textAlign: "center",
                      color: "#94a3b8",
                      padding: "32px 0",
                    }}
                  >
                    Không tìm thấy kết quả phù hợp
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
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
            Tổng cộng <strong>{totalCount}</strong> người dùng
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
              Trang {pagination.pageIndex + 1} / {table.getPageCount()}
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

      {/* --- Modals --- */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
      />
      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
}
