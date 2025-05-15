import {
  ClockIcon,
  PlayIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export const STATUS_CONFIG = {
  pending: {
    value: "pending",
    label: "Bekleyen",
    icon: ClockIcon,
    colors: {
      light: {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        border: "border-yellow-200",
      },
      dark: {
        bg: "dark:bg-yellow-900/30",
        text: "dark:text-yellow-200",
        border: "dark:border-yellow-800",
      },
    },
  },
  in_progress: {
    value: "in_progress",
    label: "Devam Eden",
    icon: PlayIcon,
    colors: {
      light: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
      },
      dark: {
        bg: "dark:bg-blue-900/30",
        text: "dark:text-blue-200",
        border: "dark:border-blue-800",
      },
    },
  },
  completed: {
    value: "completed",
    label: "Tamamlandı",
    icon: CheckCircleIcon,
    colors: {
      light: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
      },
      dark: {
        bg: "dark:bg-green-900/30",
        text: "dark:text-green-200",
        border: "dark:border-green-800",
      },
    },
  },
  cancelled: {
    value: "cancelled",
    label: "İptal",
    icon: XCircleIcon,
    colors: {
      light: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
      },
      dark: {
        bg: "dark:bg-red-900/30",
        text: "dark:text-red-200",
        border: "dark:border-red-800",
      },
    },
  },
};

export const PRIORITY_CONFIG = {
  high: {
    value: "high",
    label: "Yüksek",
    colors: {
      light: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
      },
      dark: {
        bg: "dark:bg-red-900/30",
        text: "dark:text-red-200",
        border: "dark:border-red-800",
      },
    },
  },
  medium: {
    value: "medium",
    label: "Orta",
    colors: {
      light: {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        border: "border-yellow-200",
      },
      dark: {
        bg: "dark:bg-yellow-900/30",
        text: "dark:text-yellow-200",
        border: "dark:border-yellow-800",
      },
    },
  },
  low: {
    value: "low",
    label: "Düşük",
    colors: {
      light: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
      },
      dark: {
        bg: "dark:bg-green-900/30",
        text: "dark:text-green-200",
        border: "dark:border-green-800",
      },
    },
  },
};