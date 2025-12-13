import { Outlet, useLocation } from 'react-router-dom';

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
      {!shouldHideNavbar}
      <main className="mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default App;