import { FastifyInstance } from 'fastify';
import { MedicalRecordController } from '../controllers/MedicalRecordController';

export async function createMedicalRecord(app: FastifyInstance) {
  app.post('/medical-records/:patientId', MedicalRecordController.register);
}

export async function getMedicalRecord(app: FastifyInstance) {
  app.get('/medical-records/:id', MedicalRecordController.get);
}

export async function createFollowUp(app: FastifyInstance) {
  app.post('/medical-records/follow-ups', MedicalRecordController.createFollowUp);
}

export async function getAllFollowUps(app: FastifyInstance) {
  app.get('/medical-records/:id/follow-ups', MedicalRecordController.getAllFollowUps);
}

export async function createMedicalPrescription(app: FastifyInstance) {
  app.post(
    '/medical-records/medical-prescriptions',
    MedicalRecordController.createMedicalPrescription
  );
}

export async function endMedicineMedicalPrescription(app: FastifyInstance) {
  app.put(
    '/medical-records/medical-prescriptions',
    MedicalRecordController.endMedicineMedicalPrescription
  );
}

export async function createExamination(app: FastifyInstance) {
  app.post('/medical-records/examinations', MedicalRecordController.createExamination);
}

export async function getExamination(app: FastifyInstance) {
  app.get('/medical-records/:id/examinations', MedicalRecordController.getExamination);
}

export async function insertExaminationResults(app: FastifyInstance) {
  app.put(
    '/medical-records/examinations/:examinationId',
    MedicalRecordController.insertExaminationResults
  );
}

export async function discharge(app: FastifyInstance) {
  app.put('/medical-records/:id', MedicalRecordController.discharge);
}
