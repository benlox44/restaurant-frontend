import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Payment from './pages/Payment';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
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
