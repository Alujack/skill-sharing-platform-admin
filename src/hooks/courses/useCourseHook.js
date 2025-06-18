import { useState, useEffect } from 'react';
import * as courseService from '@/services/courseService';

export const useCourses = (search = '', filters = {}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await courseService.getCourses(search, filters);
      setCourses(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const createCourse = async (courseData) => {
    try {
      const newCourse = await courseService.createCourse(courseData);
      setCourses(prev => [...prev, newCourse]);
      return newCourse;
    } catch (err) {
      throw err;
    }
  };

  const updateCourse = async (courseId, courseData) => {
    try {
      const updatedCourse = await courseService.updateCourse(courseId, courseData);
      setCourses(prev =>
        prev.map(course => course.id === courseId ? updatedCourse : course)
      );
      return updatedCourse;
    } catch (err) {
      throw err;
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      await courseService.deleteCourse(courseId);
      setCourses(prev => prev.filter(course => course.id !== courseId));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [search, JSON.stringify(filters)]);

  return {
    courses,
    loading,
    error,
    refresh: fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse
  };
};

export const useCourse = (courseId) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourse = async () => {
    if (!courseId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await courseService.getCourseById(courseId);
      setCourse(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch course');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  return {
    course,
    loading,
    error,
    refresh: fetchCourse
  };
};

export const useInstructorCourses = (instructorId) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInstructorCourses = async () => {
    if (!instructorId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await courseService.getInstructorCourses(instructorId);
      setCourses(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch instructor courses');
    } finally {
      setLoading(false);
    }
  };

  const createCourse = async (courseData) => {
    try {
      const newCourse = await courseService.createCourse(courseData);
      setCourses(prev => [...prev, newCourse]);
      return newCourse;
    } catch (err) {
      throw err;
    }
  };

  const updateCourse = async (courseId, courseData) => {
    try {
      const updatedCourse = await courseService.updateCourse(courseId, courseData);
      setCourses(prev =>
        prev.map(course => course.id === courseId ? updatedCourse : course)
      );
      return updatedCourse;
    } catch (err) {
      throw err;
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      await courseService.deleteCourse(courseId);
      setCourses(prev => prev.filter(course => course.id !== courseId));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchInstructorCourses();
  }, [instructorId]);

  return {
    courses,
    loading,
    error,
    refresh: fetchInstructorCourses,
    createCourse,
    updateCourse,
    deleteCourse
  };
};