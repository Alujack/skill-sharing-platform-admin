import axios from '@/lib/axios';

export const LessonService = {
    // Get all lessons
    getAllLessons: async () => {
        const res = await axios.get('/lesson');
        return res.data;
    },

    // Get lessons by course ID
    getLessonsByCourse: async (courseId) => {
        const res = await axios.get(`/lesson/course/${courseId}`);
        return res.data;
    },

    // Get single lesson by ID
    getLessonById: async (lessonId) => {
        const res = await axios.get(`/lesson/${lessonId}`);
        return res.data;
    },

    // Create new lesson
    createLesson: async (lessonData) => {
        const res = await axios.post('/lesson', lessonData);
        return res.data;
    },

    // Update lesson
    updateLesson: async (lessonId, lessonData) => {
        const res = await axios.put(`/lesson/${lessonId}`, lessonData);
        return res.data;
    },

    // Delete lesson
    deleteLesson: async (lessonId) => {
        const res = await axios.delete(`/lesson/${lessonId}`);
        return res.data;
    }
};