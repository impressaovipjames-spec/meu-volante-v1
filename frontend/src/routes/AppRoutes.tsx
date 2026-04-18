import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Modalidade from '../pages/Modalidade';
import MeusJogos from '../pages/MeusJogos';
import Planos from '../pages/Planos';
import Bolao from '../pages/Bolao';
import Alertas from '../pages/Alertas';
import Historico from '../pages/Historico';
import Checkout from '../pages/Checkout';
import AdminDashboard from '../pages/AdminDashboard';
import ResultadoHoje from '../pages/SEO/ResultadoHoje';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1e1e1e',
            color: '#fff',
            border: '1px solid #2d2d2d',
            fontSize: '14px',
            fontWeight: 'bold',
          },
        }}
      />
      
      <Routes>
        {/* Rotas Pblicas de Lanamento */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<Navigate to="/register" replace />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/:slug" element={<ResultadoHoje />} />
        
        {/* Rotas Protegidas do App */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meus-jogos" element={<MeusJogos />} />
          <Route path="/modalidade/:slug" element={<Modalidade />} />
          <Route path="/bolao" element={<Bolao />} />
          <Route path="/alertas" element={<Alertas />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
