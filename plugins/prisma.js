import fp from 'fastify-plugin';
import prisma from '../prisma/client.js';

export default fp(async (fastify, options) => {
  await prisma.$connect();

  // Make Prisma Client available through the fastify server instance: fastify.prisma
  fastify.decorate('prisma', prisma);

  fastify.addHook('onClose', async (server) => {
    await fastify.prisma.$disconnect();
  });
});
