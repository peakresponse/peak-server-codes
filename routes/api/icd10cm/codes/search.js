import { StatusCodes } from 'http-status-codes';

export default async function (fastify, opts) {
  fastify.get('', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          sectionId: { type: 'string' },
          level: { type: 'integer' },
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
    const { page = '1', perPage = '25', sectionId, level } = request.query;
    const options = {
      where: {},
      page,
      perPage,
      orderBy: [
        { name: 'asc' }
      ]
    };
    if (sectionId) {
      options.where.sectionId = sectionId;
    }
    if ((level ?? null) !== null) {
      options.where.depth = level;
    }
    const { records, total } = await fastify.prisma.icd10CMCode.paginate(options);
    reply.setPaginationHeaders(page, perPage, total).send(records);
  });

  fastify.post('', {
    schema: {
      body: {
        type: 'array',
        items: {
          type: 'string'
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
    const options = {
      where: {
        name: {
          in: request.body
        }
      }
    };
    const records = await fastify.prisma.icd10CMCode.findMany(options);
    reply.send(records);
  });
}
