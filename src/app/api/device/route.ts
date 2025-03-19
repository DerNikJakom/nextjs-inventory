import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Suche nach allen Geräten und schließe die Mitarbeiterdaten ein
    const devices = await prisma.geraete.findMany({
      include: {
        mitarbeiter: {
          select: {
            vorname: true,
            nachname: true,
          },
        },
      },
    });

    // Transformiere die Daten, um die Mitarbeiterinformationen direkt in die Geräte einzubetten
    const response = devices.map((device) => ({
      ...device,
      vorname: device.mitarbeiter?.vorname ?? null,
      nachname: device.mitarbeiter?.nachname ?? null,
      mitarbeiter: undefined, // Entferne das verschachtelte Mitarbeiter-Objekt
    }));

    return NextResponse.json(response);
  } catch (error) {
    console.error("Fehler bei der Datenbankabfrage:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Parse den Request-Body
    const body = await request.json();

    // Füge das neue Gerät in die Datenbank ein
    const newDevice = await prisma.geraete.create({
      data: {
        mitarbeiter_id: 0,
        name: body.name,
        hersteller: body.hersteller,
        modell: body.modell,
        produktnummer: body.produktnummer,
        seriennummer: body.seriennummer,
        code: body.code,
        geraetetyp: body.geraetetyp,
        anschaffungsdatum: body.anschaffungsdatum,
        anschaffungskosten: body.anschaffungskosten,
        standort: body.standort,
        bemerkungen: body.bemerkungen,
      },
    });

    // Rückgabe des neu erstellten Geräts
    return NextResponse.json(newDevice, { status: 201 });
  } catch (error) {
    console.error("Fehler beim Hinzufügen eines neuen Geräts:", error);
    return NextResponse.json(
      { error: "Fehler beim Hinzufügen eines neuen Geräts" },
      { status: 500 }
    );
  }
}
