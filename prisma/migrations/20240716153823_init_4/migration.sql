/*
  Warnings:

  - The primary key for the `Councelors` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Councelors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "college" TEXT NOT NULL
);
INSERT INTO "new_Councelors" ("college", "email", "id", "name", "phone") SELECT "college", "email", "id", "name", "phone" FROM "Councelors";
DROP TABLE "Councelors";
ALTER TABLE "new_Councelors" RENAME TO "Councelors";
CREATE UNIQUE INDEX "Councelors_email_key" ON "Councelors"("email");
CREATE UNIQUE INDEX "Councelors_college_key" ON "Councelors"("college");
CREATE TABLE "new_Patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
INSERT INTO "new_Patient" ("college", "councelor", "department", "description", "id", "name", "phone", "refNumber", "residence") SELECT "college", "councelor", "department", "description", "id", "name", "phone", "refNumber", "residence" FROM "Patient";
DROP TABLE "Patient";
ALTER TABLE "new_Patient" RENAME TO "Patient";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
