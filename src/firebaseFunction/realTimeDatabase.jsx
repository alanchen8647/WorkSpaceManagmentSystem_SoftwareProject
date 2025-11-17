import { realtimeDb } from "../private/firebase";
import {ref, set} from "firebase/database";

// Update the clock-in status for a specific user
export const updateClockInStatus = async (userId, status) => {
    try {
        const userStatusRef = ref(realtimeDb, `users/${userId}/clockInStatus`);
        await set(userStatusRef, status);
        console.log("Clock-in status updated successfully for user:", userId);
    } catch (error) {
        console.error("Error updating clock-in status:", error);
    }
}

// Get a reference to the clock-in status of a specific user
export const getClockInStatusRef = (userId) => {
    return ref(realtimeDb, `users/${userId}/clockInStatus`);
}

// Get a reference to all users data
export const getAllUsersData = () =>{
    return ref(realtimeDb, `users/`);
}