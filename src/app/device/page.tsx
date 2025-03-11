"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Box,
  TextField,
} from "@mui/material";

/* // TODO //
- DB-Abfrage mit prisma
- Card zentrieren
- Bestätigen mit code Umleitung auf /device/[code]
*/

export default function DeviceInformation() {
  const router = useRouter();

  const [input, setInput] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const isHexCode = (code: string) => {
    const regex = /^[0-9A-F]{6}$/i;
    return regex.test(code);
  };

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
          backgroundColor: "#F2F7F8",
          width: 600,
        }}
      >
        <CardHeader
          title="Gerätecode eingeben"
          subheader="6-stelliger Inventarcode"
          sx={{
            textAlign: "center",
            color: "primary.main",
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              error={!isHexCode(input) && input.length > 0}
              helperText={
                !isHexCode(input) && input.length > 0 && "kein gültiger Code"
              }
              required
              autoFocus
              onChange={handleChange}
              value={input}
              id="hex-input"
              label="Inventarcode"
              sx={{ color: "primary.main" }}
            />
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            sx={{ color: "primary.main" }}
            onClick={() => router.push("/")}
          >
            Zurück
          </Button>
          <Button
            id="submit-code"
            variant="contained"
            sx={{ backgroundColor: "primary.main" }}
            onClick={() => router.push("/device/123")}
          >
            Bestätigen
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
