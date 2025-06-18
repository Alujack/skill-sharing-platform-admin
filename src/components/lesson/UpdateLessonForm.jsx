"use client";
import { useState, useEffect } from 'react';
import { useLessons } from '@/hooks/lesson/useLessons';

const UpdateLessonForm = ({ lesson, onClose, onSuccess }) => {
  const { updateLesson } = useLessons();
  const [formData, setFormData] = useState({
    title: '',
    videoUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with lesson data when component mounts or lesson changes
  useEffect(() => {
    if (lesson) {
      setFormData({
        title: lesson.title || '',
        videoUrl: lesson.videoUrl || ''
      });
    }
  }, [lesson]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lesson?.id) return;
    
    setIsSubmitting(true);
    
    try {
      const updatedLesson = await updateLesson(lesson.id, formData);
      onSuccess?.(updatedLesson);
      onClose();
    } catch (error) {
      console.error('Error updating lesson:', error);
      alert('Failed to update lesson. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Update Lesson</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
              disabled={isSubmitting}
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Lesson Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                placeholder="Lesson title"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Video URL
              </label>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                placeholder="https://example.com/video"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-600 rounded-md text-white hover:bg-gray-700 transition"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Lesson'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateLessonForm;