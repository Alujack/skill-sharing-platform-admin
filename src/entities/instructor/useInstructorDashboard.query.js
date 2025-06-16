import { useQuery } from '@tanstack/react-query';
import { fetchInstructorDashboard } from '@/services/instructorService';

export const useInstructorDashboardQuery = (id) => {
  const {
    data: dashboard,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['instructorDashboard', id],
    queryFn: () => fetchInstructorDashboard(id),
    enabled: !!id,
  });

  return { dashboard, isLoading, isError, error, refetch };
};
