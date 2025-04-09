import { TextField, Box } from "@mui/material";

type Props = {
  searchTerm: string;
  onSearchChange: (val: string) => void;
};

export const CatSearchBar = ({ searchTerm, onSearchChange }: Props) => (
  <Box sx={{ width: 300 }}>
    <TextField
      fullWidth
      label="Search by name"
      variant="outlined"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  </Box>
);