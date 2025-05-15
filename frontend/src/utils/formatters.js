import { useState, useEffect } from "react";
import { PRIORITY_CONFIG, STATUS_CONFIG } from "../constants/statusTypes";

export const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export const getStatusColor = (status) => {
  const config = STATUS_CONFIG[status];
  return config?.colors?.light?.text?.replace('text-', '')?.replace('-700', '') || 'gray';
};

export const getPriorityColor = (priority) => {
  const config = PRIORITY_CONFIG[priority];
  return config?.colors?.light?.text?.replace('text-', '')?.replace('-700', '') || 'gray';
};

export const getStatusStyles = (status) => {
  const config = STATUS_CONFIG[status];
  return {
    icon: config.icon,
    label: config.label,
    className: `${config.colors.light.bg} ${config.colors.light.text} ${config.colors.light.border} 
                ${config.colors.dark.bg} ${config.colors.dark.text} ${config.colors.dark.border}`,
  };
};

export const getPriorityStyles = (priority) => {
  const config = PRIORITY_CONFIG[priority];
  return {
    label: config.label,
    className: `${config.colors.light.bg} ${config.colors.light.text} ${config.colors.light.border}
                ${config.colors.dark.bg} ${config.colors.dark.text} ${config.colors.dark.border}`,
  };
};

export const isOverdue = (dueDate) => {
  return new Date(dueDate) < new Date();
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDatePicker = (date) => {
  return new Date(date).toISOString().split("T")[0];
};
