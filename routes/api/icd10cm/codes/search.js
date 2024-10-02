import { StatusCodes } from 'http-status-codes';

export default async function (fastify, opts) {
  fastify.get('', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'integer' },
          perPage: { type: 'integer' }
        }
      },
      response: {
        [StatusCodes.OK]: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              desc: { type: 'string' },
              sectionId: { type: 'string' },
              parentName: { type: 'string' },
              depth: { type: 'integer' },
              lft: { type: 'integer' },
              rgt: { type: 'integer' }
            }
          }
        }
      }
    }
  },
  async function (request, reply) {
    const { page = '1', perPage = '25' } = request.query;
    const options = {
      page,
      perPage,
      orderBy: [
        { name: 'asc' }
      ]
    };
    const { records, total } = await fastify.prisma.icd10CMCode.paginate(options);
    reply.setPaginationHeaders(page, perPage, total).send(records);
  });
}
