import {createNewUser} from "../../firebaseFunction/auth.jsx";
import {addNewUserData} from "../../firebaseFunction/realTimeDatabase.jsx";
import { createNewUserRecord } from "../../firebaseFunction/cloudDatabase.jsx";

export default async function createUser(admin ,username, email, password, isAdmin) {
    try {
        // Ensure the admin is authenticated
        if (!admin) {
            throw new Error("Only authenticated admins can create new users.");
        }
        createNewUser(email, password).then((newUser) => {
            console.log("New user created with UID:", newUser.uid);
            // Here you can add additional logic to store the username and role in your database
            addNewUserData(newUser.uid, { ClockInAt: null, clockInStatus: false});
            createNewUserRecord(newUser.uid, { admin: isAdmin, userName: username,caseDoneToday
             : 0, cashCollectedToday: 0, onlinePayment:0,  });
        }).catch((error) => {
            console.error("Error creating new user:", error);
        });
    } catch (error) {
        console.error("Error creating user:", error);
    }
}