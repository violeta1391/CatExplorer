import { createContext, useContext, useState, ReactNode } from "react";
import { useApiRequest } from "../hooks/useApiRequest";

interface Cat {
  id: string;
  name: string;
  origin: string;
  temperament: string;
  life_span: string;
}

interface CatContextType {
  cats: Cat[];
  selectedOrigin: string;
  setSelectedOrigin: (origin: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  loading: boolean;
  error: Error | null;
}

const CatContext = createContext<CatContextType | undefined>(undefined);

export const CatProvider = ({ children }: { children: ReactNode }) => {
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data, loading, error } = useApiRequest<Cat[]>("https://api.thecatapi.com/v1/breeds");
  const cats = (data ?? []).flat();

  return (
    <CatContext.Provider
      value={{ cats, selectedOrigin, setSelectedOrigin, sortOrder, setSortOrder, loading, error }}
    >
      {children}
    </CatContext.Provider>
  );
};

export const useCatContext = () => {
  const context = useContext(CatContext);
  if (!context) throw new Error("useCatContext must be used within a CatProvider");
  return context;
};
