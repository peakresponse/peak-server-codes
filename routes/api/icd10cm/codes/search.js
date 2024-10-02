export default async function (fastify, opts) {
  fastify.get('', async function (request, reply) {
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
