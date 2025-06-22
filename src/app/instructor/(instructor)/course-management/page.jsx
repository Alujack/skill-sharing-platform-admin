"use client";
import { useState } from 'react';
import FilterBar from '@/components/commons/FilterAndSeacrh';
import { DynamicTableHead } from '@/components/commons/DynamicTableHead';
import { DynamicTableBody } from '@/components/commons/DynamicTableBody';
import { useApprovedInstructorsQuery } from '@/entities/useFetchApprovedInstructor.query';
import {useInstructorCoursesQuery} from '@/entities/instructor/useInstructorCourses.query';
import { useCourses } from '@/hooks/courses/useCourseHook';
import { useRouter } from 'next/navigation';
import CreateCourseModal from '@/components/course/CreateCourseModal'
import { useAuth } from '@/context/authContext';
const CourseTable = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    categoryId: '',
    isApproved: '',
    instructorId: ''
  });
  
  const {user} = useAuth();
  
  const { courses, loading, error } = useInstructorCoursesQuery(user?.id);
  const { instructors} = useApprovedInstructorsQuery();
  const [isModalOpen, setIsModalOpen]=useState(false);

  const { createCourse, updateCourse, deleteCourse } = useCourses();
  
  const tableHeaders = ['ID', 'Title', 'Category', 'Price', 'Action'];
  const [openModal, setOpenModal] = useState(false);
  
  const handleSelectCourse = (courseId) => {
    router.push(`/instructor/course-management/${courseId}`);
  }

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(courseId);
        window.location.reload();
      } catch (error) {
        console.error('Failed to delete course:', error);
        alert('Failed to delete course. Please try again.');
      }
    }
  };

  const handleUpdateCourse = async (courseId, courseData) => {
    try {
      await updateCourse(courseId, courseData);
      window.location.reload();
    } catch (error) {
      console.error('Failed to update course:', error);
      alert('Failed to update course. Please try again.');
    }
  };

  const handleCreateCourse = async (courseData) => {
    try {
      await createCourse(courseData);
      setOpenModal(false);
      window.location.reload(); 
    } catch (error) {
      console.error('Failed to create course:', error);
      alert('Failed to create course. Please try again.');
    }
  };

  const tableColumns = [
    { key: 'id' },
    { key: 'title' },
    { 
      key: 'category.name',
      render: (item) => item.category?.name || 'N/A'
    },
    { 
      key: 'price',
      render: (item) => `$${item.price?.toFixed(2) || '0.00'}`
    }
  ];
  
  const tableActions = [
    {
      icon: 'reject',
      label: 'delete',
      handler: (course) => handleDeleteCourse(course.id),
      color: 'red'
    },
    {
      icon: 'update',
      label: 'update',
      handler: (course) => router.push(`/instructor/course-management/edit/${course.id}`),
      color: 'blue'
    }
  ];

  const handleFilterChange = (label, value) => {
    setFilters(prev => {
      switch(label) {
        case 'Category':
          return { ...prev, categoryId: value };
        case 'Instructor':
          // Find instructor ID by name
          const instructor = instructors?.find(inst => inst.id.toString() === value);
          console.log('Selected Instructor:', instructor);
          return { ...prev, instructorId: instructor?.id || '' };
        default:
          return prev;
      }
    });
  };

  const handleResetFilters = () => {
    setSearch('');
    setFilters({
      categoryId: '',
      isApproved: '',
      instructorId: ''
    });
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold mb-6">Courses</h2>
        <button 
          className="text-xl font-semibold bg-blue-700 py-3 px-6 mb-2" 
          onClick={() => setIsModalOpen(true)}
        >
          Create new Course
        </button>
      </div>

      <FilterBar 
        search={search} 
        setSearch={setSearch} 
      />

      <div className="mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse bg-gray-800 rounded-lg overflow-hidden">
            <DynamicTableHead headers={tableHeaders} />
            <DynamicTableBody 
              data={courses}
              columns={tableColumns}
              actions={tableActions} 
              onSelect={handleSelectCourse}
            />
          </table>
        )}
      </div>

      {/* Modal for creating course */}
       <CreateCourseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CourseTable;