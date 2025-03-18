"use client";

import React from "react";
import { Stack, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function MenuButtons() {
  const router = useRouter();

  return (
    <Stack direction="column" gap={1} sx={{ padding: 2, width: "75%" }}>
      <Button
        id="deviceInfoBtn"
        variant="contained"
        sx={{
          backgroundColor: "background.paper",
          color: "text.primary",
        }}
        onClick={() => router.push("/device")}
      >
        Geräteinformationen
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
        Mein Inventar
      </Button>
      <Button
        id="fullInventoryBtn"
        variant="contained"
        sx={{
          backgroundColor: "background.paper",
          color: "text.primary",
        }}
        onClick={() => router.push("/inventory/full")}
      >
        Komplettes Inventar
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
