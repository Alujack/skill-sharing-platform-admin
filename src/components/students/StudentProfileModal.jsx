'use client'
import React from 'react';
export const StudentProfileModal = ({ student, onClose }) => {

  if (!student) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold text-black mb-4">Student Not Found</h2>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-opacity-0.2 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-full">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
                {student?.name?.charAt(0)}
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{student?.name}</h1>
              <p className="text-blue-100">Student ID: {student.id}</p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black border-b pb-2">Contact Information</h2>
              <div className="space-y-2">
                <p className="text-black">
                  <span className="font-medium">Email:</span> {student.email}
                </p>
                <p className="text-black">
                  <span className="font-medium">Phone:</span> {student.phone}
                </p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-black border-b pb-2">Details</h2>
              <div className="space-y-2">
                <p className="text-black">
                  <span className="font-medium">Status:</span> Active
                </p>
                <p className="text-black">
                  <span className="font-medium">Enrollment Date:</span> January 2023
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Send Message
            </button>
            <button className="px-4 py-2 border border-gray-300 text-black rounded hover:bg-gray-100 transition">
              View Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};