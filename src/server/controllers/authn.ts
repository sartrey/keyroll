import { randomUUID } from 'node:crypto';

import { FastifyPluginCallback } from 'fastify';

import { CredentialsManager } from '../services/index.js';
import { authMiddleware } from '../middlewares/authn.js';
import RateLimiterSingleton from '../services/rate-limiter.js';
import SessionManager from '../services/session.js';

interface IPasswordVerifyBody {
  password: string;
  usageType: 'signin' | 'master';
}

interface IPasswordUpdateBody {
  password: string;
}

interface IRecoveryVerifyBody {
  recoveryCode: string;
}

interface IPasskeyCreateBody {
  challengeId?: string;
  credential?: {
    id: string;
    rawId: string;
    response: {
      attestationObject: string;
      clientDataJSON: string;
    };
    type: string;
  };
}

interface IPasskeyVerifyBody {
  challengeId?: string;
  credentialId?: string;
  signature?: string;
  authenticatorData?: string;
  clientDataJSON?: string;
}

interface IPasskeyDeleteBody {
  credentialId: string;
}

/**
 * 生成挑战（5 分钟过期）
 */
function generateChallenge(): { challengeId: string; challenge: string; expiresAt: number; } {
  return {
    challengeId: randomUUID(),
    challenge: randomUUID(),
    expiresAt: Date.now() + 5 * 60 * 1000
  };
}

// 挑战存储（内存）
const challenges: Map<string, { challenge: string; expiresAt: number; }> = new Map();

// 定期清理过期挑战（每 2 分钟）
setInterval(() => {
  const now = Date.now();
  for (const [id, data] of challenges.entries()) {
    if (now > data.expiresAt) {
      challenges.delete(id);
    }
  }
}, 2 * 60 * 1000);

