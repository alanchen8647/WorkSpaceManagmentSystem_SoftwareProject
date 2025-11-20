import { getDatabase, ref, push, update, set, serverTimestamp } from "firebase/database";

const db = getDatabase();

function recordClockIn(CurrentUser) {
  // Construct the reference to the user's specific clock_ins node
  const userClockInsRef = ref(db, `clock_ins/${CurrentUser.uid}`);
  const newClockInRef = push(userClockInsRef); // Generates a unique ID *under the user's UID*

  const currentShiftId = newClockInRef.key;
  localStorage.setItem('currentShiftId', currentShiftId);

  const clockin_localtime = new Date().toLocaleString();
  localStorage.setItem('clockinlocaltime', clockin_localtime);

  set(newClockInRef, {
    // No need to store UserId here as it's already in the path structure
    user: CurrentUser.email,
    clockInTimestamp: serverTimestamp(),
    ClockInLocalTime: clockin_localtime,
  })
  .then(() => {
    console.log("Clock-in recorded successfully! Shift ID:", currentShiftId);
    localStorage.setItem("clockin_localtime", clockin_localtime)
    localStorage.removeItem("clockout_localtime");
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
  const clockout_localtime = new Date().toLocaleString();
  localStorage.setItem('clockoutlocaltime', clockout_localtime);

  update(shiftRef, {
    clockOutTimestamp: serverTimestamp(),
    ClockOutLocalTime: clockout_localtime,
  })
  .then(() => {
    console.log("Clock-out recorded successfully for shift ID:", currentShiftId);
    localStorage.setItem("clockout_localtime", clockout_localtime);
    localStorage.removeItem('currentShiftId');
    localStorage.removeItem('clockin_localtime');
  })
  .catch((error) => {
    console.error("Error recording clock-out: ", error);
  });
}

function logout_remove_local_storage() {
  localStorage.removeItem("clockout_localtime");
  localStorage.removeItem("clockin_localtime");
}

export { recordClockIn, recordClockOut, logout_remove_local_storage};