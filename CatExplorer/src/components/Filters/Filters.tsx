import React from "react";
import { Box } from "@mui/material";
import { useCatContext } from "../../context/CatContext";
import { CatOriginFilter } from "../CatOriginFilter/CatOriginFilter";
import { CatSearchBar } from "../CatSearchBar/CatSearchBar";

const Filters: React.FC = () => {
  const { searchTerm, setSearchTerm } = useCatContext();

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={2}
      justifyContent="center"
      mb={3}
    >
      <CatSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <CatOriginFilter />
    </Box>
  );
};

export default Filters;
