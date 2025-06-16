"use client";
import { useState } from 'react';
import FilterBar from '@/components/commons/FilterAndSeacrh';
import { DynamicTableHead } from '@/components/commons/DynamicTableHead';
import { DynamicTableBody } from '@/components/commons/DynamicTableBody';
import { useApprovedInstructorsQuery } from '@/entities/useFetchApprovedInstructor.query';
import { useFetchAllCategories } from '@/entities/category/useFetchAllcategories.query';
import { useLessonCoursesQuery } from '@/entities/lesson/useLessonCourses.query';
import { useParams } from 'next/navigation';
import CreateLessonForm from 'components/lesson/createLessonForm';

const LessonTable = () => {
  const params = useParams();
  const courseId = params.course_lesson;
  console.log('Course ID:', courseId);

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    categoryId: '',
    instructorId: ''
  });

  // Using our new hook to fetch lessons
  const { lessons, loading, error, refresh } = useLessonCoursesQuery(courseId);
  console.log('Lessons:', lessons);

  const { instructors } = useApprovedInstructorsQuery();
  const { categories } = useFetchAllCategories();

  // Table configuration
  const tableHeaders = ['ID', 'Title', 'Video URL', 'Course', 'Course Price', 'Actions'];
  
  const tableColumns = [
    { key: 'id' },
    { key: 'title' },
    { 
      key: 'videoUrl',
      render: (item) => (
        <a 
          href={item.videoUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          View Video
        </a>
      )
    },
    { 
      key: 'course.title',
      render: (item) => item.course?.title || 'N/A'
    },
    { 
      key: 'course.price',
      render: (item) => `$${item.course?.price?.toFixed(2) || '0.00'}`
    }
  ];

  // Prepare filter options
  const filterOptions = [
    {
      label: 'Category',
      value: filters.categoryId,
      options: categories?.map(category => ({
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

  const handleFilterChange = (label, value) => {
    setFilters(prev => ({
      ...prev,
      [label.toLowerCase() + 'Id']: value
    }));
  };

  const handleResetFilters = () => {
    setSearch('');
    setFilters({
      categoryId: '',
      instructorId: ''
    });
  };

  // Filter lessons based on search and filters
  const filteredLessons = lessons?.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(search.toLowerCase()) || 
                         lesson.course?.title.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = !filters.categoryId || lesson.course?.categoryId?.toString() === filters.categoryId;
    const matchesInstructor = !filters.instructorId || lesson.course?.instructorId?.toString() === filters.instructorId;
    
    return matchesSearch && matchesCategory && matchesInstructor;
  }) || [];
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {showCreateForm && (
        <CreateLessonForm 
          courseId={courseId} 
          onClose={() => setShowCreateForm(false)}
          onSuccess={(newLesson) => {
          console.log('New lesson created:', newLesson);
          }}
        />
      )}
       <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Lessons</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition"
        >
          Create New Lesson
        </button>
      </div>

      <FilterBar 
        search={search} 
        setSearch={setSearch} 
      />

      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/50 p-4 rounded-lg">
            <p className="text-red-400 font-medium">Error: {error}</p>
            <button 
              onClick={refresh}
              className="mt-2 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-400">
              Showing {filteredLessons.length} of {lessons.length} lessons
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-gray-800 rounded-lg overflow-hidden">
                <DynamicTableHead headers={tableHeaders} />
                <DynamicTableBody 
                  data={filteredLessons}
                  columns={tableColumns}
                  actions={[
                    {
                      label: 'Delete',
                      onClick: (item) => console.log('Delete', item.id),
                      className: 'text-red-400 hover:text-red-300'
                    }
                  ]} 
                />
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LessonTable;