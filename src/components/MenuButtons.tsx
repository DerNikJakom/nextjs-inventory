"use client";

import React from "react";
import { Stack, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

export default function MenuButtons() {
  const theme = useTheme(); // theme laden
  const router = useRouter();

  return (
    <Stack direction="column" gap={1}>
      <Button
        id="deviceInfoBtn"
        variant="contained"
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
        onClick={() => router.push("/device")}
      >
        Geräteinformation einsehen
      </Button>
      <Button
        id="inventoryBtn"
        variant="contained"
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
        onClick={() => router.push("/inventory")}
      >
        Inventar verwalten
      </Button>
      <Button
        id="logOutBtn"
        variant="contained"
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        Ausloggen
      </Button>
    </Stack>
  );
}
