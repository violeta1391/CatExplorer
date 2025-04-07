import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Cat } from "../../types/Cat";

type CatInfoModalProps = {
  open: boolean;
  onClose: () => void;
  cat: (Cat & { temperament: string; imageUrl: string }) | null;
};

export const CatInfoModal = ({ open, onClose, cat }: CatInfoModalProps) => {
  if (!cat) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 0,
        }}
      >
        {cat.name}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          component="img"
          src={cat.imageUrl}
          alt={cat.name}
          sx={{
            width: "100%",
            maxHeight: 400,
            objectFit: "contain",
            borderRadius: 2,
            mb: 2,
          }}
        />
        <Typography variant="subtitle1">
          <strong>Origin:</strong> {cat.origin}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          <strong>Temperament:</strong> {cat.temperament}
        </Typography>
        {cat.description && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            {cat.description}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};
