import { MenuItem, Select, Box } from "@mui/material";
import { useCatContext } from "../../context/CatContext";

export const CatOriginFilter = () => {
  const { origins, selectedOrigin, setSelectedOrigin } = useCatContext();

  return (
    <Box sx={{ minWidth: 180 }}>
      <Select
        fullWidth
        value={selectedOrigin}
        onChange={(e) => setSelectedOrigin(e.target.value)}
        displayEmpty
      >
        <MenuItem value="All">All Origins</MenuItem>
        {origins.map((origin) => (
          <MenuItem key={origin} value={origin}>
            {origin}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
