import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  // Überprüfen, ob der Code genau 6 Zeichen lang ist und nur Hexadezimalzeichen enthält -> bereits im Frontend
  // const codePattern = /^[0-9a-fA-F]{6}$/;

  // if (!codePattern.test(params.code)) {
  //   return NextResponse.json({ error: "Invalid hex code" }, { status: 400 });
  // }

  // Suche nach dem Gerät anhand des Hex-Codes
  const device = await prisma.geraete.findUnique({
    where: { code: params.code },
  });

  if (!device) {
    return NextResponse.json({ error: "Device not found" }, { status: 404 });
  }

  return NextResponse.json(device);
}
