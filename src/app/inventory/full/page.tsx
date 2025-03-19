"use client";
// TODO DB-Query für Vorname und Nachname des Benutzers
import React, { useState, useMemo, useEffect, FC } from "react";
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

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("/api/device");
        const data = await response.json();
        console.log("Gerätedaten:", data);
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
          <CardActions sx={{ justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "primary.main" }}
              onClick={() => router.push("/")}
            >
              Zurück
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FullInventory;
