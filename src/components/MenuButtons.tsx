"use client";

import React from "react";
import { Stack, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function MenuButtons() {
  const router = useRouter();

  return (
    <Stack direction="column" gap={1}>
      <Button
        id="deviceInfoBtn"
        variant="contained"
        sx={{
          backgroundColor: "background.paper",
          color: "text.primary",
        }}
        onClick={() => router.push("/device")}
      >
        Geräteinformation einsehen
      </Button>
      <Button
        id="inventoryBtn"
        variant="contained"
        sx={{
          backgroundColor: "background.paper",
          color: "text.primary",
        }}
        onClick={() => router.push("/inventory")}
      >
        Inventar verwalten
      </Button>
      <Button
        id="logOutBtn"
        variant="contained"
        sx={{ backgroundColor: "primary.main" }}
      >
        Ausloggen
      </Button>
    </Stack>
  );
}
