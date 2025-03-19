"use client";
// TODO DB-Query für Vorname und Nachname des Benutzers
import React, { useState, useMemo, useEffect, FC, useCallback } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface Column {
  id: "hersteller" | "modell" | "name" | "vorname" | "nachname" | "code";
  label: string;
  minWidth?: number;
  align?: "right";
}

interface Row {
  hersteller: string;
  modell: string;
  name: string;
  vorname: string;
  nachname: string;
  code: string;
}

const FullInventory: FC = () => {
  const router = useRouter();

  const [rows, setRows] = useState<Row[]>([]);
  const [openDialog, setOpenDialog] = useState(false); // Zustand für den Dialog
  const [newDevice, setNewDevice] = useState<{
    name: string;
    hersteller: string;
    modell: string;
    produktnummer: string;
    seriennummer: string;
    code: string;
    geraetetyp: string;
    anschaffungsdatum: string;
    anschaffungskosten: string;
    standort: string;
    bemerkungen: string;
  }>({
    name: "",
    hersteller: "",
    modell: "",
    produktnummer: "",
    seriennummer: "",
    code: "",
    geraetetyp: "",
    anschaffungsdatum: "",
    anschaffungskosten: "",
    standort: "",
    bemerkungen: "",
  });

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("/api/device");
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Gerätedaten:", error);
      }
    };

    fetchDevices();
  }, []);

  const columns: Column[] = useMemo(
    () => [
      { id: "hersteller", label: "Hersteller" },
      { id: "modell", label: "Modell" },
      { id: "name", label: "Name" },
      { id: "vorname", label: "Vorname" },
      { id: "nachname", label: "Nachname" },
      { id: "code", label: "Code" },
    ],
    []
  );

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true); // Öffne den Dialog
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false); // Schließe den Dialog
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewDevice((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSaveDevice = useCallback(async () => {
    try {
      const response = await fetch("/api/device", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDevice),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setRows((prev) => [...prev, data]); // Füge das neue Gerät zur Tabelle hinzu
        setOpenDialog(false); // Schließe den Dialog
        setNewDevice({
          name: "",
          hersteller: "",
          modell: "",
          produktnummer: "",
          seriennummer: "",
          code: "",
          geraetetyp: "",
          anschaffungsdatum: "",
          anschaffungskosten: "",
          standort: "",
          bemerkungen: "",
        });
      } else {
        console.error("Fehler beim Speichern des Geräts:", response.statusText);
      }
    } catch (error) {
      console.error("Fehler beim Speichern des Geräts:", error);
    }
  }, [newDevice]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ borderRadius: 3, backgroundColor: "#F2F7F8", width: "80%" }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Komplettes Inventar
          </Typography>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{
                          minWidth: column.minWidth,
                          color: "#FFFFFF",
                          backgroundColor: "#7F0037",
                          fontWeight: "bold",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell
                      key="actions"
                      align="center"
                      sx={{
                        width: 10,
                        color: "#FFFFFF",
                        backgroundColor: "#7F0037",
                        fontWeight: "bold",
                        justifyContent: "center",
                      }}
                    >
                      Aktionen
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => router.push(`/device/${row.code}`)}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <CardActions sx={{ justifyContent: "center", mt: 2, gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: 100 }}
              onClick={() => router.push("/")}
            >
              Zurück
            </Button>
            <Button
              variant="outlined"
              sx={{ width: 100 }}
              color="primary"
              onClick={handleOpenDialog} // Öffne den Dialog
            >
              Neu
            </Button>
          </CardActions>
        </CardContent>
      </Card>

      {/* Dialog für neues Gerät */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Neues Gerät hinzufügen</DialogTitle>
        <DialogContent>
          {Object.keys(newDevice).map((key) => (
            <TextField
              key={key}
              margin="dense"
              label={key}
              name={key}
              fullWidth
              variant="outlined"
              value={newDevice[key as keyof typeof newDevice]}
              onChange={handleInputChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="outlined"
          >
            Abbrechen
          </Button>
          <Button
            onClick={handleSaveDevice}
            color="primary"
            variant="contained"
          >
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FullInventory;
