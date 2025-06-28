"use client";
import { useState } from 'react';
import { DynamicTableHead } from '@/components/commons/DynamicTableHead';
import { DynamicTableBody } from '@/components/commons/DynamicTableBody';
import { useFetchAllCategories } from '@/entities/category/useFetchAllcategories.query';
import CreateCategoryModal from '@/components/category/CreateCategoryModal';
import { useDeleteCategory } from '@/hooks/useDeleteCategories';
import UpdateCategoryModal from '@/components/category/UpdateCategoryModal';
import SuccessModal from '@/components/SuccessModal';

const CategoryTable = () => {
  const { categories, loading, error, refetch } = useFetchAllCategories();
  const { onDeleteCategory } = useDeleteCategory();
  const [showCreateForm, setShowCreateForm] = useState(false);  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const tableHeaders = ['ID', 'Category Name', 'Actions'];

  const handleUpdateCategory = (category) => {
    setSelectedCategory(category);
    setOpenUpdate(true);
  };

  const handleDeleteCategory = async (category) => {
    try {
      await onDeleteCategory(category.id);
      setSuccessMessage('Category deleted successfully!');
      refetch()
    } catch (error) {
      console.log(error);
      setSuccessMessage("cannot delete categories that assoicate with course");
    }
  };

  const tableColumns = [
    { key: 'id' },
    { 
      key: 'name',
      render: (item) => <span className="font-medium">{item.name}</span>
    }
  ];

  const tableActions = [
    {
     
      icon: 'update',
      label: 'Edit',
      handler: (category) => handleUpdateCategory(category),
    },
    {
      icon: 'delete',
      label: 'Delete',
      handler: (category) => handleDeleteCategory(category),
    }
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <CreateCategoryModal 
        isOpen={showCreateForm} 
        onClose={() => setShowCreateForm(false)}
        onSuccess={() => {
          setSuccessMessage('Category created successfully!');
          refetch();
        }}
      />
      
      <UpdateCategoryModal
        isOpen={openUpdate} 
        category={selectedCategory}
        onClose={() => setOpenUpdate(false)}
        onSuccess={() => {
          setSuccessMessage('Category updated successfully!');
          refetch();
        }}
      />

      <SuccessModal
        isOpen={!!successMessage}
        message={successMessage}
        onClose={() => setSuccessMessage(null)}
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors flex items-center gap-2"
        >
          <span>+</span> Create New
        </button>
      </div>

      <div className="mt-6 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        {loading ? (
          <div className="p-8 text-center">Loading categories...</div>
        ) : error ? (
          <div className="p-4 bg-red-900/30 text-red-300 rounded-md">
            Error: {error.message}
          </div>
        ) : (
          <table className="w-full">
            <DynamicTableHead headers={tableHeaders} />
            <DynamicTableBody 
              data={categories}
              columns={tableColumns}
              actions={tableActions}
              actionColumnClass="w-32" // Give actions column fixed width
            />
          </table>
        )}
      </div>
    </div>
  );
};

export default CategoryTable;