"use client";

import { Box, Typography, Card, CardContent, CardActions } from "@mui/material";
import MenuButtons from "@/components/MenuButtons";
import { useState, useEffect } from "react";

// TODO: [name] dynamisch durch den Namen des Benutzers ersetzen
export default function HomePage() {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        // Beispiel: Benutzername aus einer API oder einem Kontext laden
        const userName = "Benutzer"; // Ersetzen Sie dies durch den tatsächlichen Benutzernamen
        setName(userName);
      } catch (error) {
        console.error("Fehler beim Laden des Benutzernamens:", error);
      }
    };

    fetchUserName();
  }, []);

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
          width: 600,
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h3" color="text.primary" gutterBottom>
            Hallo {name}!
          </Typography>
          <Typography variant="h5" color="text.secondary">
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
