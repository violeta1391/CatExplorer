import { useState } from "react";
import { Box, Collapse, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { TableComponent } from "../TableComponent/TableComponent";
import { useCatContext } from "../../context/CatContext";

export const CatTable = () => {
  const [showPanel, setShowPanel] = useState(false);
  const { cats, setSelectedOrigin, setSortOrder, loading, error } = useCatContext();

  interface Column<T> {
    key: keyof T;
    label: string;
  }
  interface Cat {
    id: string;
    name: string;
    origin: string;
    temperament: string;
    life_span: string;
  }
  const columns: Column<Cat>[] = [
    { key: "name", label: "Name" },
    { key: "origin", label: "Origin" },
    { key: "temperament", label: "Temperament" },
    { key: "life_span", label: "Life Span" },
  ];  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (cats.length === 0) return <p>No data</p>;

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="left" mb={2} mt={2}>
        <Typography variant="h6" marginRight={1}>More Info </Typography>
        <IconButton onClick={() => setShowPanel(!showPanel)} size="small">
          {showPanel ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Collapse in={showPanel}>
        <TableComponent
          style={{}}
          data={cats}
          columns={columns}
          filterColumn="origin"
          onFilterChange={(val) => setSelectedOrigin(val === "All" ? "" : val)}
          onSortChange={setSortOrder}
        />
      </Collapse>
    </Box>
  );
};
