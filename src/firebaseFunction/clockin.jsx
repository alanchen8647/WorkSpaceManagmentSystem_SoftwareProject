import { ref,get, onValue, push, update, set, serverTimestamp } from "firebase/database";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import {realtimeDb, db} from "../private/firebase.jsx";

function getClockInStatus(CurrentUser , callback) {
  const userClockStatusRef = ref(realtimeDb, `users/${CurrentUser.uid}/clockInStatus`);
  const unsubscribe = onValue(userClockStatusRef, (snapshot) => {
    if (snapshot.exists()) {
      const status = snapshot.val();
      callback(status);
    }
  });
  return unsubscribe;
}

function recordClockIn(CurrentUser) {
  const userClockStatusRef = ref(realtimeDb, `users/${CurrentUser.uid}`);
  const clockInTime = serverTimestamp();

  update(userClockStatusRef, {
    clockInStatus: true,
    lastClockInTime: clockInTime,
    lastClockOutTime: null,
  }).then(() => {
    console.log("User clock-in status updated successfully.");
  }).catch((error) => {
    console.error("Error updating clock-in status: ", error);
  });
  console.log("Clock-in recorded at:", clockInTime);

}

function recordClockOut(CurrentUser) { // Pass CurrentUser to get the UID
  const clockOutTime = serverTimestamp();
  let clockTicket = {
    user: null,
    clockIn: null,
    clockOut: clockOutTime,
    caseDone: null,
    cashCollected: null,
    onlinePayment: null
  }
  const userClockStatusRef = ref(realtimeDb, `users/${CurrentUser.uid}`);
  const clockTicketRef = ref(realtimeDb, `clockTickets/`);
  const docRef = doc(db, "Users", CurrentUser.uid);

  get(userClockStatusRef).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      clockTicket.clockIn = data.lastClockInTime || null;
    } else {
      console.log("No data available for user clock-in time");
    }
  }).then(() => {
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        clockTicket.caseDone = userData.caseDoneToday || 0;
        clockTicket.cashCollected = userData.cashCollectedToday || 0;
        clockTicket.onlinePayment = userData.onlinePayment || 0;
        clockTicket.user = userData.userName || "Unknown User";
      }
    })
  .then(() => {
      const newClockTicketRef = push(clockTicketRef);
      set(newClockTicketRef, clockTicket)
      .then(() => {
        console.log("Clock-out ticket recorded successfully:", clockTicket);
        update(userClockStatusRef, {
          clockInStatus: false,
          lastClockOutTime: clockOutTime,
          lastClockInTime: null,
        }).then(() => {
          console.log("User clock-in status reset successfully after clock-out.");
          updateDoc(docRef, {
            caseDoneToday: 0,
            cashCollectedToday: 0,
            onlinePayment: 0
          }).then(() => {
            console.log("User daily stats reset successfully after clock-out.");
          }).catch((error) => {
            console.error("Error resetting user daily stats: ", error);
          });
        }
        ).catch((error) => {
          console.error("Error resetting clock-in status after clock-out: ", error);
        });
      })
      .catch((error) => {
        console.error("Error recording clock-out ticket: ", error);
      });
    });
  }
  ).catch((error) => {
    console.error("Error retrieving user clock-in time: ", error);
  });



  // // Construct the reference to the specific clock-in record under the user's UID
  // const shiftRef = ref(db, `clock_ins/${CurrentUser.uid}/${currentShiftId}`);

  // update(shiftRef, {
  //   clockOutTimestamp: serverTimestamp(),
  //   ClockOutLocalTime: new Date().toLocaleString(),
  // })
  // .then(() => {
  //   console.log("Clock-out recorded successfully for shift ID:", currentShiftId);
  //   localStorage.removeItem('currentShiftId');
  // })
  // .catch((error) => {
  //   console.error("Error recording clock-out: ", error);
  // });
}



export { recordClockIn, recordClockOut, getClockInStatus };
