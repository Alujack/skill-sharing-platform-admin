import React, { useEffect, useState } from 'react';

const StudentUpdateModal = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (
    e
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
  <div className="bg-white text-black p-6 rounded-lg w-[600px] max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Student</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-white text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-white text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Gender</label>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentUpdateModal;
