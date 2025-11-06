import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';

function App() {
  const location = useLocation();
  
  // Rutas donde NO se debe mostrar el navbar
  const hideNavbarRoutes = [
    '/home',
    '/login',
    '/register',
    '/auth/confirm-account',
    '/auth/confirm-email',
  ];
  
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  
  return (
    <div>
      {!shouldHideNavbar && <Navigation />}
      <main className="mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default App;