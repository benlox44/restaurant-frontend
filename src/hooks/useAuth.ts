import { useQuery } from '@apollo/client/react';
import { GET_MY_PROFILE } from '../graphql/queries/user';
import type { MyProfileResponse } from '../types/graphql';

// Helper function to decode JWT and extract role
function decodeJWT(token: string): { role?: string; sub?: string; email?: string } | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

export const useAuth = () => {
  const token = localStorage.getItem('accessToken');
  const { data, loading, error, refetch } = useQuery<MyProfileResponse>(GET_MY_PROFILE, {
    skip: !token,
    fetchPolicy: 'network-only', // Ensure we get fresh data
  });

  // Try to get role from JWT if GraphQL data is not yet available
  const jwtPayload = token ? decodeJWT(token) : null;
  const role = data?.myProfile?.role || jwtPayload?.role;

  return {
    user: data?.myProfile,
    loading,
    error,
    isAdmin: role === 'ADMIN',
    isClient: role === 'CLIENT' || (!role && !!token), // Default to client if role missing but token exists
    isAuthenticated: !!token,
    role,
    refetch,
  };
};
