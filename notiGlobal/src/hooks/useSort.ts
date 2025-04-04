import { useState, useMemo } from "react";

export const useSort = <T>(data: T[], sortKey: keyof T | null) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [key, setKey] = useState<keyof T | null>(sortKey);

  const sortedData = useMemo(() => {
    if (!key) return data;

    return [...data].sort((a, b) => {
      const aVal = String(a[key]).toLowerCase();
      const bVal = String(b[key]).toLowerCase();
      if (aVal < bVal) return order === "asc" ? -1 : 1;
      if (aVal > bVal) return order === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, key, order]);

  const toggleSort = (newKey: keyof T) => {
    if (key === newKey) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setKey(newKey);
      setOrder("asc");
    }
  };

  return { sortedData, toggleSort, order, key };
};
