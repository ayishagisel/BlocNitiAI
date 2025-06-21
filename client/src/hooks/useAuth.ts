import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useAuth() {
  const { data: user, isLoading, error, refetch } = useQuery({
    queryKey: ['auth-user'],
    queryFn: async () => {
      try {
        const response = await apiRequest("GET", "/api/auth/user");
        if (!response.ok) {
          if (response.status === 401) {
            return null;
          }
          throw new Error('Failed to fetch user');
        }
        return response.json();
      } catch (error) {
        // If we get a network error or other issue, return null instead of throwing
        console.warn('Auth check failed:', error);
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Prevent excessive refetching
  });

  return {
    user,
    loading: isLoading,
    isAuthenticated: !!user && !error,
	refetch,
  };
}