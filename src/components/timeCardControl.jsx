import React, { useState, useEffect } from 'react'; 
import { recordClockIn, recordClockOut } from '../firebaseFunction/clockin.jsx'; 
import {Clock} from './clock.jsx';
import { getClockInStatus } from '../firebaseFunction/clockin.jsx';

function TimeCard({ getCurrentUser }) {
  // Initialize state using the correct localStorage key
  const [Clockin, setClockin] = useState(false);

  // Effect to fetch and set the initial clock-in status
  useEffect(() => {
    const CurrentUser = getCurrentUser;
    const unsubscribe = getClockInStatus(CurrentUser, (status) => {
      setClockin(status);
    });
    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [getCurrentUser]);

  // Function to handle clock in/out button click
  const handleClockInOut = async () => { // Make async to await operations
    try {
      if (!Clockin) {
        await recordClockIn(getCurrentUser); // Await the async function
      } else {
        await recordClockOut(getCurrentUser); // Await the async function
      }
    } catch (error) {
      console.error("Error during clock in/out operation:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-start mb-4">
        <button
          type="button"
          onClick={handleClockInOut} // CALL THE handleClockInOut FUNCTION
          className={`mr-4 px-10 py-2 text-white rounded transition
            ${Clockin ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
          `}
        >
          {Clockin ? "Clock Out" : "Clock In"}
        </button>
        <p className="text-gray-800 px-3 py-2 text-sm font-medium">Current Time:</p>
        <Clock />
      </div>
    </>
  );
}

export default TimeCard; // Don't forget to export your component