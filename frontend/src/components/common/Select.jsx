import React from "react";

export default function Select({
  value,
  onChange,
  options,
  placeholder,
  className,
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`px-3 py-2 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 w-full md:w-max ${className}`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
