import { getDatabase, ref, push, set, serverTimestamp } from "firebase/database";

const db = getDatabase();

function recordClockIn(userId) {
  const clockInsRef = ref(db, 'clock_ins');
  const newClockInRef = push(clockInsRef); // Generates a unique ID for each clock-in

  set(newClockInRef, {
    userId: userId,
    timestamp: serverTimestamp(), // This tells Firebase to use the server's time
    eventType: 'clock_in'
  })
  .then(() => {
    console.log("Clock-in recorded successfully!");
  })
  .catch((error) => {
    console.error("Error recording clock-in: ", error);
  });
}