import { StatusCodes } from 'http-status-codes';

export default async function (fastify, opts) {
  fastify.get('', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          chapterName: { type: 'string' },
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
              id: { type: 'string' },
              desc: { type: 'string' },
              chapterName: { type: 'string' }
            }
          }
        }
      }
    }
  },
  async function (request, reply) {
    const { page = '1', perPage = '25', chapterName } = request.query;
    const options = {
      page,
      perPage,
      orderBy: [
        { id: 'asc' }
      ]
    };
    if (chapterName) {
      options.where = { chapterName };
    }
    const { records, total } = await fastify.prisma.icd10CMSection.paginate(options);
    reply.setPaginationHeaders(page, perPage, total).send(records);
  });
}
