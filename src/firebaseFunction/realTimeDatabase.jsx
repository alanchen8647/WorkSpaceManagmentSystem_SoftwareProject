import {realtimeDb} from "../private/firebase.jsx";
import { ref, set, onValue, push } from "firebase/database";

export const addNewUserData = async (userId, userData) => {
    try {
        await set(ref(realtimeDb, 'users/' + userId), userData);
        console.log("User data added successfully for userId:", userId);
    } catch (error) {
        console.error("Error adding user data:", error);
    }
}

export const listenToClockEvents = (callback) => {
    const clockDataRef = ref(realtimeDb, 'users/');
    return onValue(clockDataRef, (snapshot) => {
        const data = snapshot.val();
        // console.log("Clock Events Data:", data);
        callback(data);
    });
}

export const addClockTicket = async (clockData) => {
    try {
        const ClockRef = ref(realtimeDb, 'clockTickets/');
        const newRef = push(ClockRef);
        await set(newRef, clockData);
        console.log("Clock ticket added successfully with ID:", clockData.ticketId);
    } catch (error) {
        console.error("Error adding clock ticket:", error);
    }
}

export const listenToClockTickets = (callback) => {
    const clockTicketsRef = ref(realtimeDb, 'clockTickets/');
    return onValue(clockTicketsRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
}