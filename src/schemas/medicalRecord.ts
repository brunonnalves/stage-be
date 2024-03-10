import z from 'zod';

export const updateMedicalRecordSchema = z.object({
  name: z.string(),
  birthDate: z.string(),
  address: z.object({
    postalCode: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.optional(z.string()),
  }),
});

export const createFollowUpSchema = z.object({
  medicalRecordId: z.string(),
  date: z.string(),
  comment: z.string(),
});

export const createMedicalPrescriptionSchema = z.array(
  z.object({
    medicalRecordId: z.string(),
    medicine: z.string(),
    dose: z.string(),
    startDate: z.string(),
  })
);

export const endMedicineMedicalPrescriptionSchema = z.object({
  id: z.string(),
  endDate: z.string(),
});

export const createExaminationSchema = z.array(
  z.object({
    medicalRecordId: z.string(),
    name: z.string(),
    requestDate: z.string(),
  })
);

export const insertExaminationResultsSchema = z.object({
  id: z.string(),
  resultDate: z.string(),
  result: z.string(),
  clinicalReport: z.string(),
});
