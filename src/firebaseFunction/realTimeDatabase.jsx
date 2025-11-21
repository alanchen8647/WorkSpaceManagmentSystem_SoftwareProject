import {realtimeDb} from "../private/firebase.jsx";
import { ref, set, onValue } from "firebase/database";

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