"use client";
import { useState } from 'react';
import { Search } from "lucide-react";
import { useStudentsQuery } from "@/entities/useStudentQuery";
import { useDeleteStudent } from "@/hooks/students";
import { useUpdateStudent } from "@/hooks/students";
import StudentUpdateModal from "@/components/students/StudentUpdateModal";
import FilterBar from '@/components/commons/FilterAndSeacrh';
import { DynamicTableHead } from '@/components/commons/DynamicTableHead';
import { DynamicTableBody } from '@/components/commons/DynamicTableBody';

const StudentTable = () => {
  const { students, refetch } = useStudentsQuery();
  const { deleteStudent } = useDeleteStudent();
  const { update } = useUpdateStudent();
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
   const [search, setSearch] = useState('');
  const [filterValues, setFilterValues] = useState({
    Field: '',
    Course: '',
    Status: '',
  });

  // Define your table structure here
  const tableHeaders = ['ID', 'Student Name', 'Email', 'Phone', 'User Status', 'Actions'];
  
  const tableColumns = [
    { key: 'id' },
    { key: 'name' },
    { key: 'email' },
    { key: 'phone' },
    { 
      key: 'isVerified',
      render: (item) => item.isVerified ? 'Verified' : 'Pending' 
    }
  ];
  const filters = [
    {
      label: 'Field',
      options: ['Math', 'Science', 'Arts'],
      value: filterValues.Field,
    },
    {
      label: 'Course',
      options: ['Course 1', 'Course 2'],
      value: filterValues.Course,
    },
    {
      label: 'Status',
      options: ['Active', 'Inactive'],
      value: filterValues.Status,
    },
  ];

  const handleFilterChange = (label, value) => {
    setFilterValues((prev) => ({ ...prev, [label]: value }));
  };

  const handleReset = () => {
    setFilterValues({ Field: '', Course: '', Status: '' });
  };


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

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <StudentUpdateModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        initialData={initialData} 
        onSubmit={handleSubmitUpdate}
      />
      <h2 className="text-3xl font-semibold mb-6">Students</h2>

       <FilterBar
        search={search}
        setSearch={setSearch}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        isFilter={true}
      />

      <div className="mt-6">
        <table className="w-full border-collapse bg-gray-800 rounded-lg overflow-hidden">
          <DynamicTableHead headers={tableHeaders} />
          <DynamicTableBody 
            data={students?.data}
            columns={tableColumns}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </table>
      </div>
    </div>
  );
};

export default StudentTable;