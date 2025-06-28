"use client";
import React, { useEffect, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useUpdateInstructor } from '@/hooks/instructors/useUpdateInstructor';
import { updateInstructor } from '@/services/instructorService';

const UpdateInstructorModal = ({ isOpen, onClose, instructor, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    phone: ''
  });
  
  const {
    updateExistingInstructor,
    isLoading,
    error,
    isSuccess,
    reset: resetHookState
  } = useUpdateInstructor();

  // Pre-fill form when instructor data changes
  useEffect(() => {
    if (instructor) {
      setFormData({
        name: instructor.name || '',
        bio: instructor.bio || '',
        phone: instructor.phone || ''
      });
    }
  }, [instructor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = async () => {
        
  try {
    await updateExistingInstructor(instructor.id, formData);
        onSuccess?.();
        reset();
        onClose();
  
  } catch (err) {
    console.error("Update failed:", err);
  }
};

  const reset = () => {
    resetHookState();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in-0">
      <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full max-w-md transform transition-all duration-300 ease-out animate-in fade-in-0 zoom-in-95 ${isLoading ? 'opacity-80' : ''}`}>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100/50 dark:bg-gray-800/50 flex items-center justify-center rounded-xl z-10">
            <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
          </div>
        )}
        
        <div className="p-6 relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Update Instructor
            </h3>
            <button 
              onClick={() => {
                onClose();
                reset();
              }}
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-full transition-colors"
              disabled={isLoading}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900/50 flex items-start gap-3">
              <div className="flex-1">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
              <button 
                onClick={reset}
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <form>
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-70"
                  placeholder="Enter instructor name"
                  disabled={isLoading}
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-70"
                  placeholder="Enter instructor bio"
                  disabled={isLoading}
                  rows={3}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-70"
                  placeholder="Enter phone number"
                  disabled={isLoading}
                />
              </div>
            </div>

            
          </form>
          <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  reset();
                }}
                className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium disabled:opacity-70"
                disabled={isLoading}
              >
                Cancel
              </button>
               <button
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors flex items-center justify-center min-w-28 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Updating...
                  </>
                ) : 'Update'}
              </button>
             
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default UpdateInstructorModal;