import React, { useState, useEffect } from 'react'; 
import { recordClockIn, recordClockOut } from './../firebaseFunction/clockin.jsx'; 
import {Clock} from './clock.jsx';

const LOCAL_STORAGE_SHIFT_KEY = 'currentShiftId'; 

function TimeCard({ getCurrentUser }) {
  // Initialize state using the correct localStorage key
  const [Clockin, setClockin] = useState(Boolean(localStorage.getItem(LOCAL_STORAGE_SHIFT_KEY)));

  const [clockInLocalTime, setClockInLocalTime] = useState(
    localStorage.getItem("clockin_localtime") || ""
  )
  const [clockOutLocalTime, setClockOutLocalTime] = useState(
    localStorage.getItem("clockout_localtime") || ""
  )
  

  const handleClockInOut = async () => { // Make async to await operations
    const currentUser = getCurrentUser;
    if (!currentUser) {
      console.warn("No user logged in.");
      return; 
    }

    const isClockedIn = Clockin;

    try {
      if (!isClockedIn) {
        await recordClockIn(currentUser); // Await the async function
        setClockInLocalTime(localStorage.getItem('clockinlocaltime'));
      } else {
        await recordClockOut(currentUser); // Await the async function
        const start = new Date(clockInLocalTime)
        const end = new Date(clockOutLocalTime)
        const diffMs = start - end;
        const diffMinutes = Math.floor(diffMs / 1000 / 60);
        const diffSeconds = Math.floor(diffMs / 1000);
        alert(
          `Your clock in time is: ${clockInLocalTime}\nYour clock out time is: ${clockOutLocalTime}\nTotal time: ${diffMinutes} minutes ${diffSeconds} seconds`
        );
        setClockOutLocalTime(localStorage.getItem('clockoutlocaltime'));
      }
      // Only toggle the state if the database operation was successful
      setClockin(!isClockedIn);
    } catch (error) {
      console.error("Error during clock in/out operation:", error);
      // You might want to revert UI state or show an error to the user
    }
  };

  return (
    <>
      <div className="flex items-center justify-start mb-4 w-full">
        <button
          type="button"
          onClick={handleClockInOut}
          className={`mr-4 px-10 py-2 text-white rounded transition
            ${Clockin ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
          `}
        >
          {Clockin ? "Clock Out" : "Clock In"}
        </button>
        <p className="text-gray-800 px-3 py-2 text-sm font-medium"> 
          {!Clockin ? (
            
              <a>Remember to Clock in before working!</a>
            
          )   : (
            <span>
              Clocked in at: {clockInLocalTime}
            </span>
          ) }
          </p>
        <div className='flex item-center ml-auto'>
          <p className="text-gray-800 px-3 py-2 text-sm font-medium">Current Time:</p>
        <Clock />
        </div>
      </div>
    </>
  );
}

export default TimeCard; 