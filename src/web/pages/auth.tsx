import { useState, useEffect } from 'react';
import { Card, Form, Input, Button, message, Alert, Steps } from 'antd';
import { SafetyOutlined, KeyOutlined, ScanOutlined } from '@ant-design/icons';

import {
  getAuthStatus,
  initializeSystem,
  startPasskeyCreate,
  completePasskeyCreate,
  startPasskeyLogin,
  completePasskeyLogin,
  passwordLogin,
  saveAccessToken
} from '../services/auth';

type AuthMode = 'password' | 'passkey';
type InitStep = 'password' | 'recovery' | 'complete';

export default function Auth() {
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [passkeysExist, setPasskeysExist] = useState(false);
  const [passwordLoginAvailable, setPasswordLoginAvailable] = useState(false);

  // 初始化状态
  const [initStep, setInitStep] = useState<InitStep>('password');
  const [recoveryCode, setRecoveryCode] = useState('');

  // 登录状态
  const [authMode, setAuthMode] = useState<AuthMode>('password');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    checkStatus();
  }, []);

  async function checkStatus() {
    try {
      setLoading(true);
      const status = await getAuthStatus();
      setInitialized(status.initialized);
      setPasskeysExist(status.passkeysExist);
      setPasswordLoginAvailable(status.passwordLoginAvailable);
    } catch (err) {
      message.error('Failed to check system status');
    } finally {
      setLoading(false);
    }
  }

  // 初始化系统 - 设置 Password
  async function handleInitialize(values: { password: string; confirmPassword: string; }) {
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match');
      return;
    }

    try {
      setAuthLoading(true);
      // 步骤 1: 调用 /password/create 设置密码，返回 recoveryCode
      const initResult = await initializeSystem(values.password);
      setRecoveryCode(initResult.content.recoveryCode);

      // 步骤 2: 调用 /password/verify 登录，获取 accessToken
      const loginResult = await passwordLogin(values.password);
      saveAccessToken(loginResult.content.accessToken);

      setInitStep('recovery');
      message.success('System initialized');
    } catch (err: any) {
      message.error(err.message || 'Failed to initialize system');
    } finally {
      setAuthLoading(false);
    }
  }

  // Passkey 注册
  async function handlePasskeyRegister() {
    try {
      setAuthLoading(true);

      // 阶段一：生成挑战
      const challengeResult = await startPasskeyCreate();
      const { challengeId, publicKey } = challengeResult.content;

      // 将 publicKey 中的 challenge 从 base64url 转回 ArrayBuffer
      const publicKeyWithBuffer = {
        ...publicKey,
        challenge: base64UrlToBuffer(publicKey.challenge)
      };

      // 调用浏览器 WebAuthn API
      const credential = await navigator.credentials.create({
        publicKey: publicKeyWithBuffer
      }) as PublicKeyCredential;

      // 阶段二：验证并保存
      await completePasskeyCreate(challengeId, credential);

      message.success('Passkey registered successfully');
      setAuthMode('passkey');
      setInitStep('complete');
    } catch (err: any) {
      if (err.name === 'NotAllowedError') {
        message.error('Passkey registration cancelled');
      } else {
        message.error(err.message || 'Failed to register passkey');
      }
    } finally {
      setAuthLoading(false);
    }
  }

  // Passkey 登录
  async function handlePasskeyLogin() {
    try {
      setAuthLoading(true);

      // 阶段一：生成挑战
      const challengeResult = await startPasskeyLogin();
      const { challengeId, publicKey } = challengeResult.content;

      // 将 publicKey 中的 challenge 从 base64url 转回 ArrayBuffer
      const publicKeyWithBuffer = {
        ...publicKey,
        challenge: base64UrlToBuffer(publicKey.challenge),
        allowCredentials: publicKey.allowCredentials?.map((cred: any) => ({
          ...cred,
          id: base64UrlToBuffer(cred.id)
        }))
      };

      // 调用浏览器 WebAuthn API
      const credential = await navigator.credentials.get({
        publicKey: publicKeyWithBuffer
      }) as PublicKeyCredential;

      // 阶段二：验证并颁发 Token
      const result = await completePasskeyLogin(challengeId, credential);
      saveAccessToken(result.content.accessToken);

      message.success('Login successful');
      window.location.href = '/';
    } catch (err: any) {
      if (err.name === 'NotAllowedError') {
        message.error('Login cancelled');
      } else if (err.name === 'InvalidStateError') {
        message.error('Invalid credential state');
      } else {
        message.error(err.message || 'Failed to login with passkey');
      }
    } finally {
      setAuthLoading(false);
    }
  }

  // Password 登录
  async function handlePasswordLogin(values: { password: string; }) {
    try {
      setAuthLoading(true);
      const result = await passwordLogin(values.password);
      saveAccessToken(result.content.accessToken);
      message.success('Login successful');
      window.location.href = '/';
    } catch (err: any) {
      message.error(err.message || 'Invalid password');
    } finally {
      setAuthLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="auth-container">
        <Card className="auth-card" loading />
      </div>
    );
  }

  // 未初始化 - 显示初始化向导
  if (!initialized) {
    return (
      <div className="auth-container">
        <Card className="auth-card">
          <div className="auth-header">
            <SafetyOutlined className="auth-icon" />
            <h1>Keyroll 初始化</h1>
            <p className="auth-subtitle">首次使用，请设置管理员密码</p>
          </div>

          <Steps
            current={initStep === 'password' ? 0 : initStep === 'recovery' ? 1 : 2}
            items={[
              { title: '设置密码' },
              { title: '保存恢复码' },
              { title: '完成' }
            ]}
            style={{ marginBottom: 24 }}
          />

          {initStep === 'password' && (
            <Form onFinish={handleInitialize} layout="vertical">
              <Form.Item
                label="6 位数字密码"
                name="password"
                rules={[
                  { required: true, message: '请输入密码' },
                  { pattern: /^\d{6}$/, message: '密码必须是 6 位数字' }
                ]}
              >
                <Input.Password placeholder="请输入 6 位数字密码" size="large" />
              </Form.Item>

              <Form.Item
                label="确认密码"
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: '请确认密码' },
                  { pattern: /^\d{6}$/, message: '密码必须是 6 位数字' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次输入的密码不一致'));
                    }
                  })
                ]}
              >
                <Input.Password placeholder="请再次输入 6 位数字密码" size="large" />
              </Form.Item>

              <Form.Item>
                <Alert
                  type="info"
                  message="密码说明"
                  description="密码用于加密您的数据，请务必牢记。后续可以添加 Passkey 作为更便捷的登录方式。"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
                <Button type="primary" htmlType="submit" loading={authLoading} size="large" block>
                  初始化系统
                </Button>
              </Form.Item>
            </Form>
          )}

          {initStep === 'recovery' && (
            <div className="recovery-step">
              <Alert
                type="warning"
                message="重要：请保存恢复码"
                description={
                  <div>
                    <p>这是您的恢复码，请妥善保存：</p>
                    <div className="recovery-code">{recoveryCode}</div>
                    <p style={{ marginTop: 16, fontSize: 12, color: '#666' }}>
                      恢复码是唯一的恢复方式。如果您忘记密码且没有 Passkey，只能依靠恢复码恢复数据。
                    </p>
                  </div>
                }
                showIcon
                style={{ marginBottom: 24 }}
              />

              <Button
                type="primary"
                onClick={handlePasskeyRegister}
                loading={authLoading}
                size="large"
                block
                icon={<ScanOutlined />}
              >
                添加 Passkey（推荐）
              </Button>

              <Button
                onClick={() => {
                  setInitStep('complete');
                  message.success('初始化完成');
                  // 已经有 accessToken 了，直接跳转到主页
                  window.location.href = '/';
                }}
                size="large"
                block
                style={{ marginTop: 8 }}
              >
                跳过，稍后设置
              </Button>
            </div>
          )}

          {initStep === 'complete' && (
            <div className="complete-step" style={{ textAlign: 'center', padding: '40px 0' }}>
              <SafetyOutlined style={{ fontSize: 64, color: '#52c41a', marginBottom: 16 }} />
              <h2>初始化完成</h2>
              <p style={{ color: '#666', marginBottom: 24 }}>
                系统已初始化，正在跳转到主页...
              </p>
            </div>
          )}
        </Card>
      </div>
    );
  }

  // 已初始化 - 显示登录表单
  return (
    <div className="auth-container">
      <Card className="auth-card">
        <div className="auth-header">
          <KeyOutlined className="auth-icon" />
          <h1>Keyroll</h1>
          <p className="auth-subtitle">Local-first Personal Data Storage</p>
        </div>

        {!passkeysExist && !passwordLoginAvailable && (
          <Alert
            type="warning"
            message="无可用登录方式"
            description="请使用恢复码恢复账户，或联系管理员。"
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}

        <div className="auth-modes">
          {passwordLoginAvailable && (
            <Button
              className={authMode === 'password' ? 'active' : ''}
              onClick={() => setAuthMode('password')}
              block
              size="large"
              style={{ marginBottom: 8 }}
            >
              <KeyOutlined /> 密码登录
            </Button>
          )}
          {passkeysExist && (
            <Button
              className={authMode === 'passkey' ? 'active' : ''}
              onClick={() => setAuthMode('passkey')}
              block
              size="large"
              style={{ marginBottom: 8 }}
            >
              <ScanOutlined /> Passkey 登录
            </Button>
          )}
        </div>

        <div style={{ marginTop: 24 }}>
          {authMode === 'password' && passwordLoginAvailable && (
            <Form onFinish={handlePasswordLogin} layout="vertical">
              <Form.Item
                label="密码"
                name="password"
                rules={[
                  { required: true, message: '请输入密码' },
                  { pattern: /^\d{6}$/, message: '密码必须是 6 位数字' }
                ]}
              >
                <Input.Password placeholder="请输入 6 位数字密码" size="large" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={authLoading} size="large" block>
                  登录
                </Button>
              </Form.Item>
            </Form>
          )}

          {authMode === 'passkey' && passkeysExist && (
            <Button
              type="primary"
              onClick={handlePasskeyLogin}
              loading={authLoading}
              size="large"
              block
              icon={<FingerprintOutlined />}
            >
              使用 Passkey 登录
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

/**
 * Base64URL 转 ArrayBuffer
 */
function base64UrlToBuffer(base64url: string): ArrayBuffer {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
