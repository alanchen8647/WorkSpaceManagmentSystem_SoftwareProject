import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/20/solid";

// Individual Column Filter Dropdown Component
export const ColumnFilter = ({ column, label, type = "text", filterValue, onFilterChange, onClearFilter }) => {
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className="ml-2 p-1 hover:bg-gray-400 rounded">
        <FunnelIcon 
          className={`w-4 h-4 ${filterValue ? 'text-blue-600' : 'text-gray-600'}`} 
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left bg-white border border-gray-300 rounded shadow-lg focus:outline-none z-20">
          <div className="p-3">
            <div className="mb-2 text-xs font-semibold text-gray-700">
              Filter by {label}
            </div>
            {type === "text" ? (
              <input
                type="text"
                placeholder={`Search ${label}...`}
                value={filterValue}
                onChange={(e) => onFilterChange(column, e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={(e) => e.stopPropagation()}
              />
            ) : type === "select" ? (
              <select
                value={filterValue}
                onChange={(e) => onFilterChange(column, e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            ) : null}
            {filterValue && (
              <button
                onClick={() => onClearFilter(column)}
                className="mt-2 w-full px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
              >
                Clear Filter
              </button>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

// Active Filters Display Component
export const ActiveFilters = ({ filters, onClearFilter, onClearAllFilters }) => {
  const hasActiveFilters = Object.values(filters).some(f => f !== "");
  
  if (!hasActiveFilters) return null;

  return (
    <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
      <span>Active filters:</span>
      {Object.entries(filters).map(([key, value]) => 
        value ? (
          <span 
            key={key} 
            className="px-2 py-1 bg-blue-100 text-blue-800 rounded flex items-center gap-1"
          >
            {key}: {value}
            <button 
              onClick={() => onClearFilter(key)}
              className="ml-1 hover:text-blue-900"
            >
              ×
            </button>
          </span>
        ) : null
      )}
      <button
        onClick={onClearAllFilters}
        className="ml-2 text-xs text-blue-600 hover:text-blue-800 underline"
      >
        Clear all
      </button>
    </div>
  );
};

export default ColumnFilter;