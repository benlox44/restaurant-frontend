import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Menu from './pages/Menu';
import PaymentResult from './pages/PaymentResult';
import AdminOrders from './pages/AdminOrders';
import ClientOrders from './pages/ClientOrders';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import ConfirmAccount from './pages/ConfirmAccount';
import ConfirmEmail from './pages/ConfirmEmail';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import ClientDashboard from './pages/ClientDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/auth/confirm-account',
    element: <ConfirmAccount />,
  },
  {
    path: '/auth/confirm-email',
    element: <ConfirmEmail />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/auth/reset-password',
    element: <ForgotPassword />,
  },
  {
    path: '/auth/unlock-account',
    element: <ForgotPassword />,
  },
  {
    path: '/auth/confirm-email-update',
    element: <ConfirmEmail />,
  },
  {
    path: '/auth/revert-email',
    element: <ConfirmEmail />,
  },
  {
    path: '/profile',
    element: <ProtectedRoute allowedRoles={['CLIENT', 'ADMIN']}><Profile /></ProtectedRoute>,
  },
  {
    path: '/admin',
    element: <ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>,
  },
  {
    path: '/admin/dashboard',
    element: <ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>,
  },
  {
    path: '/admin/orders',
    element: <ProtectedRoute allowedRoles={['ADMIN']}><AdminOrders /></ProtectedRoute>,
  },
  {
    path: '/admin/menu',
    element: <ProtectedRoute allowedRoles={['ADMIN']}><Menu /></ProtectedRoute>,
  },
  {
    path: '/admin/menu/create',
    element: <ProtectedRoute allowedRoles={['ADMIN']}><div>Crear Menú (Próximamente)</div></ProtectedRoute>,
  },
  {
    path: '/admin/menu/edit',
    element: <ProtectedRoute allowedRoles={['ADMIN']}><div>Editar Menú (Próximamente)</div></ProtectedRoute>,
  },
  {
    path: '/admin/menu/delete',
    element: <ProtectedRoute allowedRoles={['ADMIN']}><div>Eliminar Menú (Próximamente)</div></ProtectedRoute>,
  },
  {
    path: '/client',
    element: <ProtectedRoute allowedRoles={['CLIENT']}><ClientDashboard /></ProtectedRoute>,
  },
  {
    path: '/client/dashboard',
    element: <ProtectedRoute allowedRoles={['CLIENT']}><ClientDashboard /></ProtectedRoute>,
  },
  {
    path: '/client/menu',
    element: <ProtectedRoute allowedRoles={['CLIENT']}><Menu /></ProtectedRoute>,
  },
  {
    path: '/client/orders',
    element: <ProtectedRoute allowedRoles={['CLIENT']}><ClientOrders /></ProtectedRoute>,
  },
  {
    path: '/client/new-order',
    element: <ProtectedRoute allowedRoles={['CLIENT']}><Menu /></ProtectedRoute>,
  },
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'payment/result',
        element: <PaymentResult />,
      },
    ],
  },
]);
