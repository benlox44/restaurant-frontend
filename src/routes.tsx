import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Payment from './pages/Payment';
import AdminOrders from './pages/AdminOrders';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import ConfirmAccount from './pages/ConfirmAccount';
import ConfirmEmail from './pages/ConfirmEmail';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import ClientDashboard from './pages/ClientDashboard';
import ProtectedRoute from './components/ProtectedRoute';

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
    path: '/admin',
    element: <ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>,
  },
  {
    path: '/admin/orders',
    element: <ProtectedRoute allowedRoles={['ADMIN']}><AdminOrders /></ProtectedRoute>,
  },
  {
    path: '/admin/menu/create',
    element: <ProtectedRoute allowedRoles={['ADMIN']}><div>Create Menu (Coming Soon)</div></ProtectedRoute>,
  },
  {
    path: '/admin/menu/edit',
    element: <ProtectedRoute allowedRoles={['ADMIN']}><div>Edit Menu (Coming Soon)</div></ProtectedRoute>,
  },
  {
    path: '/admin/menu/delete',
    element: <ProtectedRoute allowedRoles={['ADMIN']}><div>Delete Menu (Coming Soon)</div></ProtectedRoute>,
  },
  {
    path: '/client',
    element: <ProtectedRoute allowedRoles={['CLIENT']}><ClientDashboard /></ProtectedRoute>,
  },
  {
    path: '/client/menu',
    element: <ProtectedRoute allowedRoles={['CLIENT']}><Menu /></ProtectedRoute>,
  },
  {
    path: '/client/orders',
    element: <ProtectedRoute allowedRoles={['CLIENT']}><div>My Orders (Coming Soon)</div></ProtectedRoute>,
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
        path: 'home',
        element: <Home />,
      },
      {
        path: 'menu',
        element: <Menu />,
      },
      {
        path: 'payment',
        element: <Payment />,
      },
    ],
  },
]);
