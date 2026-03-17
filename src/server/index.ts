import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import Database from './db/Database.js';
import { registerApiRoutes } from './api/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const WEB_ROOT = join(__dirname, '../web');

const fastify = Fastify({
  logger: false,
});

// CORS
await fastify.register(cors, {
  origin: true,
});

// API 路由
await fastify.register(registerApiRoutes, { prefix: '/api' });

// 静态文件服务
await fastify.register(fastifyStatic, {
  root: WEB_ROOT,
});

// SPA 路由回退
fastify.setNotFoundHandler(async (request, reply) => {
  const indexHtml = await readFile(join(WEB_ROOT, 'index.html'), 'utf-8');
  reply.type('text/html').send(indexHtml);
});

const start = async () => {
  try {
    await fastify.listen({ port: Number(PORT), host: '0.0.0.0' });
    console.log(`[HTTP Server] Listening on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

const db = Database.getInstance();
db.initialize();

start();

export { fastify };
