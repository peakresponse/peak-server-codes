export default async function (fastify, opts) {
  fastify.get('/:name', async function (request, reply) {
    const { name } = request.params;
    const record = await fastify.prisma.icd10CMCode.findUnique({
      where: { name }
    });
    if (!record) {
      return reply.notFound();
    }
    reply.send(record);
  });
}
