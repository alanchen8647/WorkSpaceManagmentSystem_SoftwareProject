import { getDatabase, ref, push, update, set, serverTimestamp } from "firebase/database";

const db = getDatabase();

function recordClockIn(CurrentUser) {
  // Construct the reference to the user's specific clock_ins node
  const userClockInsRef = ref(db, `clock_ins/${CurrentUser.uid}`);
  const newClockInRef = push(userClockInsRef); // Generates a unique ID *under the user's UID*

  const currentShiftId = newClockInRef.key;
  localStorage.setItem('currentShiftId', currentShiftId);

  set(newClockInRef, {
    // No need to store UserId here as it's already in the path structure
    user: CurrentUser.email,
    clockInTimestamp: serverTimestamp(),
    ClockInLocalTime: new Date().toLocaleString(),
  })
  .then(() => {
    console.log("Clock-in recorded successfully! Shift ID:", currentShiftId);
  })
  .catch((error) => {
    console.error("Error recording clock-in: ", error);
    localStorage.removeItem('currentShiftId');
  });
}

function recordClockOut(CurrentUser) { // Pass CurrentUser to get the UID
  const currentShiftId = localStorage.getItem('currentShiftId');
  if (!currentShiftId) {
    console.warn("No active clock-in found to record clock-out for.");
    return;
  }

  // Construct the reference to the specific clock-in record under the user's UID
  const shiftRef = ref(db, `clock_ins/${CurrentUser.uid}/${currentShiftId}`);

  update(shiftRef, {
    clockOutTimestamp: serverTimestamp(),
    ClockOutLocalTime: new Date().toLocaleString(),
  })
  .then(() => {
    console.log("Clock-out recorded successfully for shift ID:", currentShiftId);
    localStorage.removeItem('currentShiftId');
  })
  .catch((error) => {
    console.error("Error recording clock-out: ", error);
  });
}

export { recordClockIn, recordClockOut };
