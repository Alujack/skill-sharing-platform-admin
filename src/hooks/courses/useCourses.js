import { useEffect, useState } from 'react';
import { getCourses } from '@/services/courseService';

export const useCourses = (search = '', filters = {}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCourses(search, filters);
        setCourses(data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [search, filters]);

  return { courses, loading, error };
};