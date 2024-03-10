import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { createPatient, getAllPatients, getPatient, updatePatient } from './routes/patient';
import {
  createExamination,
  createFollowUp,
  createMedicalPrescription,
  createMedicalRecord,
  discharge,
  endMedicineMedicalPrescription,
  getAllFollowUps,
  getExamination,
  getMedicalRecord,
  insertExaminationResults,
} from './routes/medicalRecord';

const app = fastify();
app.register(fastifyCors, {
  origin: ['http://localhost:5173', 'http://localhost:4173', '*'],
  methods: ['POST', 'PUT', 'GET', 'DELETE'],
  credentials: true,
});

// PATIENTS FUNCTIONS
app.register(createPatient);
app.register(updatePatient);
app.register(getPatient);
app.register(getAllPatients);

// MEDICAL REPORTS FUNCTIONS
app.register(createMedicalRecord);
app.register(getMedicalRecord);
app.register(createFollowUp);
app.register(getAllFollowUps);
app.register(createMedicalPrescription);
app.register(endMedicineMedicalPrescription);
app.register(createExamination);
app.register(getExamination);
app.register(insertExaminationResults);
app.register(discharge);

app.listen({ port: process.env.PORT ? Number(process.env.PORT) : 3333 }).then(() => {
  console.log('Server running in port: ', process.env.PORT ? Number(process.env.PORT) : 3333);
});
