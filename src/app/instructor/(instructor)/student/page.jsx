"use client";
import { useState } from 'react';
import { useDeleteStudent } from "@/hooks/students";
import { useUpdateStudent } from "@/hooks/students";
import StudentUpdateModal from "@/components/students/StudentUpdateModal";
import FilterBar from '@/components/commons/FilterAndSeacrh';
import { DynamicTableHead } from '@/components/commons/DynamicTableHead';
import { DynamicTableBody } from '@/components/commons/DynamicTableBody';
import {useInstructorStudentsQuery} from "@/entities/instructor/useInstructorStudents.query";
import { useInstructorCoursesQuery } from "@/entities/instructor/useInstructorCourses.query";
import { useRouter } from 'next/navigation';
import { StudentProfileModal } from '@/components/students/StudentProfileModal';

const StudentTable = () => {
  const router = useRouter();
  const { students, refetch } = useInstructorStudentsQuery("4");
  const { courses, loading, error } = useInstructorCoursesQuery("4");
  const { deleteStudent } = useDeleteStudent();
  const { update } = useUpdateStudent();
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
   const [search, setSearch] = useState('');
   const [isOpendStudentProfile,setIsOpenStudentProfile] = useState(false);
   const [SelectedStudent, setSelectStudent]= useState();
  const tableHeaders = ['ID', 'Student Name', 'Email', 'Phone'];
  
  const tableColumns = [
    { key: 'id' },
    { key: 'name' },
    { key: 'email' },
    { key: 'phone' }
  ];

  const handleDelete = (id) => {
    deleteStudent(id);
    refetch();
  };

  const handleEdit = (student) => {
    setInitialData(student);
    setIsOpen(true);
  };

  const handleSubmitUpdate = (formData) => {
    update(formData.id, formData);
    refetch();
  };
  const handleSelectStudent = (value)=>{
    setSelectStudent(value)
    setIsOpenStudentProfile(true)
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <StudentUpdateModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        initialData={initialData} 
        onSubmit={handleSubmitUpdate}
      />
       {isOpendStudentProfile && (
        <StudentProfileModal
          student={SelectedStudent} 
          onClose={()=>setIsOpenStudentProfile(false)} 
        />
      )}
      <h2 className="text-3xl font-semibold mb-6">Students</h2>

       <FilterBar
        search={search}
        setSearch={setSearch}
      />
      <div className="mt-6">
        <table className="w-full border-collapse bg-gray-800 rounded-lg overflow-hidden">
          <DynamicTableHead headers={tableHeaders} />
          <DynamicTableBody 
            data={students}
            columns={tableColumns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSelect={handleSelectStudent}
          />
        </table>
      </div>
    </div>
  );
};

export default StudentTable;