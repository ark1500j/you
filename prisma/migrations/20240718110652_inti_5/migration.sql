-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "refNumber" TEXT,
    "description" TEXT NOT NULL,
    "residence" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "department" TEXT,
    "councelor" TEXT NOT NULL,
    CONSTRAINT "Patient_councelor_fkey" FOREIGN KEY ("councelor") REFERENCES "Councelors" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Patient" ("college", "councelor", "department", "description", "id", "name", "phone", "refNumber", "residence") SELECT "college", "councelor", "department", "description", "id", "name", "phone", "refNumber", "residence" FROM "Patient";
DROP TABLE "Patient";
ALTER TABLE "new_Patient" RENAME TO "Patient";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
