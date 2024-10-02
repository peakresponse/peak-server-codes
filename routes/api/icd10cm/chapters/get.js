import { StatusCodes } from 'http-status-codes';

export default async function (fastify, opts) {
  fastify.get('/:name', {
    schema: {
      params: {
        type: 'object',
        properties: {
          name: { type: 'string' }
        }
      },
      response: {
        [StatusCodes.OK]: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            position: { type: 'integer' },
            desc: { type: 'string' }
          }
        }
      }
    }
  },
  async function (request, reply) {
    const { name } = request.params;
    const record = await fastify.prisma.icd10CMChapter.findUnique({
      where: { name }
    });
    if (!record) {
      return reply.notFound();
    }
    reply.send(record);
  });
}
