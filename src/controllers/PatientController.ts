import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../lib/prisma';
import { createPatientSchema } from '../schemas/patient';

export class PatientController {
  static async register(request: FastifyRequest, reply: FastifyReply) {
    const createPatientBody = createPatientSchema;

    const body = createPatientBody.safeParse(request.body);
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

    const patient = createPatientBody.parse(request.body);

    let createPatient;

    createPatient = await prisma.patient.create({
      data: {
        ...patient,

        address: {
          create: {
            ...patient.address,
          },
        },
        medicalRecords: {
          create: {},
        },
      },
      include: {
        medicalRecords: {
          include: { followUp: true, medicalPrescription: true, examinations: true },
        },
        address: true,
      },
    });

    return reply.status(201).send({
      patient: {
        ...createPatient,
        address: { ...createPatient.address, patientId: undefined },
        medicalRecords: createPatient.medicalRecords.map((medicalRecord) => ({
          ...medicalRecord,
          patientId: undefined,
        })),
      },
    });
  }

  static async update(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };
    const createPatientBody = createPatientSchema;

    const body = createPatientBody.safeParse(request.body);
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

    const patientBody = createPatientBody.parse(request.body);

    const updatedPatient = await prisma.patient.update({
      where: { id: params.id },
      data: {
        name: patientBody.name,
        birthDate: patientBody.birthDate,
        address: { update: { ...patientBody.address } },
      },
      include: {
        medicalRecords: {
          include: { followUp: true, medicalPrescription: true, examinations: true },
        },
        address: true,
      },
    });

    return reply.status(200).send({
      patient: {
        ...updatedPatient,
        address: { ...updatedPatient.address, patientId: undefined },
        medicalRecords: updatedPatient.medicalRecords.map((medicalRecord) => ({
          ...medicalRecord,
          patientId: undefined,
        })),
      },
    });
  }

  static async get(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as { id: string };
    const patient = await prisma.patient.findUnique({
      where: { id: params.id },
      include: {
        address: true,
        medicalRecords: {
          include: { followUp: true, medicalPrescription: true, examinations: true },
        },
      },
    });

    return reply.status(200).send({ patient });
  }

  static async getAll(request: FastifyRequest, reply: FastifyReply) {
    const searchParams = request.query as { name?: string; 'status[]'?: string | string[] };
    let patients = await prisma.patient.findMany({
      where: { name: { contains: searchParams.name } },
      include: {
        medicalRecords: {
          include: { followUp: true, medicalPrescription: true, examinations: true },
        },
        address: true,
      },
    });

    if (searchParams['status[]']) {
      patients = patients.filter((patient) =>
        patient.medicalRecords.some((medicalRecord) => {
          if (typeof searchParams['status[]'] === typeof []) {
            return searchParams['status[]']?.includes(medicalRecord.status);
          } else {
            return searchParams['status[]'] === medicalRecord.status;
          }
        })
      );
    }

    return reply.status(200).send({ patients, count: patients.length });
  }
}
