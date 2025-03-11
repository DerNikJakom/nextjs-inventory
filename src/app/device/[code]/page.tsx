"use client";

import React, { useState, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardActions,
  Collapse,
  CardContent,
  Typography,
  Button,
  IconButton,
  styled,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/navigation";

interface Props {
  params: { code: string };
}

const ExpandMore = styled(
  (props: {
    expand: boolean;
    children: React.ReactNode;
    onClick: () => void;
  }) => {
    const { expand, children, onClick, ...other } = props;
    return (
      <IconButton {...other} onClick={onClick}>
        {children}
      </IconButton>
    );
  }
)(({ theme, expand }: { theme: any; expand: boolean }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const DeviceDetailPage = ({ params }: Props) => {
  const router = useRouter();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  // Beispielhafte Gerätedaten
  const device = {
    hersteller: "Beispielhersteller",
    modell: "Beispielmodell",
    geraetetyp: "Laptop",
    standort: "Büro 101",
    bemerkungen: "Keine",
    name: "Beispielgerät",
    produktnummer: "123456",
    seriennummer: "ABCDEF123456",
    anschaffungsdatum: "2022-01-01",
    anschaffungskosten: 1000,
    vorname: "Max",
    nachname: "Mustermann",
    mitarbeiter_id: 1,
  };

  const isAssigned = true; // Beispielhaftes Zuweisungsstatus
  const userID = 1; // Beispielhafte Benutzer-ID

  const handleClick = useCallback(() => {
    // Beispielhafte Funktion für das Zuweisen/Entfernen
    console.log("Gerät zugewiesen/entfernt");
  }, []);

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
          textAlign: "center", // Inhalte der Karte zentrieren
        }}
      >
        <CardHeader
          title={`${device.hersteller} ${device.modell}`}
          subheader={
            isAssigned
              ? `genutzt von: ${device.vorname} ${device.nachname}`
              : "nicht in Nutzung"
          }
        />
        <CardActions
          disableSpacing
          sx={{ gap: 1 }} // Abstand zwischen den Buttons
        >
          {isAssigned ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push("/device")}
              >
                Zurück
              </Button>
              {userID === device.mitarbeiter_id && (
                <Button
                  id="removeBtn"
                  onClick={handleClick}
                  color="primary"
                  variant="outlined"
                >
                  Entfernen
                </Button>
              )}
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  console.log("Zurück");
                }}
              >
                Zurück
              </Button>
              <Button
                id="assignBtn"
                onClick={handleClick}
                variant="contained"
                color="primary"
              >
                Buchen
              </Button>
            </>
          )}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography sx={{ textAlign: "left" }} variant="body2">
              <ul>
                <li>
                  <b>Typ:</b> {device.geraetetyp}
                </li>
                <li>
                  <b>Standort:</b>{" "}
                  {device.standort == null
                    ? "nicht zugewiesen"
                    : device.standort}
                </li>
                <li>
                  <b>Bemerkungen:</b>{" "}
                  {device.bemerkungen == null
                    ? "keine Bemerkungen"
                    : device.bemerkungen}
                </li>
                <br />
                <li>
                  <b>Gerätebezeichnung:</b> {device.name}
                </li>
                <li>
                  <b>Produktnummer:</b> {device.produktnummer}
                </li>
                <li>
                  <b>Seriennummer:</b> {device.seriennummer}
                </li>
                <li>
                  <b>Anschaffungsdatum:</b> {device.anschaffungsdatum}
                </li>
                <li>
                  <b>Preis:</b> {device.anschaffungskosten}€
                </li>
              </ul>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default DeviceDetailPage;