export const registerAuthnRoutes: FastifyPluginCallback = async (fastify) => {
  const credentialsManager = CredentialsManager.getInstance();
  const sessionManager = SessionManager.getInstance();
  const rateLimiter = RateLimiterSingleton.getInstance();

  // ==================== 系统状态 ====================

  /**
   * GET /authn/status
   * 检查系统初始化状态和可用登录方式
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

    if (!/^\d{6}$/.test(body.password)) {
      return reply.code(400).send({
        traceId: randomUUID(),
        errorId: 'InvalidRequest',
        content: { message: 'Password must be 6 digits' }
      });
    }

    const isInitialized = credentialsManager.isInitialized();

    // 如果系统已初始化，需要认证
    if (isInitialized) {
      // 检查是否通过认证中间件（authMiddleware 会设置 request.user）
      if (!(request as any).user) {
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
   * Password 验证（登录或解密）
   */
  fastify.post('/password/verify', async (request, reply) => {
    const body = request.body as IPasswordVerifyBody | undefined;

    if (!body?.password || !body?.usageType) {
      return reply.code(400).send({
        traceId: randomUUID(),
        errorId: 'InvalidRequest',
        content: { message: 'Missing password or usageType' }
      });
    }

    if (!/^\d{6}$/.test(body.password)) {
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

    const status = credentialsManager.getSystemStatus();
    const key = `password:${body.password}`;

    // 检查速率限制
    if (!rateLimiter.checkLimit(key, 5, 15 * 60 * 1000)) {
      return reply.code(429).send({
        traceId: randomUUID(),
        errorId: 'PasswordAttemptExceeded',
        content: { message: 'Too many attempts. Try again in 15 minutes.' }
      });
    }

    if (body.usageType === 'signin') {
      // 登录认证：仅当无 Passkey 时可用
      if (!status.passwordLoginAvailable) {
        return reply.code(403).send({
          traceId: randomUUID(),
          errorId: 'PasswordLoginDisabled',
          content: { message: 'Password login is disabled. Use Passkey instead.' }
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
    } else if (body.usageType === 'master') {
      // 解密 MasterKey
      rateLimiter.recordAttempt(key);

      if (credentialsManager.verifyPassword(body.password)) {
        return {
          traceId: randomUUID(),
          content: { message: 'MasterKey 解密成功' }
        };
      }

      return reply.code(401).send({
        traceId: randomUUID(),
        errorId: 'PasswordInvalid',
        content: { message: 'Invalid password' }
      });
    }

    return reply.code(400).send({
      traceId: randomUUID(),
      errorId: 'InvalidRequest',
      content: { message: 'Invalid usageType' }
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

    if (!/^\d{6}$/.test(body.password)) {
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
          message: 'RecoveryCode 验证成功，请更新密码',
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

  // ==================== Passkey API ====================

  /**
   * POST /authn/passkeys/create
   * 创建 Passkey（两阶段）
   */
  fastify.post('/passkeys/create', async (request, reply) => {
    const body = request.body as IPasskeyCreateBody | undefined;

    if (!credentialsManager.isInitialized()) {
      return reply.code(503).send({
        traceId: randomUUID(),
        errorId: 'NotInitialized',
        content: { message: 'System not initialized' }
      });
    }

    // 阶段一：生成挑战
    if (!body?.challengeId) {
      const challengeData = generateChallenge();
      challenges.set(challengeData.challengeId, {
        challenge: challengeData.challenge,
        expiresAt: challengeData.expiresAt
      });

      // WebAuthn 创建选项
      const publicKey = {
        challenge: Buffer.from(challengeData.challenge).toString('base64url'),
        rp: { name: 'Keyroll', id: 'localhost' },
        user: {
          id: randomUUID(),
          name: 'default',
          displayName: 'Default User'
        },
        pubKeyCredParams: [{ type: 'public-key' as const, alg: -7 }],  // ES256
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          residentKey: 'required',
          userVerification: 'required'
        },
        timeout: 300000,
        attestation: 'none'
      };

      return {
        traceId: randomUUID(),
        content: {
          challengeId: challengeData.challengeId,
          publicKey
        }
      };
    }

    // 阶段二：验证并保存（TODO: 需要 WebAuthn 验证逻辑）
    const challengeData = challenges.get(body.challengeId);
    if (!challengeData) {
      return reply.code(404).send({
        traceId: randomUUID(),
        errorId: 'ChallengeNotFound',
        content: { message: 'Challenge not found' }
      });
    }

    if (Date.now() > challengeData.expiresAt) {
      challenges.delete(body.challengeId);
      return reply.code(410).send({
        traceId: randomUUID(),
        errorId: 'ChallengeExpired',
        content: { message: 'Challenge expired' }
      });
    }

    // TODO: 验证 WebAuthn credential
    // 这里需要实现完整的 WebAuthn 验证逻辑
    // 暂时保存 credentialId

    challenges.delete(body.challengeId);

    return {
      traceId: randomUUID(),
      content: {
        message: 'Passkey 创建成功（待实现完整验证）'
      }
    };
  });

  /**
   * POST /authn/passkeys/verify
   * Passkey 验证（两阶段）
   */
  fastify.post('/passkeys/verify', async (request, reply) => {
    const body = request.body as IPasskeyVerifyBody | undefined;

    if (!credentialsManager.isInitialized()) {
      return reply.code(503).send({
        traceId: randomUUID(),
        errorId: 'NotInitialized',
        content: { message: 'System not initialized' }
      });
    }

    const passkeys = credentialsManager.getPasskeys();

    if (passkeys.length === 0) {
      return reply.code(404).send({
        traceId: randomUUID(),
        errorId: 'CredentialNotFound',
        content: { message: 'No passkeys registered' }
      });
    }

    // 阶段一：生成挑战
    if (!body?.challengeId) {
      const challengeData = generateChallenge();
      challenges.set(challengeData.challengeId, {
        challenge: challengeData.challenge,
        expiresAt: challengeData.expiresAt
      });

      const allowCredentials = passkeys.map(pk => ({
        type: 'public-key' as const,
        id: pk.credentialId
      }));

      const publicKey = {
        challenge: Buffer.from(challengeData.challenge).toString('base64url'),
        timeout: 300000,
        rpId: 'localhost',
        allowCredentials,
        userVerification: 'required'
      };

      return {
        traceId: randomUUID(),
        content: {
          challengeId: challengeData.challengeId,
          publicKey
        }
      };
    }

    // 阶段二：验证签名并颁发 Token（TODO: 需要 WebAuthn 签名验证）
    const challengeData = challenges.get(body.challengeId);
    if (!challengeData) {
      return reply.code(404).send({
        traceId: randomUUID(),
        errorId: 'ChallengeNotFound',
        content: { message: 'Challenge not found' }
      });
    }

    if (Date.now() > challengeData.expiresAt) {
      challenges.delete(body.challengeId);
      return reply.code(410).send({
        traceId: randomUUID(),
        errorId: 'ChallengeExpired',
        content: { message: 'Challenge expired' }
      });
    }

    // TODO: 验证 WebAuthn 签名
    // 暂时直接颁发 Token

    challenges.delete(body.challengeId);

    const accessToken = sessionManager.createSession();

    return {
      traceId: randomUUID(),
      content: {
        accessToken,
        expiresIn: 1800,
        tokenType: 'Bearer'
      }
    };
  });

  /**
   * POST /authn/passkeys/delete
   * 删除 Passkey（需要认证）
   */
  fastify.post('/passkeys/delete', { preHandler: [authMiddleware] }, async (request, reply) => {
    const body = request.body as IPasskeyDeleteBody | undefined;

    if (!body?.credentialId) {
      return reply.code(400).send({
        traceId: randomUUID(),
        errorId: 'InvalidRequest',
        content: { message: 'Missing credentialId' }
      });
    }

    if (!credentialsManager.removePasskey(body.credentialId)) {
      return reply.code(404).send({
        traceId: randomUUID(),
        errorId: 'CredentialNotFound',
        content: { message: 'Passkey not found' }
      });
    }

    return {
      traceId: randomUUID(),
      content: { message: 'Passkey 已删除' }
    };
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
