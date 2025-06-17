import React from 'react';
import { Filter, Search } from 'lucide-react';

const FilterBar = ({ search, setSearch, filters = [], onFilterChange, onReset, isfilter }) => {
  return (
    <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
      <div className="flex space-x-4 items-center">
       {isfilter && <button className="flex items-center bg-gray-700 px-4 py-2 rounded-md">
          <Filter className="w-5 h-5 mr-2" /> Filter By
        </button>}

        {/* Render dynamic filters */}
        {filters.map(({ label, options, value }, index) => (
          <select
            key={index}
            className="bg-gray-700 px-4 py-2 rounded-md text-white"
            value={value}
            onChange={(e) => onFilterChange(label, e.target.value)}
          >
            <option value="">{label}</option>
            {options.map((opt) => {
              // Handle both string and object options
              const optionValue = typeof opt === 'object' ? opt.value : opt;
              const optionLabel = typeof opt === 'object' ? opt.label : opt;
              const optionKey = typeof opt === 'object' ? opt.value : opt;
              
              return (
                <option key={optionKey} value={optionValue}>
                  {optionLabel}
                </option>
              );
            })}
          </select>
        ))}

        {isfilter &&<button className="text-orange-500" onClick={onReset}>
          Reset Filter
        </button>}
      </div>

      <div className="flex bg-gray-700 px-4 py-2 rounded-md items-center">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search course title"
          className="bg-transparent text-white ml-2 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default FilterBar;