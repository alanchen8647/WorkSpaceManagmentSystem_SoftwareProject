import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import EditCase from "./editCase.jsx";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

// Table Component
export function MyCaseTable({ cases, searchQuery, sortOption }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  //Search Bar
  let filteredCases = cases.filter((c) =>
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()));

  //Dropdown Menu
  if (sortOption === "nameAsc") 
    filteredCases.sort((a,b) => a.name.localeCompare(b.name));
  if (sortOption === "nameDesc") 
    filteredCases.sort((a,b) => b.name.localeCompare(a.name));

  const getDateSafe = (ts) =>
    ts?.seconds ? new Date(ts.seconds * 1000) : new Date(0);

  if (sortOption === "startDateAsc") filteredCases.sort((a,b) => 
    getDateSafe(a.startDate) - getDateSafe(b.startDate));
  if (sortOption === "startDateDesc") filteredCases.sort((a,b) => 
    getDateSafe(b.startDate) - getDateSafe(a.startDate));
  if (sortOption === "endDateAsc") filteredCases.sort((a,b) => 
    getDateSafe(a.endDate) - getDateSafe(b.endDate));
  if (sortOption === "endDateDesc") filteredCases.sort((a,b) => 
    getDateSafe(b.endDate) - getDateSafe(a.endDate));

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return "N/A";
    if (
      dateTimeStr.seconds !== undefined &&
      dateTimeStr.nanoseconds !== undefined
    ) {
      const date = new Date(dateTimeStr.seconds * 1000);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      });
    }
    return dateTimeStr;
  };

  const formatFee = (fee) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(fee || 0);
  };  

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border border-gray-500 text-sm text-gray-800">
        <thead className="bg-gray-300 text-left">
          <tr>
            <th className="px-4 py-2 border-b border-gray-400">Name</th>
            <th className="px-4 py-2 border-b border-gray-400">Case Type</th>
            <th className="px-4 py-2 border-b border-gray-400">Case Status</th>
            <th className="px-4 py-2 border-b border-gray-400">
              Has Dependent
            </th>
            <th className="px-4 py-2 border-b border-gray-400">Start Date</th>
            <th className="px-4 py-2 border-b border-gray-400">End Date</th>
            <th className="px-4 py-2 border-b border-gray-400">Fee</th>
            <th className="px-4 py-2 border-b border-gray-400">
              Payment Status
            </th>
            <th className="px-4 py-2 border-b border-gray-400">Employee</th>
            <th className="px-4 py-2 border-b border-gray-400">Notes</th>
            <th className="px-4 py-2 border-b border-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!filteredCases || filteredCases.length === 0 ? (
            <tr>
              <td colSpan="10" className="px-4 py-8 text-center text-gray-500">
                No cases found
              </td>
            </tr>
          ) : (
            filteredCases.map((caseItem, index) => (
              <tr
                key={caseItem.id || index}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="px-4 py-2">{caseItem.name || "N/A"}</td>
                <td className="px-4 py-2">{caseItem.caseType || "N/A"}</td>
                <td className="px-4 py-2">{caseItem.caseStatus || "N/A"}</td>
                <td className="px-4 py-2">
                  {caseItem.hasDependent ? "Yes" : "No"}
                </td>
                <td className="px-4 py-2">
                  {formatDateTime(caseItem.startDate)}
                </td>
                <td className="px-4 py-2">
                  {formatDateTime(caseItem.endDate)}
                </td>
                <td className="px-4 py-2 font-semibold">
                  {formatFee(caseItem.fee)}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      caseItem.paymentStatus
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {caseItem.paymentStatus ? "Paid" : "Unpaid"}
                  </span>
                </td>
                <td className="px-4 py-2">{caseItem.employee || "N/A"}</td>
                <td className="px-4 py-2">
                  {caseItem.notes?.length > 0
                    ? `${caseItem.notes.length} note(s)`
                    : "No notes"}
                </td>
                <td className="px-4 py-2">
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="inline-flex justify-center w-full p-1 text-sm text-gray-700 hover:bg-gray-100 rounded">
                      <PencilSquareIcon className="w-5 h-5" />
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
                      <Menu.Items className="absolute right-0 w-28 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded shadow-lg focus:outline-none z-10">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => {
                                  setSelectedCase(caseItem);
                                  setIsOpen(true);
                                }}
                                className={`${
                                  active ? "bg-gray-100" : ""
                                } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                              >
                                Edit
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {isOpen && selectedCase && (
        <EditCase
          open={isOpen}
          setIsOpen={setIsOpen}
          caseDataProp={selectedCase}
        />
      )}
    </div>
  );
}

export default MyCaseTable;
