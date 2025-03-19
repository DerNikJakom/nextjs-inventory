"use client";

import React, { useState, useCallback, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
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
  const { code } = React.use(params);

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

  const [openDialog, setOpenDialog] = useState(false); // Zustand für das Dialogfenster
  const [inputName, setInputName] = useState(""); // Zustand für den eingegebenen Namen

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/device/${code}`);
        const data = await response.json();
        setDevice(data);
        if (data.vorname) {
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

  const handleAssignThemClick = useCallback(() => {
    setOpenDialog(true); // Öffne das Dialogfenster
  }, []);

  const handleDialogClose = useCallback(() => {
    setOpenDialog(false); // Schließe das Dialogfenster
  }, []);

  const handleDialogSubmit = useCallback(() => {
    console.log("Eingegebener Name:", inputName);
    // Hier kannst du die Logik für die Zuweisung implementieren
    setOpenDialog(false); // Schließe das Dialogfenster
  }, [inputName]);

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
          textAlign: "center",
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
        <CardActions disableSpacing sx={{ gap: 1 }}>
          {isAssigned ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.back()}
              >
                Zurück
              </Button>

              <Button
                id="removeBtn"
                onClick={() => console.log("Entfernen gedrückt")}
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
                onClick={() => router.back()}
              >
                Zurück
              </Button>
              <Button
                id="assignMeBtn"
                onClick={() => console.log("Buchen gedrückt")}
                variant="contained"
                color="primary"
              >
                Buchen
              </Button>
              <Button
                id="assignThemBtn"
                onClick={handleAssignThemClick} // Öffne das Dialogfenster
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

      {/* Dialog für die Eingabe des Namens */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Gerät einem Mitarbeiter zuweisen</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name des Mitarbeiters"
            type="text"
            fullWidth
            variant="outlined"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleDialogClose}
            color="primary"
          >
            Abbrechen
          </Button>
          <Button
            onClick={handleDialogSubmit}
            color="primary"
            variant="contained"
          >
            Zuweisen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeviceDetailPage;
