import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import {
  LuEllipsisVertical,
  LuEye,
  LuPencil,
  LuTrash2,
  LuListFilter,
  LuSearch,
  LuRotateCcw
} from "react-icons/lu";
import FilterSelect from "./FilterSelect";
import { getUserList, type UserListItem } from "../../../api/users_management";
import { EditUserModal } from "./EditUserModal";
import { DeleteUserModal } from "./DeleteUserModal";

const ROLES = ["Tất cả", "Admin", "User"];
const STATUSES = ["Tất cả", "Active", "Inactive"];

export default function UserlistTab() {
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("Tất cả");
  const [status, setStatus] = useState("Tất cả");

  // State for Modals
  const [selectedUser, setSelectedUser] = useState<UserListItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleActions = (id: string) =>
    setOpenActionId(openActionId === id ? null : id);

  const handleEditClick = (user: UserListItem) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
    setOpenActionId(null);
  };

  const handleDeleteClick = (user: UserListItem) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
    setOpenActionId(null);
  };

  const resetFilters = () => { setSearch(""); setRole("Tất cả"); setStatus("Tất cả"); };
  const hasFilter = search !== "" || role !== "Tất cả" || status !== "Tất cả";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUserList(1, 10),
  });

  const users: UserListItem[] = data?.data.items || [];

  if (isLoading) {
    return <div style={{ padding: 20 }}>Đang tải danh sách user...</div>;
  }

  if (isError) {
    return <div style={{ padding: 20 }}>Lỗi khi tải dữ liệu</div>;
  }

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

          <FilterSelect label="Chức vụ" value={role} options={ROLES} onChange={setRole} />

          <div className="filter-bar__divider" />

          <FilterSelect label="Trạng thái" value={status} options={STATUSES} onChange={setStatus} />

          {hasFilter && (
            <>
              <div className="filter-bar__divider" />
              <button className="filter-bar__reset" onClick={resetFilters} type="button">
                <LuRotateCcw />
                Reset Filter
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="card">
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Tên</th>
                <th>Email</th>
                <th>SDT</th>
                <th>Role</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", color: "#94a3b8", padding: "32px 0" }}>
                    Không tìm thấy kết quả phù hợp
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="admin-avatar" style={{ width: 32, height: 32 }}>
                        <img src={user.avatar_url || "/default-avatar.png"} alt={user.fullname} />
                      </div>
                    </td>
                    <td><span className="product-name">{user.fullname}</span></td>
                    <td>{user.email}</td>
                    <td>{user.phone_number}</td>
                    <td><span className="cat-label">{user.role}</span></td>
                    <td>
                      <span
                        className={`badge ${user.is_active ? "badge-completed" : "badge-cancelled"
                          }`}
                      >
                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    <td style={{ position: "relative" }}>
                      <div className="action-dots" onClick={() => toggleActions(user.id)}>
                        <LuEllipsisVertical />
                      </div>
                      {openActionId === user.id && (
                        <div className="action-menu-dropdown">
                          <button className="action-item">
                            <span className="icon"><LuEye /></span> Xem chi tiết
                          </button>
                          <button className="action-item" onClick={() => handleEditClick(user)}>
                            <span className="icon"><LuPencil /></span> Sửa
                          </button>
                          <button className="action-item delete" onClick={() => handleDeleteClick(user)}>
                            <span className="icon"><LuTrash2 /></span> Xóa
                          </button>
                        </div>
                      )}
                    </td>
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