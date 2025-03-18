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
  Typography,
} from "@mui/material";

export default function DeviceInformation() {
  const router = useRouter();

  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
      if (event.target.value === "") {
        setError(null);
      }
    },
    []
  );

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      event.target.select();
    },
    []
  );

  const isHexCode = useMemo(() => {
    const regex = /^[0-9A-F]{6}$/i;
    return (code: string) => regex.test(code);
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isHexCode(input)) {
        try {
          const response = await fetch(`/api/device/${input.toUpperCase()}`);

          const data = await response.json();

          if (!data.error) {
            router.push(`/device/${input}`);
          } else {
            setError("Gerät nicht gefunden");
          }
        } catch (error) {
          setError("Fehler bei der Überprüfung des Geräts:", error);
        }
      } else {
        setError("Ungültiger Code");
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
              onFocus={handleFocus}
              value={input}
              id="hex-input"
              label="Inventarcode"
              sx={{ color: "primary.main" }}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
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
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Button
              id="submit-code"
              variant="contained"
              sx={{ backgroundColor: "primary.main", ml: 2 }}
              type="submit"
              disabled={!isHexCode(input)}
            >
              Bestätigen
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}
