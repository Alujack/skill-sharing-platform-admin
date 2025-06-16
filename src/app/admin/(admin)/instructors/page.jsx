"use client";
import { useState } from 'react';
import { useAllInstructorsQuery } from "@/entities/instructor/useAllInstructors.query";
import { useApproveInstructor } from "@/hooks/instructors/useApproveInstructor.action";
import { DynamicTableHead } from '@/components/commons/DynamicTableHead';
import { DynamicTableBody } from '@/components/commons/DynamicTableBody';
import FilterBar from '@/components/commons/FilterAndSeacrh';
import { useCourses } from '@/hooks/courses/useCourses';

const InstructorTable = () => {
  const { instructors, refetch } = useAllInstructorsQuery();
  const [search, setSearch] = useState('');
  const { approveInstructor } = useApproveInstructor();
  // const { rejectInstructor } = useRejectInstructor();
  const [filterValues, setFilterValues] = useState({
    Field: '',
    Course: '',
    Status: '',
  });

  const tableHeaders = ['ID', 'Name', 'Email', 'Role', 'Approval Status', 'Actions'];
  const approveInstructorStatus = (userid) => {
    approveInstructor(userid);
    refetch();
 
  }
  
  const tableColumns = [
    { key: 'id' },
    { key: 'name' },
    { 
      key: 'user.email',
      render: (item) => item.user?.email || 'N/A'
    },
    { 
      key: 'user.role',
      render: (item) => item.user?.role || 'N/A'
    },
    { 
      key: 'isApproved',
      render: (item) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          item.isApproved 
            ? 'bg-green-900 text-green-300' 
            : 'bg-yellow-900 text-yellow-300'
        }`}>
          {item.isApproved ? 'Approved' : 'Pending Approval'}
        </span>
      )
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

  

  // Define your actions here
  const tableActions = [
    {
      icon: 'approve',
      label: 'Approve Instructor',
      handler: (instructor) => !instructor.isApproved && approveInstructorStatus(instructor.user.id),
      disabled: (instructor) => instructor.isApproved,
      color: 'green'
    },
    {
      icon: 'reject',
      label: 'Reject Instructor',
      handler: (instructor) => !instructor.isApproved && rejectInstructor(instructor.id),
      disabled: (instructor) => instructor.isApproved,
      color: 'red'
    }
  ];

  const handleFilterChange = (label, value) => {
    setFilterValues((prev) => ({ ...prev, [label]: value }));
  };

  const handleReset = () => {
    setFilterValues({ Field: '', Course: '', Status: '' });
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-3xl font-semibold mb-6">Instructors</h2>

        <FilterBar
        search={search}
        setSearch={setSearch}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      <div className="mt-6">
        <table className="w-full border-collapse bg-gray-800 rounded-lg overflow-hidden">
          <DynamicTableHead headers={tableHeaders} />
          <DynamicTableBody 
            data={instructors}
            columns={tableColumns}
            actions={tableActions}
          />
        </table>
      </div>
    </div>
  );
};

export default InstructorTable;