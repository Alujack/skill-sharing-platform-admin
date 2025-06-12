import { useQuery } from '@tanstack/react-query';
import { fetchInstructorCourses } from '@/services/instructorService';

export const useInstructorCoursesQuery = (id) => {
  const {
    data: courses,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['instructorCourses', id],
    queryFn: () => fetchInstructorCourses(id),
    enabled: !!id,
  });

  return { courses, isLoading, isError, error, refetch };
};
