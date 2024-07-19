/*
  Warnings:

  - You are about to drop the column `deparment` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `department` to the `Patient` table without a default value. This is not possible if the table is not empty.

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
    "department" TEXT NOT NULL,
    "councelor" TEXT NOT NULL,
    CONSTRAINT "Patient_councelor_fkey" FOREIGN KEY ("councelor") REFERENCES "Councelors" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Patient" ("college", "councelor", "description", "id", "name", "phone", "refNumber", "residence") SELECT "college", "councelor", "description", "id", "name", "phone", "refNumber", "residence" FROM "Patient";
DROP TABLE "Patient";
ALTER TABLE "new_Patient" RENAME TO "Patient";
CREATE UNIQUE INDEX "Patient_id_key" ON "Patient"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
