export default async function (fastify, opts) {
  fastify.get('/health', async function (request, reply) {
    const result = await fastify.prisma.$queryRaw`SELECT 1`;
    return reply.send({ alive: result?.[0]['?column?'] === 1 });
  });
}
