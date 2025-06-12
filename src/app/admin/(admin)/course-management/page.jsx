"use client";
import { useState } from 'react';
import { useCourses } from '@/hooks/courses/useCourses';
import FilterBar from '@/components/commons/FilterAndSeacrh';
import { DynamicTableHead } from '@/components/commons/DynamicTableHead';
import { DynamicTableBody } from '@/components/commons/DynamicTableBody';
import { useApprovedInstructorsQuery } from '@/entities/useFetchApprovedInstructor.query';
import { useFetchAllCategories } from '../../../../entities/category/useFetchAllcategories.query';

const CourseTable = () => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    categoryId: '',
    isApproved: '',
    instructorId: ''
  });

  const { courses, loading, error } = useCourses(search, filters);

  const { instructors} = useApprovedInstructorsQuery();
  const { categories } = useFetchAllCategories();
  const tableHeaders = ['ID', 'Title', 'Category', 'Instructor', 'Price'];

  const tableColumns = [
    { key: 'id' },
    { key: 'title' },
    { 
      key: 'category.name',
      render: (item) => item.category?.name || 'N/A'
    },
    { 
      key: 'instructor.name',
      render: (item) => item.instructor?.name || 'N/A'
    },
    { 
      key: 'price',
      render: (item) => `$${item.price?.toFixed(2) || '0.00'}`
    }
  ];

  // Prepare filter options
const filterOptions = [
  {
    label: 'Category',
    value: filters.categoryId,
    options:categories?.map(category => ({
      label: category.name,
      value: category.id.toString()
    })) || []
  },
  {
    label: 'Instructor',
    value: filters.instructorId,
    options: instructors?.map(instructor => ({
      label: instructor.name,
      value: instructor.id.toString()
    })) || []
  }
];
  console.log('Filter Options:', filterOptions);

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
        filters={filterOptions} 
        onFilterChange={handleFilterChange} 
        onReset={handleResetFilters}
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
              actions={[]} 
            />
          </table>
        )}
      </div>
    </div>
  );
};

export default CourseTable;