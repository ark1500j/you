-- CreateTable
CREATE TABLE "Councelors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "college" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "refNumber" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "residence" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "deparment" TEXT NOT NULL,
    "councelor" TEXT NOT NULL,
    CONSTRAINT "Patient_councelor_fkey" FOREIGN KEY ("councelor") REFERENCES "Councelors" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Councelors_email_key" ON "Councelors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_id_key" ON "Patient"("id");
