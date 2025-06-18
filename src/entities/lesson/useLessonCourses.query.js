import { useQuery } from '@tanstack/react-query';
import { LessonService } from '@/services/lessonService';

export const useLessonCoursesQuery = (courseId) => {
  const {
    data: lessons = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['lessons', { courseId }],
    queryFn: async () => {
      if (!courseId) {
        return await LessonService.getAllLessons();
      }
      return await LessonService.getLessonsByCourse(courseId);
    },
    enabled: !!courseId,
  });

  return {
    lessons,
    isLoading,
    isError,
    error,
    refresh: refetch,
  };
};