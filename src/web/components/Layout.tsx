import { Layout as AntLayout, Menu, theme } from 'antd';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import './Layout.less';

const { Header, Sider, Content } = AntLayout;

const navItems = [
  { path: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
  { path: '/records', icon: <FileTextOutlined />, label: 'Records' },
  { path: '/settings', icon: <SettingOutlined />, label: 'Settings' },
];

export default function Layout() {
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
            label: (
              <Link to={item.path}>{item.label}</Link>
            ),
          }))}
        />
      </Sider>
      <AntLayout>
        <Header style={{ padding: '0 16px', background: colorBgContainer }} />
        <Content style={{ margin: '16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
}
