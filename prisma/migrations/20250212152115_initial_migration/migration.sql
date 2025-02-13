-- CreateTable
CREATE TABLE "geraete" (
    "mitarbeiter_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "hersteller" VARCHAR(50),
    "modell" VARCHAR(50),
    "produktnummer" VARCHAR(50),
    "seriennummer" VARCHAR(50),
    "code" CHAR(6) NOT NULL,
    "geraetetyp" VARCHAR(50),
    "anschaffungsdatum" CHAR(10),
    "anschaffungskosten" VARCHAR(10),
    "standort" VARCHAR(30),
    "bemerkungen" VARCHAR(100),

    CONSTRAINT "geraete_pk" PRIMARY KEY ("mitarbeiter_id","code")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" INTEGER,
    "timestamp" VARCHAR(50),
    "executedUser" INTEGER,
    "affectedDevice" INTEGER,
    "oldUser" INTEGER,
    "newUser" INTEGER,
    "message" VARCHAR(100)
);

-- CreateTable
CREATE TABLE "mitarbeiter" (
    "id" SERIAL NOT NULL,
    "vorname" VARCHAR(50),
    "nachname" VARCHAR(50),
    "email" VARCHAR(50),
    "passwort" VARCHAR(100),
    "salt" VARCHAR(100),
    "rolle" VARCHAR(50),

    CONSTRAINT "mitarbeiter_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "geraete" ADD CONSTRAINT "geraete_mitarbeiter_id_fk" FOREIGN KEY ("mitarbeiter_id") REFERENCES "mitarbeiter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
