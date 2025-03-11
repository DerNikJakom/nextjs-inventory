"use client";

import React, { useState, useMemo } from "react";
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
  id: "name" | "hersteller" | "modell" | "code";
  label: string;
  minWidth?: number;
  align?: "right";
}

interface Row {
  name: string;
  hersteller: string;
  modell: string;
  code: string;
}

const FullInventory: React.FC = () => {
  const router = useRouter();

  const [rows, setRows] = useState<Row[]>([
    {
      name: "Gerät 1",
      hersteller: "Hersteller 1",
      modell: "Modell 1",
      code: "123123",
    },
    {
      name: "Gerät 2",
      hersteller: "Hersteller 2",
      modell: "Modell 2",
      code: "456456",
    },
    {
      name: "Gerät 3",
      hersteller: "Hersteller 3",
      modell: "Modell 3",
      code: "789789",
    },
    {
      name: "Gerät 4",
      hersteller: "Hersteller 4",
      modell: "Modell 4",
      code: "101112",
    },
    {
      name: "Gerät 5",
      hersteller: "Hersteller 5",
      modell: "Modell 5",
      code: "131415",
    },
    {
      name: "Gerät 6",
      hersteller: "Hersteller 6",
      modell: "Modell 6",
      code: "161718",
    },
    {
      name: "Gerät 7",
      hersteller: "Hersteller 7",
      modell: "Modell 7",
      code: "192021",
    },
    {
      name: "Gerät 8",
      hersteller: "Hersteller 8",
      modell: "Modell 8",
      code: "222324",
    },
    {
      name: "Gerät 9",
      hersteller: "Hersteller 9",
      modell: "Modell 9",
      code: "252627",
    },
    {
      name: "Gerät 10",
      hersteller: "Hersteller 10",
      modell: "Modell 10",
      code: "282930",
    },
    {
      name: "Gerät 11",
      hersteller: "Hersteller 11",
      modell: "Modell 11",
      code: "313233",
    },
    {
      name: "Gerät 12",
      hersteller: "Hersteller 12",
      modell: "Modell 12",
      code: "343536",
    },
    {
      name: "Gerät 13",
      hersteller: "Hersteller 13",
      modell: "Modell 13",
      code: "373839",
    },
    {
      name: "Gerät 14",
      hersteller: "Hersteller 14",
      modell: "Modell 14",
      code: "404142",
    },
    {
      name: "Gerät 15",
      hersteller: "Hersteller 15",
      modell: "Modell 15",
      code: "434445",
    },
    {
      name: "Gerät 16",
      hersteller: "Hersteller 16",
      modell: "Modell 16",
      code: "464748",
    },
    {
      name: "Gerät 17",
      hersteller: "Hersteller 17",
      modell: "Modell 17",
      code: "495051",
    },
    {
      name: "Gerät 18",
      hersteller: "Hersteller 18",
      modell: "Modell 18",
      code: "525354",
    },
    {
      name: "Gerät 19",
      hersteller: "Hersteller 19",
      modell: "Modell 19",
      code: "555657",
    },
    {
      name: "Gerät 20",
      hersteller: "Hersteller 20",
      modell: "Modell 20",
      code: "585960",
    },
  ]);

  const columns: Column[] = useMemo(
    () => [
      { id: "name", label: "Name" },
      { id: "hersteller", label: "Hersteller" },
      { id: "modell", label: "Modell" },
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
