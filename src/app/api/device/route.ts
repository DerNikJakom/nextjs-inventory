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
