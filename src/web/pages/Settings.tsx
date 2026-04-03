import { useState } from 'react';
import { Card, Descriptions, Button, Form, Input, Modal, message } from 'antd';
import { LogoutOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { clearAccessToken, passwordUpdate, logout as apiLogout } from '../services/authn';

export default function Settings() {
  const navigate = useNavigate();
  const [changePwOpen, setChangePwOpen] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  const handleLogout = async () => {
    const token = localStorage.getItem('keyroll_access_token');
    if (token) {
      try {
        await apiLogout(token);
      } catch {
        // Ignore logout API errors
      }
    }
    clearAccessToken();
    navigate('/authn/login');
  };

  const handleChangePassword = async (values: { password: string; confirmPassword: string; }) => {
    if (values.password !== values.confirmPassword) {
      message.error('两次输入的密码不一致');
      return;
    }
    try {
      setPwLoading(true);
      await passwordUpdate(values.password);
      message.success('密码修改成功');
      setChangePwOpen(false);
    } catch (err: unknown) {
      if (!(err as any)?._apiError) {
        message.error(err instanceof Error ? err.message : '密码修改失败');
      }
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: '#1a1a1a', margin: '0 0 4px' }}>
          设置
        </h2>
        <p style={{ color: '#8c8c8c', margin: 0, fontSize: 14 }}>
          系统配置与账户管理
        </p>
      </div>

      <Card style={{ borderRadius: 12, border: '1px solid #f0f0f0', marginBottom: 16 }}>
        <Descriptions
          title="系统信息"
          column={1}
          size="middle"
        >
          <Descriptions.Item label="存储位置">~/.keyroll/keyroll.db</Descriptions.Item>
          <Descriptions.Item label="备份方式">复制 keyroll.db 文件即可完整备份</Descriptions.Item>
          <Descriptions.Item label="加密策略">字段级 AES-256-GCM 加密</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card style={{ borderRadius: 12, border: '1px solid #f0f0f0', marginBottom: 16 }}>
        <Descriptions
          title="账户"
          column={1}
          size="middle"
        >
          <Descriptions.Item label="认证方式">数字密码 (6-16 位)</Descriptions.Item>
          <Descriptions.Item label="会话管理">Token 30 分钟无活动自动过期</Descriptions.Item>
          <Descriptions.Item label="修改密码">
            <Button
              icon={<LockOutlined />}
              onClick={() => setChangePwOpen(true)}
            >
              修改密码
            </Button>
          </Descriptions.Item>
          <Descriptions.Item label="">
            <Button
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              退出登录
            </Button>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Modal
        title="修改密码"
        open={changePwOpen}
        onCancel={() => setChangePwOpen(false)}
        footer={null}
      >
        <Form
          onFinish={handleChangePassword}
          layout="vertical"
          style={{ marginTop: 16 }}
        >
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

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={pwLoading}
              block
            >
              确认修改
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
