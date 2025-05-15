import { motion } from "framer-motion";

const getColorClasses = (color) => {
  return {
    border: `border-${color}-500`,
    text: `text-${color}-600 dark:text-${color}-400`,
    bg: `bg-${color}-100 dark:bg-${color}-900`,
  };
};
export default function StatisticCard({ title, count, color, icon, onClick }) {
  const colors = getColorClasses(color);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 border-l-4 cursor-pointer ${colors.border}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className={`text-3xl font-bold ${colors.text}`}>{count}</p>
        </div>
        <div className={`p-3 rounded-full ${colors.bg} ${colors.text}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
