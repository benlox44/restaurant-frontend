import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Payment from './pages/Payment';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import ConfirmAccount from './pages/ConfirmAccount';
import ConfirmEmail from './pages/ConfirmEmail';
import HomePage from './pages/HomePage';

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
