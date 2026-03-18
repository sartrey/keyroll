import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';

import Database from './db/Database.js';
import { registerApiRoutes } from './api/index.js';

const DirName = dirname(fileURLToPath(import.meta.url));
const Port = Number(process.env.PORT) || 3000;
const WebRoot = join(DirName, '../web');

const fastify = Fastify({
  logger: false
});

// CORS
await fastify.register(cors, {
  origin: true
});

// API 路由
await fastify.register(registerApiRoutes, { prefix: '/api' });

// 静态文件服务
await fastify.register(fastifyStatic, {
  root: WebRoot
});

// SPA 路由回退
fastify.setNotFoundHandler(async (request, reply) => {
  const indexHtml = await readFile(join(WebRoot, 'index.html'), 'utf-8');
  reply.type('text/html').send(indexHtml);
});

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ port: Port, host: '0.0.0.0' });
    console.log(`[HTTP Server] Listening on port ${Port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

const db = Database.getInstance();
db.initialize();

void start();

export { fastify };
