import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import AdminRoute from './routes/AdminRoute';
import Home from './pages/Home';
import Agendamento from './pages/Agendamento';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import Agendamentos from './pages/Admin/Agendamentos';
import Clientes from './pages/Admin/Clientes';
import Configuracoes from './pages/Admin/Configuracoes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="agendamento" element={<Agendamento />} />
        </Route>

        {/* Rotas administrativas */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="agendamentos" element={<Agendamentos />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
