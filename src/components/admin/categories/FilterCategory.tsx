import { LuListFilter, LuSearch, LuRotateCcw } from "react-icons/lu";
import FilterSelect from "../users/FilterSelect";

interface FilterCategoryProps {
  globalFilter: string;
  onGlobalFilterChange: (val: string) => void;
  parentFilter: string;
  parentOptions: string[];
  onParentChange: (val: string) => void;
  statusFilter: string;
  statusOptions: string[];
  onStatusChange: (val: string) => void;
  onReset: () => void;
  hasFilter: boolean;
}

// 
export default function FilterCategory({
  globalFilter,
  onGlobalFilterChange,
  parentFilter,
  parentOptions,
  onParentChange,
  statusFilter,
  statusOptions,
  onStatusChange,
  onReset,
  hasFilter,
}: FilterCategoryProps) {
  return (
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
            placeholder="Tìm danh mục..."
            value={globalFilter}
            onChange={(e) => onGlobalFilterChange(e.target.value)}
          />
        </div>
        <div className="filter-bar__divider" />
        <FilterSelect
          label="Danh mục cha"
          value={parentFilter}
          options={parentOptions}
          onChange={onParentChange}
        />
        <div className="filter-bar__divider" />
        <FilterSelect
          label="Trạng thái"
          value={statusFilter}
          options={statusOptions}
          onChange={onStatusChange}
        />
        {hasFilter && (
          <>
            <div className="filter-bar__divider" />
            <button
              className="filter-bar__reset"
              onClick={onReset}
              type="button"
            >
              <LuRotateCcw />
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
}
