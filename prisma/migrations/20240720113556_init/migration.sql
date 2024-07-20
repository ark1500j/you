-- CreateTable
CREATE TABLE "Councelors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "college" TEXT NOT NULL,

    CONSTRAINT "Councelors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "refNumber" TEXT,
    "description" TEXT NOT NULL,
    "residence" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "department" TEXT,
    "councelor" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Councelors_email_key" ON "Councelors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Councelors_college_key" ON "Councelors"("college");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_councelor_fkey" FOREIGN KEY ("councelor") REFERENCES "Councelors"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
