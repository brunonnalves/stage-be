import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../lib/prisma';
import {
  createExaminationSchema,
  createFollowUpSchema,
  createMedicalPrescriptionSchema,
  endMedicineMedicalPrescriptionSchema,
  insertExaminationResultsSchema,
} from '../schemas/medicalRecord';

export class MedicalRecordController {
  static async register(request: FastifyRequest, reply: FastifyReply) {
    const patientId = (request.params as { patientId: string }).patientId;
    const medicalRecord = await prisma.medicalRecord.create({
      data: {
        patientId: patientId,
      },
    });

    return reply.status(201).send({
      medicalRecord,
    });
  }

  static async get(request: FastifyRequest, reply: FastifyReply) {
    const medicalRecordId = (request.params as { id: string }).id;
    const medicalRecord = await prisma.medicalRecord.findUnique({
      where: { id: medicalRecordId },
      include: { followUp: true, medicalPrescription: true, examinations: true },
    });

    return reply.status(200).send({ medicalRecord });
  }

  static async createFollowUp(request: FastifyRequest, reply: FastifyReply) {
    const createFollowUpBody = createFollowUpSchema;

    const body = createFollowUpBody.safeParse(request.body);
    if (!body.success) {
      return reply.status(500).send(body.error.issues);
      /* [
				{
					"code": "invalid_type",
					"expected": "string",
					"received": "undefined",
					"path": [ "name" ],
					"message": "Required"
				}
			] */
    }

    const followUpBody = createFollowUpBody.parse(request.body);

    const followUp = await prisma.followUp.create({
      data: {
        ...followUpBody,
      },
    });

    const updateMedicalRecord = await prisma.medicalRecord.update({
      where: { id: followUpBody.medicalRecordId },
      data: {
        followUp: {
          connect: {
            id: followUp.id,
          },
        },
      },
      include: { followUp: true, medicalPrescription: true, examinations: true },
    });

    return reply.status(201).send({
      followUp,
      updateMedicalRecord,
    });
  }

  static async getAllFollowUps(request: FastifyRequest, reply: FastifyReply) {
    const medicalRecordId = (request.params as { id: string }).id;

    const followUps = await prisma.followUp.findMany({ where: { medicalRecordId } });

    return reply.status(200).send({ followUps });
  }

  static async createMedicalPrescription(request: FastifyRequest, reply: FastifyReply) {
    const createMedicalPrescriptionBody = createMedicalPrescriptionSchema;

    const body = createMedicalPrescriptionBody.safeParse(request.body);
    if (!body.success) {
      return reply.status(500).send(body.error.issues);
      /* [
				{
					"code": "invalid_type",
					"expected": "string",
					"received": "undefined",
					"path": [ "name" ],
					"message": "Required"
				}
			] */
    }

    const medicalPrescriptionsBody = createMedicalPrescriptionBody.parse(request.body);

    await prisma.medicalPrescription.createMany({
      data: medicalPrescriptionsBody,
    });

    const medicalPrescriptions = await prisma.medicalPrescription.findMany({
      where: { medicalRecordId: medicalPrescriptionsBody[0].medicalRecordId },
    });

    const updateMedicalRecord = await prisma.medicalRecord.update({
      where: { id: medicalPrescriptionsBody[0].medicalRecordId },
      data: {
        medicalPrescription: {
          connect: medicalPrescriptions.map((medicalPrescription) => ({
            id: medicalPrescription.id,
          })),
        },
      },
      include: { followUp: true, medicalPrescription: true, examinations: true },
    });

    return reply.status(201).send({ medicalPrescriptions, updateMedicalRecord });
  }

  static async endMedicineMedicalPrescription(request: FastifyRequest, reply: FastifyReply) {
    const endMedicineMedicalPrescriptionBody = endMedicineMedicalPrescriptionSchema;

    const body = endMedicineMedicalPrescriptionBody.safeParse(request.body);
    if (!body.success) {
      return reply.status(500).send(body.error.issues);
      /* [
				{
					"code": "invalid_type",
					"expected": "string",
					"received": "undefined",
					"path": [ "name" ],
					"message": "Required"
				}
			] */
    }

    const medicalPrescriptionBody = endMedicineMedicalPrescriptionBody.parse(request.body);

    const medicalPrescription = await prisma.medicalPrescription.update({
      where: { id: medicalPrescriptionBody.id },
      data: {
        endDate: medicalPrescriptionBody.id,
      },
    });

    return reply.status(200).send({ medicalPrescription: medicalPrescription });
  }

  static async createExamination(request: FastifyRequest, reply: FastifyReply) {
    const createExaminationBody = createExaminationSchema;

    const body = createExaminationBody.safeParse(request.body);
    if (!body.success) {
      return reply.status(500).send(body.error.issues);
      /* [
				{
					"code": "invalid_type",
					"expected": "string",
					"received": "undefined",
					"path": [ "name" ],
					"message": "Required"
				}
			] */
    }

    const examinationsBody = createExaminationBody.parse(request.body);

    await prisma.examination.createMany({
      data: examinationsBody,
    });

    const examinations = await prisma.medicalPrescription.findMany({
      where: { medicalRecordId: examinationsBody[0].medicalRecordId },
    });

    const updateMedicalRecord = await prisma.medicalRecord.update({
      where: { id: examinationsBody[0].medicalRecordId },
      data: {
        medicalPrescription: {
          connect: examinations.map((examination) => ({
            id: examination.id,
          })),
        },
      },
      include: { followUp: true, medicalPrescription: true, examinations: true },
    });

    return reply.status(201).send({ examinations, updateMedicalRecord });
  }

  static async getExamination(request: FastifyRequest, reply: FastifyReply) {
    const examinationId = (request.params as { examinationId: string }).examinationId;
    const examination = await prisma.examination.findUnique({
      where: { id: examinationId },
    });

    return reply.status(200).send({ examination });
  }

  static async insertExaminationResults(request: FastifyRequest, reply: FastifyReply) {
    const insertExaminationResultsBody = insertExaminationResultsSchema;

    const body = insertExaminationResultsBody.safeParse(request.body);
    if (!body.success) {
      return reply.status(500).send(body.error.issues);
      /* [
				{
					"code": "invalid_type",
					"expected": "string",
					"received": "undefined",
					"path": [ "name" ],
					"message": "Required"
				}
			] */
    }

    const examination = insertExaminationResultsBody.parse(request.body);

    const updatedExamination = await prisma.examination.update({
      where: { id: examination.id },
      data: { ...examination },
    });

    return reply.status(200).send({ examination: updatedExamination });
  }

  static async discharge(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };
    const medicalRecord = await prisma.medicalRecord.update({
      where: { id: params.id },
      data: {
        status: 'FINISHED',
      },
    });

    const patient = await prisma.patient.findUnique({
      where: { id: medicalRecord.patientId },
      include: {
        medicalRecords: {
          include: { followUp: true, medicalPrescription: true, examinations: true },
        },
        address: true,
      },
    });

    return reply.status(200).send({ patient });
  }
}
