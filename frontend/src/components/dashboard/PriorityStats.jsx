import { motion } from "framer-motion";
import {
  ChevronUpIcon,
  MinusIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import StatisticCard from "./StatisticCard";
import { getPriorityColor } from "../../utils/formatters";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setFilters } from "../../store/slices/todoSlice";

export default function PriorityStats({ stats }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePriorityClick = (priority) => {
    dispatch(setFilters({ status: "", priority }));
    navigate("/todos");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <StatisticCard
          title="Yüksek Öncelikli"
          count={stats.high}
          color={getPriorityColor("high")}
          icon={<ChevronUpIcon className="w-6 h-6" />}
          onClick={() => handlePriorityClick("high")}
        />
      </motion.div>

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <StatisticCard
          title="Orta Öncelikli"
          count={stats.medium}
          color={getPriorityColor("medium")}
          icon={<MinusIcon className="w-6 h-6" />}
          onClick={() => handlePriorityClick("medium")}
        />
      </motion.div>

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <StatisticCard
          title="Düşük Öncelikli"
          count={stats.low}
          color={getPriorityColor("low")}
          icon={<ChevronDownIcon className="w-6 h-6" />}
          onClick={() => handlePriorityClick("low")}
        />
      </motion.div>
    </div>
  );
}
