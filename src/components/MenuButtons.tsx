"use client";

import React, { useState, useCallback } from "react";
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function MenuButtons() {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false); // Zustand für den Dialog

  const handleLogOutClick = useCallback(() => {
    setOpenDialog(true); // Öffne den Dialog
  }, []);

  const handleDialogClose = useCallback(() => {
    setOpenDialog(false); // Schließe den Dialog
  }, []);

  const handleConfirmLogOut = useCallback(() => {
    setOpenDialog(false); // Schließe den Dialog
    console.log("Benutzer wurde ausgeloggt");
    // Logik für das Ausloggen implementieren
    router.push("/login"); // Weiterleitung zur Login-Seite
  }, [router]);

  return (
    <>
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
          onClick={handleLogOutClick} // Öffne den Dialog
        >
          Ausloggen
        </Button>
      </Stack>

      {/* Dialog für die Logout-Bestätigung */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Abmelden</DialogTitle>
        <DialogContent>
          <Typography>Möchten Sie sich wirklich abmelden?</Typography>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center", // Zentriert die Buttons horizontal
          }}
        >
          <Button
            onClick={handleDialogClose}
            color="primary"
            variant="outlined"
          >
            Abbrechen
          </Button>
          <Button
            onClick={handleConfirmLogOut}
            color="primary"
            variant="contained"
          >
            Abmelden
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
