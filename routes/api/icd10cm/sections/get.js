import { StatusCodes } from 'http-status-codes';

export default async function (fastify, opts) {
  fastify.get('/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        [StatusCodes.OK]: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            desc: { type: 'string' },
            chapterName: { type: 'string' }
          }
        }
      }
    }
  },
  async function (request, reply) {
    const { name } = request.params;
    const record = await fastify.prisma.icd10CMSection.findUnique({
      where: { name }
    });
    if (!record) {
      return reply.notFound();
    }
    reply.send(record);
  });
}
