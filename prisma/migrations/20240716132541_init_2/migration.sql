/*
  Warnings:

  - A unique constraint covering the columns `[college]` on the table `Councelors` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patient" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "refNumber" TEXT,
    "description" TEXT NOT NULL,
    "residence" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "deparment" TEXT NOT NULL,
    "councelor" TEXT NOT NULL,
    CONSTRAINT "Patient_councelor_fkey" FOREIGN KEY ("councelor") REFERENCES "Councelors" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Patient" ("college", "councelor", "deparment", "description", "id", "name", "phone", "refNumber", "residence") SELECT "college", "councelor", "deparment", "description", "id", "name", "phone", "refNumber", "residence" FROM "Patient";
DROP TABLE "Patient";
ALTER TABLE "new_Patient" RENAME TO "Patient";
CREATE UNIQUE INDEX "Patient_id_key" ON "Patient"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Councelors_college_key" ON "Councelors"("college");
