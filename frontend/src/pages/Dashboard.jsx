import { motion } from "framer-motion";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import Header from "../components/dashboard/Header";
import StatisticItems from "../components/dashboard/StatisticItems";
import { useTodoStats } from "../hooks/todos/useTodoStats";
import DueSoonList from "../components/dashboard/DueSoonList";
import PriorityStats from "../components/dashboard/PriorityStats";

export default function Dashboard() {
  const { error, loading, stats, priorityStats } = useTodoStats();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Header />

      <div className="space-y-8">
        {/* Durum İstatistikleri */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Durum İstatistikleri
          </h3>

          <StatisticItems stats={stats} />
        </div>

        {/* Öncelik İstatistikleri */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Öncelik İstatistikleri
          </h3>
          <PriorityStats stats={priorityStats} />
        </div>
      </div>

      <DueSoonList />
    </motion.div>
  );
}
