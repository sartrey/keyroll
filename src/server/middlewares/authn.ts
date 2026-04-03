import { FastifyReply, FastifyRequest } from 'fastify';

import SessionManager from '../services/session.js';

/**
 * 认证中间件
 * 验证 BearerToken 是否有效
 */

// 豁免认证的 API 路径
const EXEMPT_PATHS = [
  '/api/authn/status',
  '/api/authn/password/create',
  '/api/authn/password/verify',
  '/api/authn/password/update',
  '/api/authn/recovery/verify'
];

/**
 * 检查路径是否豁免认证
 */
function isExemptPath(path: string): boolean {
  return EXEMPT_PATHS.some(exempt => path.startsWith(exempt));
}

/**
 * 认证中间件函数
 */
export async function authMiddleware(
    request: FastifyRequest,
    reply: FastifyReply
): Promise<void> {
  const path = request.url;

  // 检查是否豁免认证
  if (isExemptPath(path)) {
    return;
  }

  // 获取 Authorization header
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    reply.code(401).send({
      traceId: crypto.randomUUID(),
      errorId: 'TokenInvalid',
      content: { message: 'Missing Authorization header' }
    });
    return;
  }

  // 解析 Bearer Token
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    reply.code(401).send({
      traceId: crypto.randomUUID(),
      errorId: 'TokenInvalid',
      content: { message: 'Invalid Authorization header format' }
    });
    return;
  }

  const token = parts[1];
  const sessionManager = SessionManager.getInstance();

  // 验证 Token
  if (!sessionManager.validateSession(token)) {
    reply.code(401).send({
      traceId: crypto.randomUUID(),
      errorId: 'TokenInvalid',
      content: { message: 'Invalid or expired token' }
    });
    return;
  }

  // 认证通过，将会话信息附加到 request
  (request as any).session = sessionManager.getSession(token);
}

/**
 * 获取请求的 Token（从上下文中）
 */
export function getTokenFromRequest(request: FastifyRequest): string | null {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
}
