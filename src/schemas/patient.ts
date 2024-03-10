import z from 'zod';

export const createPatientSchema = z.object({
  name: z.string(),
  birthDate: z.string(),
  address: z.object({
    postalCode: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.optional(z.string()),
  }),
});

export const updatePatientSchema = z.object({
  name: z.string(),
  birthDate: z.string(),
  address: z.object({
    id: z.string(),
    postalCode: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.optional(z.string()),
  }),
});
