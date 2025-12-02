import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { role, loading, isAuthenticated } = useAuth();
  const token = localStorage.getItem('accessToken');

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If not authenticated (invalid token), redirect to login
  if (!isAuthenticated) {
    localStorage.removeItem('accessToken');
    return <Navigate to="/login" replace />;
  }

  // Show loading only if we're still fetching user data and don't have role from JWT
  if (loading && !role) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // If specific roles are required, check user role
  if (allowedRoles && role) {
    const hasRequiredRole = allowedRoles.includes(role);
    
    if (!hasRequiredRole) {
      // Redirect to appropriate dashboard based on actual role
      if (role === 'ADMIN') {
        return <Navigate to="/admin" replace />;
      } else {
        return <Navigate to="/client" replace />;
      }
    }
  }

  return <>{children}</>;
}
