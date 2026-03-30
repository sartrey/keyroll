import { fetcher } from './fetcher';

export interface IAuthStatus {
  initialized: boolean;
  passkeysExist: boolean;
  passwordLoginAvailable: boolean;
}

export interface IPasskeyCreateResponse {
  challengeId: string;
  publicKey: PublicKeyCredentialCreationOptions;
}

export interface IPasskeyVerifyResponse {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

/**
 * 获取系统认证状态
 */
export async function getAuthStatus(): Promise<IAuthStatus> {
  const result = await fetcher<{ content: IAuthStatus }>('/authn/status');
  return result.content;
}

/**
 * 初始化系统（设置 Password）
 * 返回 RecoveryCode，需要再调用 passwordLogin 获取 accessToken
 */
export async function initializeSystem(password: string): Promise<{ content: { recoveryCode: string; }; }> {
  return fetcher('/authn/password/create', {
    method: 'POST',
    body: JSON.stringify({ password })
  });
}

/**
 * 创建 Passkey（阶段一：生成挑战）
 */
export async function startPasskeyCreate(): Promise<{ content: IPasskeyCreateResponse; }> {
  return fetcher('/authn/passkeys/create', {
    method: 'POST',
    body: JSON.stringify({})
  });
}

/**
 * 创建 Passkey（阶段二：验证并保存）
 */
export async function completePasskeyCreate(
  challengeId: string,
  credential: PublicKeyCredential
): Promise<{ content: { credentialId: string; }; }> {
  return fetcher('/authn/passkeys/create', {
    method: 'POST',
    body: JSON.stringify({
      challengeId,
      credential: {
        id: credential.id,
        rawId: bufferToBase64Url(credential.rawId),
        response: {
          attestationObject: bufferToBase64Url(
            (credential.response as AuthenticatorAttestationResponse).attestationObject
          ),
          clientDataJSON: bufferToBase64Url(
            (credential.response as AuthenticatorAttestationResponse).clientDataJSON
          )
        },
        type: 'public-key'
      }
    })
  });
}

/**
 * Passkey 登录（阶段一：生成挑战）
 */
export async function startPasskeyLogin(): Promise<{ content: { challengeId: string; publicKey: PublicKeyCredentialRequestOptions; }; }> {
  return fetcher('/authn/passkeys/verify', {
    method: 'POST',
    body: JSON.stringify({})
  });
}

/**
 * Passkey 登录（阶段二：验证签名）
 */
export async function completePasskeyLogin(
  challengeId: string,
  credential: PublicKeyCredential
): Promise<{ content: IPasskeyVerifyResponse; }> {
  const response = credential.response as AuthenticatorAssertionResponse;
  return fetcher('/authn/passkeys/verify', {
    method: 'POST',
    body: JSON.stringify({
      challengeId,
      credentialId: credential.id,
      signature: bufferToBase64Url(response.signature),
      authenticatorData: bufferToBase64Url(response.authenticatorData),
      clientDataJSON: bufferToBase64Url(response.clientDataJSON)
    })
  });
}

/**
 * Password 登录
 */
export async function passwordLogin(password: string): Promise<{ content: IPasskeyVerifyResponse; }> {
  return fetcher('/authn/password/verify', {
    method: 'POST',
    body: JSON.stringify({
      password,
      usageType: 'signin'
    })
  });
}

/**
 * Password 解密 MasterKey
 */
export async function passwordDecrypt(password: string, accessToken: string): Promise<{ content: { message: string; }; }> {
  return fetcher('/authn/password/verify', {
    method: 'POST',
    body: JSON.stringify({
      password,
      usageType: 'master'
    }),
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

/**
 * 登出
 */
export async function logout(accessToken: string): Promise<void> {
  await fetcher('/authn/sessions/delete', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

/**
 * 保存 Access Token 到本地存储
 */
export function saveAccessToken(token: string): void {
  localStorage.setItem('keyroll_access_token', token);
}

/**
 * 获取保存的 Access Token
 */
export function getAccessToken(): string | null {
  return localStorage.getItem('keyroll_access_token');
}

/**
 * 清除保存的 Access Token
 */
export function clearAccessToken(): void {
  localStorage.removeItem('keyroll_access_token');
}

/**
 * ArrayBuffer 转 Base64URL
 */
function bufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
