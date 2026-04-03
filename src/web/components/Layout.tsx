import { Layout as AntLayout, Menu } from 'antd';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons';

import { clearAccessToken } from '../services/authn';
import './layout.less';

const { Sider, Content } = AntLayout;

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedKey = location.pathname.startsWith('/database') ? '/database' : '/settings';

  const handleLogout = () => {
    clearAccessToken();
    navigate('/authn/login');
  };

  const menuItems = [
    {
      key: '/database',
      icon: <FileTextOutlined />,
      label: <Link to="/database">Database</Link>
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: <Link to="/settings">设置</Link>
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出',
      onClick: handleLogout
    }
  ];

  return (
    <AntLayout style={{ height: '100vh', overflow: 'hidden' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth={72}
        width={200}
        style={{ background: '#fff' }}
      >
        <div className="logo">
          <h1>Keyroll</h1>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Content style={{ overflow: 'auto', margin: '16px 24px', padding: 16 }}>
        <Outlet />
      </Content>
    </AntLayout>
  );
}
