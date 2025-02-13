import { Box, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary", p: 3 }}>
      <Typography variant="h4" color="primary">
        Willkommen!
      </Typography>
      <Typography variant="body1" color="secondary">
        Dies ist eine Beispielseite mit globalem Theme.
      </Typography>
    </Box>
  );
}
