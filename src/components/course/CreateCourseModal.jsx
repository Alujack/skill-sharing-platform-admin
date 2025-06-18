import { useState, useEffect } from 'react';
import { useCourses } from '@/hooks/courses/useCourseHook';
import { useCategories } from '@/hooks/useCategories';
import {useInstructorCoursesQuery} from '@/entities/instructor/useInstructorCourses.query';
const CreateCourseModal = ({ isOpen, onClose, instructorId }) => {
  const { refetch} = useInstructorCoursesQuery(instructorId);
  const { createCourse } = useCourses();
  const { categories } = useCategories();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 49.99,
    categoryId: '',
    instructorId: instructorId
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categories.length > 0 && !formData.categoryId) {
      setFormData(prev => ({
        ...prev,
        categoryId: categories[0].id.toString()
      }));
    }
  }, [categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    refetch();
    
    try {
      await createCourse({
        ...formData,
        categoryId: Number(formData.categoryId),
        instructorId: Number(formData.instructorId)
      });
      onClose();
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: 49.99,
        categoryId: categories.length > 0 ? categories[0].id.toString() : '',
        instructorId: instructorId
      });
    } catch (err) {
      setError(err.message || 'Failed to create course');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-black">Create New Course</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-black rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-black"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-black mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-black"
                rows="3"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-black mb-2" htmlFor="price">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border rounded text-black"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-black mb-2" htmlFor="categoryId">
                Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-black"
                required
                disabled={categories.length === 0}
              >
                {categories.length === 0 ? (
                  <option value="">Loading categories...</option>
                ) : (
                  categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-black border border-gray-300 rounded hover:bg-gray-100"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
                disabled={isLoading || categories.length === 0}
              >
                {isLoading ? 'Creating...' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourseModal;