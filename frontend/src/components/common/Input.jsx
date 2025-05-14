export default function Input({ label, error, ...props }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className={`w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:ring-2 focus:ring-indigo-500`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}