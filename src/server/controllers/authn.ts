import { randomUUID } from 'node:crypto';

import { FastifyPluginCallback } from 'fastify';

import { CredentialsManager } from '../services/index.js';
import { authMiddleware } from '../middlewares/authn.js';
import RateLimiterSingleton from '../services/rate-limiter.js';
import SessionManager from '../services/session.js';

interface IPasswordVerifyBody {
  password: string;
}

interface IPasswordUpdateBody {
  password: string;
}

interface IRecoveryVerifyBody {
  recoveryCode: string;
}

export const registerAuthnRoutes: FastifyPluginCallback = async (fastify) => {
  const credentialsManager = CredentialsManager.getInstance();
  const sessionManager = SessionManager.getInstance();
  const rateLimiter = RateLimiterSingleton.getInstance();

  // ==================== 系统状态 ====================

  /**
   * GET /authn/status
   * 检查系统初始化状态
   */
  fastify.get('/status', async () => {
    const status = credentialsManager.getSystemStatus();
    return {
      traceId: randomUUID(),
      content: status
    };
  });

  // ==================== Password API ====================

  /**
   * POST /authn/password/create
   * 设置或更新 Password。
   * 如果系统未初始化，可以直接调用（初始化）；如果已初始化，需要 AccessToken。
   */
  fastify.post('/password/create', async (request, reply) => {
    const body = request.body as { password?: string; };

    if (!body?.password) {
      return reply.code(400).send({
        traceId: randomUUID(),
        errorId: 'InvalidRequest',
        content: { message: 'Missing password' }
      });
    }

    if (!/^\d{6,16}$/.test(body.password)) {
      return reply.code(400).send({
        traceId: randomUUID(),
        errorId: 'InvalidRequest',
        content: { message: 'Password must be 6 digits' }
      });
    }

    const isInitialized = credentialsManager.isInitialized();

    // 如果系统已初始化，需要认证
    if (isInitialized) {
      // 检查是否通过认证中间件（authMiddleware 会设置 request.session）
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(request as any).session) {
        return reply.code(401).send({
          traceId: randomUUID(),
          errorId: 'TokenInvalid',
          content: { message: 'Authentication required' }
        });
      }
    }

    try {
      if (isInitialized) {
        // 已初始化：更新 Password
        credentialsManager.setPassword(body.password);
        return {
          traceId: randomUUID(),
          content: { message: 'Password 设置成功' }
        };
      } else {
        // 未初始化：初始化系统
        const recoveryCode = credentialsManager.initialize(body.password);
        return {
          traceId: randomUUID(),
          content: { recoveryCode }
        };
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return reply.code(500).send({
        traceId: randomUUID(),
        errorId: 'ServerError',
        content: { message }
      });
    }
  });

  /**
   * POST /authn/password/verify
   * Password 验证（登录）
   */
  fastify.post('/password/verify', async (request, reply) => {
    const body = request.body as IPasswordVerifyBody | undefined;

    if (!body?.password) {
      return reply.code(400).send({
        traceId: randomUUID(),
        errorId: 'InvalidRequest',
        content: { message: 'Missing password' }
      });
    }

    if (!/^\d{6,16}$/.test(body.password)) {
      return reply.code(400).send({
        traceId: randomUUID(),
        errorId: 'InvalidRequest',
        content: { message: 'Password must be 6 digits' }
      });
    }

    // 检查系统是否已初始化
    if (!credentialsManager.isInitialized()) {
      return reply.code(503).send({
        traceId: randomUUID(),
        errorId: 'NotInitialized',
        content: { message: 'System not initialized' }
      });
    }

    const key = `password:${body.password}`;

    // 检查速率限制
    if (!rateLimiter.checkLimit(key, 5, 15 * 60 * 1000)) {
      return reply.code(429).send({
        traceId: randomUUID(),
        errorId: 'PasswordAttemptExceeded',
        content: { message: 'Too many attempts. Try again in 15 minutes.' }
      });
    }

    rateLimiter.recordAttempt(key);

    if (credentialsManager.verifyPasswordForLogin(body.password)) {
      const accessToken = sessionManager.createSession();
      return {
        traceId: randomUUID(),
        content: {
          accessToken,
          expiresIn: 1800,
          tokenType: 'Bearer'
        }
      };
    }

    return reply.code(401).send({
      traceId: randomUUID(),
      errorId: 'PasswordInvalid',
      content: { message: 'Invalid password' }
    });
  });

  /**
   * POST /authn/password/update
   * 更新 Password（RecoveryCode 恢复后）
   */
  fastify.post('/password/update', async (request, reply) => {
    const body = request.body as IPasswordUpdateBody | undefined;

    if (!body?.password) {
      return reply.code(400).send({
        traceId: randomUUID(),
        errorId: 'InvalidRequest',
        content: { message: 'Missing password' }
      });
    }

    if (!/^\d{6,16}$/.test(body.password)) {
      return reply.code(400).send({
        traceId: randomUUID(),
        errorId: 'InvalidRequest',
        content: { message: 'Password must be 6 digits' }
      });
    }

    try {
      credentialsManager.updatePasswordAfterRecovery(body.password);
      return {
        traceId: randomUUID(),
        content: { message: 'Password 更新成功' }
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return reply.code(500).send({
        traceId: randomUUID(),
        errorId: 'ServerError',
        content: { message }
      });
    }
  });

  // ==================== RecoveryCode API ====================

  /**
   * POST /authn/recovery/verify
   * RecoveryCode 验证
   */
  fastify.post('/recovery/verify', async (request, reply) => {
    const body = request.body as IRecoveryVerifyBody | undefined;

    if (!body?.recoveryCode) {
      return reply.code(400).send({
        traceId: randomUUID(),
        errorId: 'InvalidRequest',
        content: { message: 'Missing recoveryCode' }
      });
    }

    // 验证格式
    if (!/^[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}$/.test(body.recoveryCode)) {
      return reply.code(400).send({
        traceId: randomUUID(),
        errorId: 'InvalidRequest',
        content: { message: 'Invalid recoveryCode format' }
      });
    }

    if (!credentialsManager.isInitialized()) {
      return reply.code(503).send({
        traceId: randomUUID(),
        errorId: 'NotInitialized',
        content: { message: 'System not initialized' }
      });
    }

    const key = `recovery:${body.recoveryCode}`;

    // 检查速率限制
    if (!rateLimiter.checkLimit(key, 5, 15 * 60 * 1000)) {
      return reply.code(429).send({
        traceId: randomUUID(),
        errorId: 'RecoveryAttemptExceeded',
        content: { message: 'Too many attempts. Try again in 15 minutes.' }
      });
    }

    rateLimiter.recordAttempt(key);

    if (credentialsManager.verifyRecoveryCode(body.recoveryCode)) {
      return {
        traceId: randomUUID(),
        content: {
          message: 'RecoveryCode 验证成功，更新密码',
          nextStep: '/authn/password/update'
        }
      };
    }

    return reply.code(401).send({
      traceId: randomUUID(),
      errorId: 'RecoveryCodeInvalid',
      content: { message: 'Invalid recoveryCode' }
    });
  });

  // ==================== 会话管理 ====================

  /**
   * POST /authn/sessions/delete
   * 删除会话（登出）
   */
  fastify.post('/sessions/delete', { preHandler: [authMiddleware] }, async (request) => {
    const token = request.headers.authorization?.split(' ')[1];

    if (token) {
      sessionManager.deleteSession(token);
    }

    return {
      traceId: randomUUID(),
      content: {}
    };
  });
};

export default registerAuthnRoutes;
