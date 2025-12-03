import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import EditCase from "./editCase.jsx";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { ColumnFilter } from "./filter.jsx";
import CaseDetails from "./caseDetails.jsx";
import { set } from "firebase/database";
import { deleteCaseRecord } from "../firebaseFunction/cloudDatabase.jsx";

// Table Component
export function MyCaseTable({
  cases,
  searchQuery,
  sortOption,
  hide_columns = {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  // Filter states for each column
  const [filters, setFilters] = useState({
    name: "",
    caseType: "",
    caseStatus: "",
    startDate: "",
    fee: "",
    paymentStatus: "",
    employee: "",
  });

  let filteredCases = cases.filter((c) => {
    const parseDateFromCase = (dateTimeStr) => {
      if (!dateTimeStr) return null;

      if (
        dateTimeStr.seconds !== undefined &&
        dateTimeStr.nanoseconds !== undefined
      ) {
        return new Date(dateTimeStr.seconds * 1000);
      }

      if (dateTimeStr instanceof Date) {
        return dateTimeStr;
      }

      if (typeof dateTimeStr === "string") {
        const parsed = new Date(dateTimeStr);
        return isNaN(parsed.getTime()) ? null : parsed;
      }

      return null;
    };

    // Name filter
    const nameMatch =
      !filters.name ||
      (c.name && c.name.toLowerCase().includes(filters.name.toLowerCase()));

    // Case Type filter
    const typeMatch =
      !filters.caseType ||
      (c.caseType &&
        c.caseType.toLowerCase().includes(filters.caseType.toLowerCase()));

    // Case Status filter
    const statusMatch =
      !filters.caseStatus ||
      (c.caseStatus &&
        c.caseStatus.toLowerCase().includes(filters.caseStatus.toLowerCase()));

    // Start Date filter - IMPORTANT FIX
    const startDateMatch =
      !filters.startDate ||
      (() => {
        const caseDate = parseDateFromCase(c.startDate);
        if (!caseDate) return false;

        const filterLower = filters.startDate.toLowerCase();

        // If filter looks like "2024-01-15" (YYYY-MM-DD)
        if (filterLower.match(/^\d{4}-\d{2}-\d{2}$/)) {
          const caseDateStr = caseDate.toISOString().split("T")[0];
          return caseDateStr === filterLower;
        }

        // If filter looks like "January 15, 2024"
        const caseFormatted = caseDate
          .toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
          .toLowerCase();

        return caseFormatted.includes(filterLower);
      })();

    // Fee filter
    const feeMatch =
      !filters.fee ||
      (() => {
        const caseFee = parseFloat(c.fee) || 0;

        const formattedFee = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        })
          .format(caseFee)
          .toLowerCase();

        return formattedFee.includes(filters.fee.toLowerCase());
      })();

    // Payment Status filter
    const paymentMatch =
      !filters.paymentStatus ||
      (() => {
        const filterValue = filters.paymentStatus.toLowerCase();

        const isPaid = Boolean(c.paymentStatus);

        if (filterValue === "paid" || filterValue === "true") {
          return isPaid === true;
        }
        if (filterValue === "unpaid" || filterValue === "false") {
          return isPaid === false;
        }

        const statusText = isPaid ? "paid" : "unpaid";
        return statusText.includes(filterValue);
      })();

    // Employee filter
    const employeeMatch =
      !filters.employee ||
      (c.employee &&
        c.employee.toLowerCase().includes(filters.employee.toLowerCase()));
    return (
      nameMatch &&
      typeMatch &&
      statusMatch &&
      startDateMatch &&
      feeMatch &&
      paymentMatch &&
      employeeMatch
    );
  });

  const getDateSafe = (ts) =>
    ts?.seconds ? new Date(ts.seconds * 1000) : new Date(0);

  if (sortOption === "startDateDesc")
    filteredCases.sort(
      (a, b) => getDateSafe(b.startDate) - getDateSafe(a.startDate)
    );

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
      });
    }
    return dateTimeStr;
  };

  if (searchQuery) {
    filteredCases = filteredCases.filter((c) =>
      c.employee?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const formatFee = (fee) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(fee || 0);
  };
  const updateFilter = (column, value) => {
    setFilters((prev) => ({ ...prev, [column]: value }));
  };

  const clearFilter = (column) => {
    setFilters((prev) => ({ ...prev, [column]: "" }));
  };

  const clearAllFilters = () => {
    setFilters({
      name: "",
      caseType: "",
      caseStatus: "",
      startDate: "",
      fee: "",
      paymentStatus: "",
      employee: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((f) => f !== "");

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border border-gray-500 text-sm text-gray-800">
        <thead className="bg-gray-300 text-left">
          <tr>
            <th
              className={`px-4 py-2 border-b border-gray-400 ${
                hide_columns.name ? "hidden" : ""
              }`}
            >
              Name
              <ColumnFilter
                column="name"
                label="Name"
                filterValue={filters.name}
                onFilterChange={updateFilter}
                onClearFilter={clearFilter}
              />
            </th>
            <th
              className={`px-4 py-2 border-b border-gray-400 ${
                hide_columns.caseType ? "hidden" : ""
              }`}
            >
              Case Type
              <ColumnFilter
                column="caseType"
                label="case Type"
                filterValue={filters.caseType}
                onFilterChange={updateFilter}
                onClearFilter={clearFilter}
              />
            </th>
            <th
              className={`px-4 py-2 border-b border-gray-400 ${
                hide_columns.caseStatus ? "hidden" : ""
              }`}
            >
              Case Status
              <ColumnFilter
                column="caseStatus"
                label="Case Status"
                filterValue={filters.caseStatus}
                onFilterChange={updateFilter}
                onClearFilter={clearFilter}
              />
            </th>
            <th
              className={`px-4 py-2 border-b border-gray-400 ${
                hide_columns.startDate ? "hidden" : ""
              }`}
            >
              Start Date
              <ColumnFilter
                column="startDate"
                label="Start Date"
                filterValue={filters.startDate}
                onFilterChange={updateFilter}
                onClearFilter={clearFilter}
              />
            </th>
            <th
              className={`px-4 py-2 border-b border-gray-400 ${
                hide_columns.fee ? "hidden" : ""
              }`}
            >
              Fee
              <ColumnFilter
                column="fee"
                label="Fee"
                filterValue={filters.fee}
                onFilterChange={updateFilter}
                onClearFilter={clearFilter}
              />
            </th>
            <th
              className={`px-4 py-2 border-b border-gray-400 ${
                hide_columns.paymentStatus ? "hidden" : ""
              }`}
            >
              Payment Status
              <ColumnFilter
                column="paymentStatus"
                label="Payment Status"
                filterValue={filters.paymentStatus}
                onFilterChange={updateFilter}
                onClearFilter={clearFilter}
              />
            </th>
            <th
              className={`px-4 py-2 border-b border-gray-400 ${
                hide_columns.employee ? "hidden" : ""
              }`}
            >
              Employee
              <ColumnFilter
                column="employee"
                label="Employee"
                filterValue={filters.employee}
                onFilterChange={updateFilter}
                onClearFilter={clearFilter}
              />
            </th>
            <th
              className={`px-4 py-2 border-b border-gray-400 ${
                hide_columns.notes ? "hidden" : ""
              }`}
            >
              Notes
            </th>
            <th
              className={`px-4 py-2 border-b border-gray-400 ${
                hide_columns.action ? "hidden" : ""
              }`}
            >
              Actions
            </th>
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
                <td
                  className={`px-4 py-2 ${hide_columns.name ? "hidden" : ""}`}
                >
                  {caseItem.name || "N/A"}
                </td>
                <td
                  className={`px-4 py-2 ${
                    hide_columns.caseType ? "hidden" : ""
                  }`}
                >
                  {caseItem.caseType || "N/A"}
                </td>
                <td
                  className={`px-4 py-2 ${
                    hide_columns.caseStatus ? "hidden" : ""
                  }`}
                >
                  {caseItem.caseStatus || "N/A"}
                </td>
                <td
                  className={`px-4 py-2 ${
                    hide_columns.startDate ? "hidden" : ""
                  }`}
                >
                  {formatDateTime(caseItem.startDate)}
                </td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    hide_columns.fee ? "hidden" : ""
                  }`}
                >
                  {formatFee(caseItem.fee)}
                </td>
                <td
                  className={`px-4 py-2 ${
                    hide_columns.paymentStatus ? "hidden" : ""
                  }`}
                >
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
                <td
                  className={`px-4 py-2 ${
                    hide_columns.employee ? "hidden" : ""
                  }`}
                >
                  {caseItem.employee || "N/A"}
                </td>
                <td
                  className={`px-4 py-2 ${hide_columns.notes ? "hidden" : ""}`}
                >
                  {caseItem.labels?.length > 0
                    ? `${caseItem.labels.length} label(s)`
                    : "No labels"}
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
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => {
                                  setSelectedCase(caseItem);
                                  setIsDetailsOpen(true);
                                }}
                                className={`${
                                  active ? "bg-gray-100" : ""
                                } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                              >
                                Details
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => {
                                  const confirmed = window.confirm(
                                    "Are you sure you want to remove?"
                                  );
                                  if (!confirmed) return;
                                  deleteCaseRecord(caseItem.id);
                                }}
                                className={`${
                                  active ? "bg-gray-100" : ""
                                } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                              >
                                Remove
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
      {isDetailsOpen && selectedCase && (
        <CaseDetails
          open={isDetailsOpen}
          setIsOpen={setIsDetailsOpen}
          caseDataProp={selectedCase}
        />
      )}
    </div>
  );
}

export default MyCaseTable;
