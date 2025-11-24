import { useState, useEffect } from 'react';

// Table Component
export function MyCaseTable({ cases }) {
  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return 'N/A';
    if (dateTimeStr.seconds !== undefined && dateTimeStr.nanoseconds !== undefined) {
      const date = new Date(dateTimeStr.seconds * 1000);
      return date.toLocaleString('en-US', { 
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      });
    }
    return dateTimeStr;
  };

  const formatFee = (fee) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
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
            <th className="px-4 py-2 border-b border-gray-400">Has Dependent</th>
            <th className="px-4 py-2 border-b border-gray-400">Start Date</th>
            <th className="px-4 py-2 border-b border-gray-400">End Date</th>
            <th className="px-4 py-2 border-b border-gray-400">Fee</th>
            <th className="px-4 py-2 border-b border-gray-400">Payment Status</th>
            <th className="px-4 py-2 border-b border-gray-400">Employee</th>
            <th className="px-4 py-2 border-b border-gray-400">Notes</th>
          </tr>
        </thead>
        <tbody>
          {!cases || cases.length === 0 ? (
            <tr>
              <td colSpan="10" className="px-4 py-8 text-center text-gray-500">
                No cases found
              </td>
            </tr>
          ) : (
            cases.map((caseItem, index) => (
              <tr 
                key={caseItem.id || index} 
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="px-4 py-2">{caseItem.name || 'N/A'}</td>
                <td className="px-4 py-2">{caseItem.caseType || 'N/A'}</td>
                <td className="px-4 py-2">{caseItem.caseStatus || 'N/A'}</td>
                <td className="px-4 py-2">
                  {caseItem.hasDependent ? 'Yes' : 'No'}
                </td>
                <td className="px-4 py-2">{formatDateTime(caseItem.startDate)}</td>
                <td className="px-4 py-2">{formatDateTime(caseItem.endDate)}</td>
                <td className="px-4 py-2 font-semibold">{formatFee(caseItem.fee)}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    caseItem.paymentStatus 
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                  }`}>
                    {caseItem.paymentStatus ? 'Paid' : 'Unpaid'}
                  </span>
                </td>
                <td className="px-4 py-2">{caseItem.employee || 'N/A'}</td>
                <td className="px-4 py-2">
                  {caseItem.notes?.length > 0 
                    ? `${caseItem.notes.length} note(s)` 
                    : 'No notes'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MyCaseTable;