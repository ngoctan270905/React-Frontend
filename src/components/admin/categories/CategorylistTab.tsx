import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnFiltersState,
} from "@tanstack/react-table";

import { LuTrash2 } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import getCategoryList, { type CategoryListItem } from "../../../api/categories";
import FilterCategory from "./FilterCategory";

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

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories", "list"],
    queryFn: () => getCategoryList(1, 100),
  });

  const rawCategories = data?.data.items || [];
  
  const parentOptions = useMemo(() => {
    const parents = rawCategories.filter(c => c.level === 1).map(c => c.name);
    return ["Tất cả", ...parents];
  }, [rawCategories]);

  const hierarchizedData = useMemo(() => {
    return organizeTwoLevels(rawCategories);
  }, [rawCategories]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("image_url", {
        header: "Hình ảnh",
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
        cell: (info) => <code style={{ 
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
        cell: () => (
          <div className="custom-action-group">
            <button className="action-btn-item" title="Sửa">
              <FiEdit size={18} />
            </button>
            <button className="action-btn-item delete-red" title="Xóa">
              <LuTrash2 size={18} />
            </button>
          </div>
        ),
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
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (isLoading) return <div style={{ padding: 20 }}>Đang tải danh mục...</div>;
  if (isError) return <div style={{ padding: 20 }}>Lỗi khi tải dữ liệu</div>;

  const currentParentFilter = (table.getColumn("parent_name")?.getFilterValue() as string) || "Tất cả";
  const currentStatusFilter = (table.getColumn("is_active")?.getFilterValue() as string) || "Tất cả";

  const resetFilters = () => {
    setGlobalFilter("");
    setColumnFilters([]);
  };

  const hasFilter = globalFilter !== "" || columnFilters.length > 0;

  return (
    <div>
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
      </div>
    </div>
  );
}
