import { useQuery } from '@tanstack/react-query';
import { fetchInstructorStudents } from '@/services/instructorService';

export const useInstructorStudentsQuery = (id) => {
  const {
    data: students,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['instructorStudents','id'],
    queryFn: () =>fetchInstructorStudents(id),
    enabled: !!id,
  });

  return { students, isLoading, isError, error, refetch };
};
