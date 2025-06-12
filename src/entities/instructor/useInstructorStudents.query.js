import { useQuery } from '@tanstack/react-query';
import { fetchInstructorStudents } from '@/services/instructorService';

export const useInstructorStudentsQuery = () => {
  const {
    data: students,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['instructorStudents'],
    queryFn: fetchInstructorStudents,
  });

  return { students, isLoading, isError, error, refetch };
};
