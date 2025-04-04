import { useMemo, useState } from "react";

export const useColumnFilter = <T,>(data: T[], column?: keyof T) => {
  const [filterValue, setFilterValue] = useState("All");

  const uniqueValues = useMemo(() => {
    if (!column) return [];
    const values = new Set<string>();
    data.forEach((item) => {
      const val = item[column];
      if (typeof val === "string") values.add(val);
    });
    return Array.from(values).sort();
  }, [data, column]);

  const filteredData = useMemo(() => {
    if (!column || filterValue === "All") return data;
    return data.filter((item) => item[column] === filterValue);
  }, [data, column, filterValue]);

  return {
    filterValue,
    setFilterValue,
    uniqueValues,
    filteredData,
  };
};
