import { Box, Typography, Card, CardContent, CardActions } from "@mui/material";
import MenuButtons from "@/components/MenuButtons";

export default function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          borderRadius: 3,
          justifySelf: "center",
          backgroundColor: "background.default",
          width: "50%",
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h2" color="primary" gutterBottom>
            Hallo [name]!
          </Typography>
          <Typography variant="h5" color="secondary">
            Was möchtest du tun?
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: "center" }}>
          <MenuButtons />
        </CardActions>
      </Card>
    </Box>
  );
}
