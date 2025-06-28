import { useEffect, useState } from 'react';
import { getCourses } from '@/services/courseService';

export const useCourses = (search = '', filters = {}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCourses = async () => {
      try {
        const data = await getCourses(search, filters);
        if (isMounted) setCourses(data);
      } catch (err) {
        if (isMounted) setError(err?.response?.data?.message || 'Failed to fetch courses');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCourses();
    return () => { isMounted = false; };
  }, [search, JSON.stringify(filters)]);

  return { courses, loading, error };
};