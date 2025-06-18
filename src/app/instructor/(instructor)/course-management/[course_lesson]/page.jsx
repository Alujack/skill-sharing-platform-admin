"use client";
import { useState } from 'react';
import FilterBar from '@/components/commons/FilterAndSeacrh';
import { DynamicTableHead } from '@/components/commons/DynamicTableHead';
import { DynamicTableBody } from '@/components/commons/DynamicTableBody';
import { useLessonCoursesQuery } from '@/entities/lesson/useLessonCourses.query';
import { useParams } from 'next/navigation';
import CreateLessonForm from '@/components/lesson/createLessonForm';
import UpdateLessonForm from '@/components/lesson/UpdateLessonForm';
import {useLessons }from "@/hooks/lesson/useLessons"

const LessonTable = () => {
  const params = useParams();
  const courseId = params.course_lesson;
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [lessonSelected , setLessonSelected] = useState(null);

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    categoryId: '',
    instructorId: ''
  });

  const { lessons, refresh } = useLessonCoursesQuery(courseId);
  console.log('lesson ===', lessons)
  const { deleteLesson } = useLessons();

  // Table configuration
  const tableHeaders = ['ID', 'Title', 'Video URL', 'Course', 'Actions'];
  
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


  const handleUpdateLesson = (value) => {
    setLessonSelected(value)
    setShowUpdateForm(true)
    

  }
  const handleDeleteLesson = (value) =>{
      if (window.confirm('Are you sure you want to delete this lesson?')) {
      try {
        deleteLesson(value.id)
        window.location.reload(); 
      } catch (error) {
        console.error('Failed to delete course:', error);
        alert('Failed to delete course. Please try again.');
      }
    }
   


  }

  const tableActions = [
 
    {
      icon: 'reject',
      label: 'Delete',
      handler: (lesson) => handleDeleteLesson(lesson),
      color: 'red'
    }, {
      icon: 'update',
      label: 'Approve Instructor',
      handler: (lesson) => handleUpdateLesson(lesson),
      color: 'green'
    },
  ];



  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {showCreateForm && (
        <CreateLessonForm 
          courseId={courseId} 
          onClose={() => setShowCreateForm(false)}
          onSuccess={(newLesson) => {
          refresh();
          }}
        />
      )}
       {showUpdateForm && (
        <UpdateLessonForm
          onClose={() => setShowUpdateForm(false)}
          onSuccess={(newLesson) => {
            refresh()
          }}
          lesson={lessonSelected}
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

      <div className="mt-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-gray-800 rounded-lg overflow-hidden">
                <DynamicTableHead headers={tableHeaders} />
                <DynamicTableBody 
                  data={lessons.data}
                  columns={tableColumns}
                  actions={tableActions} 
                />
              </table>
            </div>
      </div>
    </div>
  );
};

export default LessonTable;