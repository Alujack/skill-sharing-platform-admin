import { useState, useEffect } from 'react';
import { LessonService } from '@/services/lessonService';

export const useLessonCoursesQuery = (courseId = null) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLessons = async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (courseId) {
        data = await LessonService.getLessonsByCourse(courseId);
      } else {
        data = await LessonService.getAllLessons();
      }
      setLessons(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch lessons');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [courseId]);

  return {
    lessons,
    loading,
    error,
    refresh: fetchLessons
  };
};