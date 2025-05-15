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
      className={`px-2 py-2 border-3 bg-white dark:bg-gray-700 dark:text-white border-gray-800 dark:border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 text-sm shadow-md cursor-pointer w-full md:w-max ${className}`}
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
