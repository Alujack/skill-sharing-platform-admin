"use client";
import { useState } from 'react';
import { DynamicTableHead } from '@/components/commons/DynamicTableHead';
import { DynamicTableBody } from '@/components/commons/DynamicTableBody';
import { useFetchAllCategories } from '@/entities/category/useFetchAllcategories.query';
import CreateCategoryModal from '@/components/category/CreateCategoryModal';

const CategoryTable = () => {
  const { categories, loading, error } = useFetchAllCategories();
  const [showCreateForm, setShowCreateForm] = useState(false);  
  const tableHeaders = ['ID', 'Category Name'];
  const tableColumns = [
    { key: 'id' },
    { key: 'name' }
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
        <CreateCategoryModal 
        isOpen={showCreateForm} 
        onClose={() => setShowCreateForm(false)} 
      />
        <div className="flex justify-between">
      <h2 className="text-3xl font-semibold mb-6">Categories</h2>
         <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition"
        >
          Create New Category
        </button>
      </div>

      <div className="mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse bg-gray-800 rounded-lg overflow-hidden">
            <DynamicTableHead headers={tableHeaders} />
            <DynamicTableBody 
              data={categories}
              columns={tableColumns}
              actions={[]} 
            />
          </table>
        )}
      </div>
    </div>
  );
};

export default CategoryTable;