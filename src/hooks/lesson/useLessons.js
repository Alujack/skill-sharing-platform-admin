import { useState, useEffect } from 'react';
import { LessonService } from '@/services/lessonService';

export const useLessons = (courseId = null) => {
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

  const createLesson = async (lessonData) => {
    try {
      const newLesson = await LessonService.createLesson(lessonData);
      setLessons(prev => [...prev, newLesson]);
      return newLesson;
    } catch (err) {
      throw err;
    }
  };

  const updateLesson = async (lessonId, lessonData) => {
    try {
      const updatedLesson = await LessonService.updateLesson(lessonId, lessonData);
      setLessons(prev =>
        prev.map(lesson => lesson.id === lessonId ? updatedLesson : lesson)
      );
      return updatedLesson;
    } catch (err) {
      throw err;
    }
  };

  const deleteLesson = async (lessonId) => {
    try {
      await LessonService.deleteLesson(lessonId);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [courseId]);

  return {
    lessons,
    loading,
    error,
    refresh: fetchLessons,
    createLesson,
    updateLesson,
    deleteLesson
  };
};