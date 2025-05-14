export default function Button({ children, onClick, variant = "primary", disabled, className = "" }) {
  const baseStyle = "px-4 py-2 rounded-md font-medium transition-colors duration-200";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`text-sm ${baseStyle} ${variants[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}