"use client";

import React, { useState, useCallback, useEffect, use } from "react";
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
  Theme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/navigation";

const ExpandMore = styled(
  (props: {
    expand: boolean;
    children: React.ReactNode;
    onClick: () => void;
  }) => {
    const { children, onClick, ...other } = props;
    return (
      <IconButton {...other} onClick={onClick}>
        {children}
      </IconButton>
    );
  }
)(({ theme, expand }: { theme: Theme; expand: boolean }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const DeviceDetailPage = ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const router = useRouter();
  const { code } = use(params);

  const userID = 2; // Beispielhafte Benutzer-ID

  const [isAssigned, setAssigned] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [device, setDevice] = useState({
    mitarbeiter_id: 0,
    vorname: "",
    nachname: "",
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
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/device/${code}`);
        const data = await response.json();
        setDevice(data);
        if (data.vorname) {
          // Überprüfe, ob das Gerät einem Mitarbeiter zugewiesen ist
          setAssigned(true);
        } else {
          setAssigned(false);
        }
      } catch (err) {
        console.error("Fehler bei der Überprüfung des Geräts:", err);
      }
    };
    fetchData();
  }, [code]);

  const handleExpandClick = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

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
          width: 400,
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

              <Button
                id="removeBtn"
                onClick={handleClick}
                color="primary"
                variant="outlined"
              >
                Entfernen
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => router.push("/device")}
              >
                Zurück
              </Button>
              <Button
                id="assignMeBtn"
                onClick={handleClick}
                variant="contained"
                color="primary"
              >
                Buchen
              </Button>
              <Button
                id="assignThemBtn"
                onClick={handleClick}
                variant="contained"
                color="primary"
              >
                Zuweisen
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
            <Typography
              component="div"
              sx={{ textAlign: "left" }}
              variant="body2"
            >
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
