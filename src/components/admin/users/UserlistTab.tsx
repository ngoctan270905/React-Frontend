import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  LuEllipsisVertical,
  LuEye,
  LuPencil,
  LuTrash2,
  LuListFilter,
  LuSearch,
  LuRotateCcw,
} from "react-icons/lu";
import FilterSelect from "./FilterSelect";
import { getUserList, type UserListItem } from "../../../api/users_management";
import { EditUserModal } from "./EditUserModal";
import { DeleteUserModal } from "./DeleteUserModal";

const ROLES = ["Tất cả", "Admin", "User"];
const STATUSES = ["Tất cả", "Active", "Inactive"];
const columnHelper = createColumnHelper<UserListItem>();

// --- Component chính ---
export default function UserlistTab() {
  const [openActionId, setOpenActionId] = useState<string | null>(null); 
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("Tất cả");
  const [status, setStatus] = useState("Tất cả");

  const [selectedUser, setSelectedUser] = useState<UserListItem | null>(null); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Hàm toggle menu hành động
  const toggleActions = (id: string) =>
    setOpenActionId((prev) => (prev === id ? null : id)); 
  
  // Hàm xử lý khi click "Sửa" hoặc "Xóa"
  const handleEditClick = (user: UserListItem) => { 
    setSelectedUser(user); 
    setIsEditModalOpen(true);
    setOpenActionId(null);
  };
  
  // Hàm xử lý khi click "Xóa"
  const handleDeleteClick = (user: UserListItem) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
    setOpenActionId(null);
  };
  
  // Hàm reset filter
  const resetFilters = () => {
    setSearch("");
    setRole("Tất cả");
    setStatus("Tất cả");
  };

  const hasFilter = search !== "" || role !== "Tất cả" || status !== "Tất cả"; 
  
  // Fetch API lấy danh sách user
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUserList(1, 10),
  });
  
  // Dữ liệu user lấy về từ API
  const users: UserListItem[] = data?.data.items || []; 
  
  // Định nghĩa cột cho react-table
  const columns = useMemo(
    () => [ 
      columnHelper.accessor("avatar_url", { 
        header: "Avatar", 
        cell: (info) => ( 
          <div className="admin-avatar" style={{ width: 32, height: 32 }}>
            <img
              src={info.getValue() || "/default-avatar.png"} // in}
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
        cell: (info) => (
          <span className="cat-label">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("is_active", {
        header: "Trạng thái",
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
        cell: (info) => {
          const val = info.getValue();
          return val ? new Date(val).toLocaleDateString() : "—"; 
        },
      }),
      columnHelper.display({ 
        id: "actions",
        header: "Hành động",
        cell: (info) => {
          const user = info.row.original;
          return (
            <div style={{ position: "relative" }}>
              <div
                className="action-dots"
                onClick={() => toggleActions(user.id)}
              >
                <LuEllipsisVertical />
              </div>
              {openActionId === user.id && (
                <div className="action-menu-dropdown">
                  <button className="action-item">
                    <span className="icon"><LuEye /></span> Xem chi tiết
                  </button>
                  <button
                    className="action-item"
                    onClick={() => handleEditClick(user)}
                  >
                    <span className="icon"><LuPencil /></span> Sửa
                  </button>
                  <button
                    className="action-item delete"
                    onClick={() => handleDeleteClick(user)}
                  >
                    <span className="icon"><LuTrash2 /></span> Xóa
                  </button>
                </div>
              )}
            </div>
          );
        },
      }),
    ],
    [openActionId]
  );
 
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading)
    return <div style={{ padding: 20 }}>Đang tải danh sách user...</div>;
  if (isError)
    return <div style={{ padding: 20 }}>Lỗi khi tải dữ liệu</div>;

  return (
    <div>
      {/* --- Filter Bar --- */}
      <div className="filter-bar-wrapper">
        <div className="filter-bar">
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-bar__divider" />
          <FilterSelect
            label="Chức vụ"
            value={role}
            options={ROLES}
            onChange={setRole}
          />
          <div className="filter-bar__divider" />
          <FilterSelect
            label="Trạng thái"
            value={status}
            options={STATUSES}
            onChange={setStatus}
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
      </div>

      {/* --- Table --- */}
      <div className="card">
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
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