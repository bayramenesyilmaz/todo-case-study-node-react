import { motion } from "framer-motion";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import Header from "../components/dashboard/Header";
import StatisticItems from "../components/dashboard/StatisticItems";
import { useTodoStats } from "../hooks/todos/useTodoStats";
import DueSoonList from "../components/dashboard/DueSoonList";

export default function Dashboard() {
  const { error, loading, stats } = useTodoStats();

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

      <StatisticItems stats={stats} />

      <DueSoonList />
    </motion.div>
  );
}
