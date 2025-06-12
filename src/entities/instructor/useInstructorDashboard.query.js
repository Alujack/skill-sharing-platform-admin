import { useQuery } from '@tanstack/react-query';
import { fetchInstructorDashboard } from '@/services/instructorService';

export const useInstructorDashboardQuery = () => {
  const {
    data: dashboard,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['instructorDashboard'],
    queryFn: fetchInstructorDashboard,
  });

  return { dashboard, isLoading, isError, error, refetch };
};
