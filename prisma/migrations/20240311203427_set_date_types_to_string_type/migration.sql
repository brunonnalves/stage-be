-- AlterTable
ALTER TABLE "Examination" ALTER COLUMN "requestDate" SET DATA TYPE TEXT,
ALTER COLUMN "resultDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "FollowUp" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "MedicalPrescription" ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "birthDate" SET DATA TYPE TEXT;
