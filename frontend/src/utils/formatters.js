import { useState, useEffect } from "react";

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
  const colors = {
    pending: "yellow",
    in_progress: "blue",
    completed: "green",
    cancelled: "red",
  };
  return colors[status] || "gray";
};

export const getPriorityColor = (priority) => {
  const colors = {
    high: "red",
    medium: "yellow",
    low: "green",
  };
  return colors[priority] || "gray";
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
