import { motion } from "framer-motion";

export default function StatisticCard({ title, count, color, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white dark:bg-gray-800 shadow rounded-lg p-6 border-l-4 border-${color}-500`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p
            className={`text-3xl font-bold text-${color}-600 dark:text-${color}-400`}
          >
            {count}
          </p>
        </div>
        <div
          className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900 text-${color}-600 dark:text-${color}-400`}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
