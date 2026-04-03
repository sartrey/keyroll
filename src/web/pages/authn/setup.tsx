import { useState, useEffect } from 'react';
import { Form, Input, Button, message, Alert } from 'antd';
import { SafetyCertificateFilled, LockOutlined, KeyOutlined } from '@ant-design/icons';

import {
  getAuthStatus,
  initializeSystem,
  passwordLogin,
  saveAccessToken
} from '../../services/authn';
import './authn.less';

type InitStep = 'password' | 'recovery-display' | 'complete';

export default function AuthSetup() {
  const [loading, setLoading] = useState(false);
  const [initStep, setInitStep] = useState<InitStep>('password');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  async function checkStatus() {
    try {
      setLoading(true);
      const status = await getAuthStatus();
      if (status.initialized) {
        // 已初始化，跳转到登录页
        window.location.href = '/authn/login';
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

  async function handleInitialize(values: { password: string; confirmPassword: string; }) {
    if (values.password !== values.confirmPassword) {
      message.error('两次输入的密码不一致');
      return;
    }
    try {
      setAuthLoading(true);
      const initResult = await initializeSystem(values.password);
      setRecoveryCode(initResult.content.recoveryCode);
      const loginResult = await passwordLogin(values.password);
      saveAccessToken(loginResult.content.accessToken);
      setInitStep('recovery-display');
    } catch (err: unknown) {
      if (!(err as any)?._apiError) {
        message.error(err instanceof Error ? err.message : '初始化失败');
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

  if (initStep === 'password') {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon-wrap">
              <SafetyCertificateFilled style={{ fontSize: 36, color: '#5b8ff9' }} />
            </div>
            <h1>初始化 Keyroll</h1>
            <p className="auth-subtitle">首次使用，设置密码保护数据</p>
          </div>

          <Form onFinish={handleInitialize} layout="vertical" size="large">
            <Form.Item
              label="设置密码"
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

            <Form.Item style={{ marginBottom: 12 }}>
              <Alert
                type="info"
                showIcon
                message="密码用于加密数据，初始化后将显示恢复码，妥善保存。"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={authLoading}
              block
              style={{ height: 44, fontSize: 15 }}
            >
              开始初始化
            </Button>
          </Form>
        </div>
      </div>
    );
  }

  if (initStep === 'recovery-display') {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="recovery-step">
            <Alert
              type="warning"
              showIcon
              style={{ marginBottom: 20 }}
              message="保存恢复码"
              description={
                <div>
                  <p style={{ marginBottom: 12, color: '#595959' }}>
                    这是唯一的恢复方式，妥善保存
                  </p>
                  <div className="recovery-code">{recoveryCode}</div>
                  <p style={{ marginTop: 12, fontSize: 13, color: '#8c8c8c', marginBottom: 0 }}>
                    忘记密码时只能通过此恢复码恢复数据。
                  </p>
                </div>
              }
            />
            <Button
              type="primary"
              onClick={() => {
                setInitStep('complete');
                window.location.href = '/';
              }}
              block
              style={{ height: 44, fontSize: 15 }}
            >
              我已保存恢复码
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="complete-step" style={{ textAlign: 'center', padding: '40px 0' }}>
          <SafetyCertificateFilled style={{ fontSize: 48, color: '#52c41a', marginBottom: 16 }} />
          <h2 style={{ marginBottom: 8 }}>初始化完成</h2>
          <p style={{ color: '#8c8c8c' }}>
            系统已就绪，正在跳转...
          </p>
        </div>
      </div>
    </div>
  );
}
