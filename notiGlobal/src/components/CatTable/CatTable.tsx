import { useApiRequest } from "../../hooks/useApiRequest";
import { TableComponent } from "../TableComponent/TableComponent";

interface Cat {
  id: string;
  name: string;
  origin: string;
  temperament: string;
  life_span: string;
}

export const CatTable = () => {
  const { data, loading, error } = useApiRequest<Cat[]>(
    "https://api.thecatapi.com/v1/breeds"
  );

  const columns: { key: keyof Cat; label: string }[] = [
    { key: "name", label: "Name" },
    { key: "origin", label: "Origin" },
    { key: "temperament", label: "Temperament" },
    { key: "life_span", label: "Life Span" },
  ];

  if (loading || !data) {
    return <p>Loading...</p>;
  }  
  if (error) return <p>Error: {error.message}</p>;
  if (!data || data.length === 0) return <p>No data</p>;  

  return <TableComponent style={{ width: 800 }} data={data} columns={columns} filterColumn="origin" />;
};
