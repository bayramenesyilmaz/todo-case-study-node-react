export default function FormSelect({
  label,
  value,
  onChange,
  options,
  error,
  icon: Icon,
  className,
  ...props
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
        )}
        <select
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 ${
            Icon ? "pl-10" : ""
          } bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
          rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? "border-red-500" : ""} ${className}`}
          {...props}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}