import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import { useColumnFilter } from "../hooks/useColumnFilter";
import { Cat } from "../types/Cat";

interface CatContextType {
  cats: Cat[];
  filteredCats: Cat[];
  origins: string[];
  selectedOrigin: string;
  setSelectedOrigin: (origin: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  loading: boolean;
  error: Error | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const CatContext = createContext<CatContextType | undefined>(undefined);

export const CatProvider = ({ children }: { children: ReactNode }) => {
  const { data, loading, error } = useApiRequest<Cat[]>(
    "https://api.thecatapi.com/v1/breeds"
  );

  const allCats = useMemo(() => (data ?? []).flat(), [data]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    filterValue: selectedOrigin,
    setFilterValue: setSelectedOrigin,
    uniqueValues: origins,
    filteredData: filteredCats,
  } = useColumnFilter(allCats, "origin");

  return (
    <CatContext.Provider
      value={{
        cats: allCats,
        filteredCats,
        origins,
        selectedOrigin,
        setSelectedOrigin,
        sortOrder,
        setSortOrder,
        loading,
        error,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </CatContext.Provider>
  );
};

export const useCatContext = () => {
  const context = useContext(CatContext);
  if (!context) {
    throw new Error("useCatContext must be used within a CatProvider");
  }
  return context;
};
