import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

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
  const indexHtml = await fs.promises.readFile(join(WebRoot, 'index.html'), 'utf-8');
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

// Only auto-start when run directly (not when spawned by CLI)
const isMain = process.argv[1]?.includes('server/index');
if (isMain) {
  void start();
}

export { fastify, start };
