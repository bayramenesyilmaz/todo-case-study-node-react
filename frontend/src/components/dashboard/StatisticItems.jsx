import { motion } from "framer-motion";
import {
  ClockIcon,
  PlayIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon as OverdueIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import StatisticCard from "./StatisticCard";
import { getStatusColor } from "../../utils/formatters";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setFilters } from "../../store/slices/todoSlice";

export default function StatisticItems({ stats }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStatusClick = (status) => {
    if (status === "all") {
      dispatch(setFilters({ status: "" }));
    } else if (status === "due_date") {
      dispatch(setFilters({ sort: "due_date", order: "asc" }));
    } else {
      dispatch(setFilters({ status }));
    }
    navigate("/todos");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <StatisticCard
            title="Bekleyen"
            count={stats.pending}
            color="yellow"
            icon={<ClockIcon className="w-6 h-6" />}
            onClick={() => handleStatusClick("pending")}
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <StatisticCard
            title="Devam Eden"
            count={stats.in_progress}
            color={getStatusColor("in_progress")}
            icon={<PlayIcon className="w-6 h-6" />}
            onClick={() => handleStatusClick("in_progress")}
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <StatisticCard
            title="Tamamlanan"
            count={stats.completed}
            color={getStatusColor("completed")}
            icon={<CheckCircleIcon className="w-6 h-6" />}
            onClick={() => handleStatusClick("completed")}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <StatisticCard
            title="İptal Edilen"
            count={stats.cancelled}
            color={getStatusColor("cancelled")}
            icon={<XCircleIcon className="w-6 h-6" />}
            onClick={() => handleStatusClick("cancelled")}
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <StatisticCard
            title="Süresi Geçen"
            count={stats.overdue}
            color="red"
            icon={<OverdueIcon className="w-6 h-6" />}
            onClick={() => handleStatusClick("due_date")}
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <StatisticCard
            title="Toplam"
            count={stats.total}
            color="indigo"
            icon={<DocumentDuplicateIcon className="w-6 h-6" />}
            onClick={() => handleStatusClick("all")}
          />
        </motion.div>
      </div>
    </div>
  );
}
