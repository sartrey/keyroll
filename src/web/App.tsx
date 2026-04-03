import { Routes, Route, Navigate } from 'react-router-dom';

import { getAccessToken } from './services/authn';
import Layout from './components/layout';
import Database from './pages/database';
import Settings from './pages/settings';
import AuthnLogin from './pages/authn/login';
import AuthnSetup from './pages/authn/setup';

// 认证守卫组件
function AuthnGuard({ children }: { children: React.ReactNode; }) {
  const token = getAccessToken();
  if (!token) {
    return <Navigate to="/authn/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <Routes>
      <Route path="/authn/login" element={<AuthnLogin />} />
      <Route path="/authn/setup" element={<AuthnSetup />} />
      <Route path="/" element={
        <AuthnGuard>
          <Layout />
        </AuthnGuard>
      }>
        <Route index element={<Navigate to="/database" replace />} />
        <Route path="database" element={<Database />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
