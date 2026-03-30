import { Layout as AntLayout, Menu, theme, Dropdown, Avatar } from 'antd';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';
import { clearAccessToken } from '../services/auth';
import './layout.less';

const { Header, Sider, Content } = AntLayout;

const navItems = [
  { path: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
  { path: '/records', icon: <FileTextOutlined />, label: 'Records' },
  { path: '/settings', icon: <SettingOutlined />, label: 'Settings' }
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const handleLogout = () => {
    clearAccessToken();
    navigate('/auth');
  };

  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '登出',
      onClick: handleLogout
    }
  ];

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="80">
        <div className="logo">
          <h1>Keyroll</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={navItems.map((item) => ({
            key: item.path,
            icon: item.icon,
            label:
              <Link to={item.path}>{item.label}</Link>

          }))}
        />
      </Sider>
      <AntLayout>
        <Header style={{
          padding: '0 16px',
          background: colorBgContainer,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
              <span style={{ color: '#262626' }}>用户</span>
            </div>
          </Dropdown>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            <Outlet />
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
}
