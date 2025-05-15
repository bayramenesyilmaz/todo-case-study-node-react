import { Spinner } from "./Spinner";

export default function Button({ 
  children, 
  variant = "primary", 
  size = "md",
  fullWidth = false,
  loading = false,
  icon,
  className = "",
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed gap-2 border-3 shadow-md cursor-pointer";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-600 dark:text-gray-300 dark:hover:bg-gray-700",
    link: "bg-transparent text-indigo-600 hover:text-indigo-700 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300",
    outline: "border-2 border-current text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-gray-800"
  };

  const sizes = {
    xs: "px-2 py-1 text-xs rounded",
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
    icon: "p-2 rounded-full"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`
        ${baseStyles}
        ${variants[variant]} 
        ${sizes[size]}
        ${widthClass}
        ${className}
      `}
    >
      {loading ? (
        <>
          <Spinner size="sm" />
          <span>İşleniyor...</span>
        </>
      ) : (
        <>
          {icon && <span className="w-5 h-5">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}