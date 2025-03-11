"use client";

import React, { useState, useCallback, useMemo } from "react";
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
*/

export default function DeviceInformation() {
  const router = useRouter();

  const [input, setInput] = useState<string>("");

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
    },
    []
  );

  const isHexCode = useMemo(() => {
    const regex = /^[0-9A-F]{6}$/i;
    return (code: string) => regex.test(code);
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isHexCode(input)) {
        router.push(`/device/${input}`);
      }
    },
    [input, isHexCode, router]
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
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
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
            sx={{ backgroundColor: "primary.main", ml: 2 }}
            onClick={() => router.push(`/device/${input}`)}
            disabled={!isHexCode(input)}
          >
            Bestätigen
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
