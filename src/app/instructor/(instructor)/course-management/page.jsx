"use client";
import { useState } from 'react';
import { useCourses } from '@/hooks/courses/useCourses';
import FilterBar from '@/components/commons/FilterAndSeacrh';
import { DynamicTableHead } from '@/components/commons/DynamicTableHead';
import { DynamicTableBody } from '@/components/commons/DynamicTableBody';
import { useApprovedInstructorsQuery } from '@/entities/useFetchApprovedInstructor.query';
import { useFetchAllCategories } from '@/entities/category/useFetchAllcategories.query';
import {useInstructorCoursesQuery} from '@/entities/instructor/useInstructorCourses.query';
import { useRouter } from 'next/navigation';

const CourseTable = () => {
    const router = useRouter();
  const [search, setSearch] = useState('');
  const userString = localStorage.getItem('user');
  const {}
  const user = userString ? JSON.parse(userString) : null;

  const { courses, loading, error } = useInstructorCoursesQuery(4);

  const { instructors} = useApprovedInstructorsQuery();
  const { categories } = useFetchAllCategories();
  const tableHeaders = ['ID', 'Title', 'Category', 'Price', 'Action'];
  const handleSelectCourse = (courseId) => {
    router.push(`/instructor/course-management/${courseId}`);
  }

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
      handler: (instructor) => !instructor.isApproved && rejectInstructor(instructor.id),
      disabled: (instructor) => instructor.isApproved,
      color: 'red'
    },
    {
      icon: 'update',
      label: 'update',
      handler: (course) => !instructor.isApproved && rejectInstructor(instructor.id),
      disabled: (instructor) => instructor.isApproved,
      color: 'red'
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
      <h2 className="text-3xl font-semibold mb-6">Courses</h2>

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
    </div>
  );
};

export default CourseTable;