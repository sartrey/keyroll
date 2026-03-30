import { Routes, Route, Navigate } from 'react-router-dom';
import { getAccessToken } from './services/auth';

import Layout from './components/layout';
import Dashboard from './pages/dashboard';
import Records from './pages/records';
import Settings from './pages/settings';
import Auth from './pages/auth';

// 认证守卫组件
function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = getAccessToken();
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={
        <AuthGuard>
          <Layout />
        </AuthGuard>
      }>
        <Route index element={<Dashboard />} />
        <Route path="records" element={<Records />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
