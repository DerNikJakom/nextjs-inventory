import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    if (!code) {
      return NextResponse.json("Code fehlt", { status: 400 });
    }

    // Suche nach dem Gerät anhand des Hex-Codes und schließe die Mitarbeiterdaten ein
    const device = await prisma.geraete.findUnique({
      where: { code },
      include: {
        mitarbeiter: {
          select: {
            vorname: true,
            nachname: true,
          },
        },
      },
    });

    if (!device) {
      return NextResponse.json({ error: "Device not found" }, { status: 404 });
    }

    // Transformiere die Daten, um nur die Attribute vorname und nachname einzuschließen
    const response = {
      ...device,
      vorname: device.mitarbeiter?.vorname,
      nachname: device.mitarbeiter?.nachname,
      mitarbeiter: undefined,
    };

    // Entferne das verschachtelte Mitarbeiter-Objekt
    delete response.mitarbeiter;

    console.log(response);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Fehler bei der Datenbankabfrage:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
