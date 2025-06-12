import { useQuery } from '@tanstack/react-query';
import { fetchApprovedInstructors } from '@/services/instructorService';

export const useApprovedInstructorsQuery = () => {
  const {
    data: instructors,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['instructors'],
    queryFn: fetchApprovedInstructors,
  });

  return {
    instructors,
    isLoading,
    isError,
    error,
    refetch,
  };
};
