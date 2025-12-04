import {realtimeDb} from "../private/firebase.jsx";
import { ref, set, onValue, push, query, orderByChild } from "firebase/database";

// Function to add new user data to the Realtime Database
export const addNewUserData = async (userId, userData) => {
    try {
        await set(ref(realtimeDb, 'users/' + userId), userData);
        console.log("User data added successfully for userId:", userId);
    } catch (error) {
        console.error("Error adding user data:", error);
    }
}

// Function to listen to changes in user clock events
export const listenToClockEvents = (callback) => {
    const clockDataRef = ref(realtimeDb, 'users/');
    return onValue(clockDataRef, (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
}

// Function to add a clock ticket to the Realtime Database
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

// Function to listen to clock tickets ordered by clock-out time
export const listenToClockTickets = (callback) => {
    const clockTicketsRef = ref(realtimeDb, 'clockTickets/');
    const sortedQuery = query(clockTicketsRef, orderByChild('clockOut'));
    return onValue(sortedQuery, (snapshot) => {
        const dataObject = snapshot.val();
        const dataArray = Object.keys(dataObject).map(key => ({
        id: key,
        ...dataObject[key]
      }));
        const data = dataArray.reverse()
        callback(data);
    });
}