/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `geraete` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "geraete_code_key" ON "geraete"("code");
