import { useState, useEffect } from 'react';
import { Form, Input, Button, message, Alert } from 'antd';
import { KeyOutlined, LockOutlined, SafetyCertificateFilled } from '@ant-design/icons';

import {
  getAuthStatus,
  passwordLogin,
  recoveryVerify,
  passwordUpdate,
  saveAccessToken
} from '../../services/authn';
import './authn.less';

type LoginMode = 'password' | 'recovery-input' | 'recovery-set-password';

export default function AuthLogin() {
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState<LoginMode>('password');
  const [authLoading, setAuthLoading] = useState(false);

  async function checkStatus() {
    try {
      setLoading(true);
      const status = await getAuthStatus();
      if (!status.initialized) {
        // 未初始化，跳转到 setup 页
        window.location.href = '/authn/setup';
        return;
      }
    } catch {
      message.error('检查系统状态失败');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkStatus();
  }, []);

  async function handlePasswordLogin(values: { password: string; }) {
    try {
      setAuthLoading(true);
      const result = await passwordLogin(values.password);
      saveAccessToken(result.content.accessToken);
      window.location.href = '/';
    } catch (err: unknown) {
      if (!(err as any)?._apiError) {
        message.error(err instanceof Error ? err.message : '密码错误');
      }
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleRecoveryVerify(values: { recoveryCode: string; }) {
    try {
      setAuthLoading(true);
      await recoveryVerify(values.recoveryCode);
      setAuthMode('recovery-set-password');
    } catch (err: unknown) {
      if (!(err as any)?._apiError) {
        message.error(err instanceof Error ? err.message : '恢复码验证失败');
      }
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleRecoverySetPassword(values: { password: string; confirmPassword: string; }) {
    if (values.password !== values.confirmPassword) {
      message.error('两次输入的密码不一致');
      return;
    }
    try {
      setAuthLoading(true);
      await passwordUpdate(values.password);
      const loginResult = await passwordLogin(values.password);
      saveAccessToken(loginResult.content.accessToken);
      message.success('密码设置成功');
      window.location.href = '/';
    } catch (err: unknown) {
      if (!(err as any)?._apiError) {
        message.error(err instanceof Error ? err.message : '密码设置失败');
      }
    } finally {
      setAuthLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="auth-container">
        <div className="auth-card" style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <SafetyCertificateFilled style={{ fontSize: 32, color: '#bfbfbf' }} />
        </div>
      </div>
    );
  }

  if (authMode === 'recovery-input') {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon-wrap">
              <KeyOutlined style={{ fontSize: 36, color: '#5b8ff9' }} />
            </div>
            <h1>恢复账户</h1>
            <p className="auth-subtitle">使用恢复码重设密码</p>
          </div>

          <Form onFinish={handleRecoveryVerify} layout="vertical" size="large">
            <Form.Item
              label="恢复码"
              name="recoveryCode"
              rules={[
                { required: true, message: '请输入恢复码' },
                { pattern: /^[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}$/, message: '格式：XXXX-XXXX-XXXX-XXXX-XXXX' }
              ]}
            >
              <Input
                placeholder="XXXX-XXXX-XXXX-XXXX-XXXX"
                style={{ textTransform: 'uppercase', height: 44 }}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={authLoading}
              block
              style={{ height: 44, fontSize: 15 }}
            >
              验证恢复码
            </Button>

            <Button
              type="link"
              onClick={() => setAuthMode('password')}
              block
              style={{ marginTop: 8 }}
            >
              返回密码登录
            </Button>
          </Form>
        </div>
      </div>
    );
  }

  if (authMode === 'recovery-set-password') {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon-wrap">
              <LockOutlined style={{ fontSize: 36, color: '#5b8ff9' }} />
            </div>
            <h1>设置新密码</h1>
            <p className="auth-subtitle">恢复码验证成功，设置新密码</p>
          </div>

          <Alert
            type="success"
            showIcon
            style={{ marginBottom: 20 }}
            message="恢复码验证成功"
            description="设置新的登录密码"
          />

          <Form onFinish={handleRecoverySetPassword} layout="vertical" size="large">
            <Form.Item
              label="新密码"
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { pattern: /^\d{6,16}$/, message: '密码必须是 6-16 位数字' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="6-16 位数字"
                iconRender={(visible) => visible ? <KeyOutlined /> : <LockOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="确认密码"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: '请确认密码' },
                { pattern: /^\d{6,16}$/, message: '密码必须是 6-16 位数字' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次密码不一致'));
                  }
                })
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="再次输入密码"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={authLoading}
              block
              style={{ height: 44, fontSize: 15 }}
            >
              设置新密码并登录
            </Button>
          </Form>
        </div>
      </div>
    );
  }

  // Normal password login
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon-wrap">
            <KeyOutlined style={{ fontSize: 36, color: '#5b8ff9' }} />
          </div>
          <h1>Keyroll</h1>
          <p className="auth-subtitle">Local-first Personal Data Storage</p>
        </div>

        <Form onFinish={handlePasswordLogin} layout="vertical" size="large">
          <Form.Item
            label=""
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { pattern: /^\d{6,16}$/, message: '密码必须是 6-16 位数字' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="输入 6-16 位数字密码"
              style={{ height: 44 }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={authLoading}
            block
            style={{ height: 44, fontSize: 15 }}
          >
            登录
          </Button>

          <Button
            type="link"
            onClick={() => setAuthMode('recovery-input')}
            block
            style={{ marginTop: 8 }}
          >
            使用恢复码恢复
          </Button>
        </Form>
      </div>
    </div>
  );
}
