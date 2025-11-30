import { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext.jsx';
import TimesheetForm from './popUpForms/timesheetForm.jsx';
import ClockTickets from './clockTickets.jsx';
import {listenToClockTickets} from "../firebaseFunction/realTimeDatabase.jsx";

function ClockTable() {
  const [clockTicketsData, setClockTicketsData] = useState({});

  useEffect(()=>{
    const unsubscribe = listenToClockTickets((data) => {
      setClockTicketsData(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
    <div className="flex items-center justify-end mt-2 mb-2  ">
      <TimesheetForm />
    </div>
    <div class="overflow-x-auto max-w-full pt-1">
    <table class="min-w-full border border-gray-500 text-sm text-gray-800">
      <thead class="bg-gray-300 text-left">
        <tr>
          <th class="px-4 py-2 border-b border-gray-400">Date</th>
          <th class="px-4 py-2 border-b border-gray-400">Employee Name</th>
          <th class="px-4 py-2 border-b border-gray-400">Clock In Time</th>
          <th class="px-4 py-2 border-b border-gray-400">Clock Out Time</th>
          <th class="px-4 py-2 border-b border-gray-400">Case Done</th>
          <th class="px-4 py-2 border-b border-gray-400">Cash Collected</th>
          <th class="px-4 py-2 border-b border-gray-400">Online Payment</th>
          <th class="px-4 py-2 border-b border-gray-400">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-300">
        {clockTicketsData && Object.entries(clockTicketsData).length > 0 ? (
          Object.entries(clockTicketsData).map(([ticketId, ticket]) => (
            <ClockTickets key={ticketId} {...ticket} />
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center py-4">
              No Data Available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
    </>
  )
}

export default ClockTable