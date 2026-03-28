import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout';
import Dashboard from './pages/dashboard';
import Records from './pages/records';
import Settings from './pages/settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="records" element={<Records />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
