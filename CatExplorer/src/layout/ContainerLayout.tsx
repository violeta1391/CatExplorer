import { Container, Paper, Box } from "@mui/material";
import { ReactNode } from "react";

export const ContainerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={4} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
        <Box>{children}</Box>
      </Paper>
    </Container>
  );
};
