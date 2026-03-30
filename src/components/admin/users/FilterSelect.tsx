import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

type FilterSelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
};

export default function FilterSelect({label, value, options, onChange}: FilterSelectProps) {

  const [open, setOpen] = useState(false);

  const display = value === "Tất cả" ? label : value;

  return (
    <div className="fl-select">
      <button
        className={`fl-select__btn ${
          value !== "Tất cả" ? "fl-select__btn--active" : ""
        }`}
        onClick={() => setOpen(!open)}
        type="button"
      >
        {display}
        <LuChevronDown
          className={`fl-select__chevron ${
            open ? "fl-select__chevron--open" : ""
          }`}
        />
      </button>

      {open && (
        <ul className="fl-select__menu">
          {options.map((opt) => (
            <li
              key={opt}
              className={`fl-select__item ${
                opt === value ? "fl-select__item--selected" : ""
              }`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}