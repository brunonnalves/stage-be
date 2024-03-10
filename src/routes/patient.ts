import { FastifyInstance } from 'fastify';
import { PatientController } from '../controllers/PatientController';

export async function createPatient(app: FastifyInstance) {
  app.post('/patients', PatientController.register);
}

export async function updatePatient(app: FastifyInstance) {
  app.put('/patients/:id', PatientController.update);
}

export async function getPatient(app: FastifyInstance) {
  app.get('/patients/:id', PatientController.get);
}

export async function getAllPatients(app: FastifyInstance) {
  app.get('/patients', PatientController.getAll);
}
