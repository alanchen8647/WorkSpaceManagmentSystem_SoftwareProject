import {auth} from "../private/firebase.jsx";
import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";

//pass in user email and password to login, will return user object if successful
export const loginWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

//logout current user when called
export const logoutUser = async () => {
    try {
        await auth.signOut();
        console.log("User logged out successfully.");
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

//get current logged in user, returns null if no user is logged in
export const listenToAuthChanges = (callback) => {
    return onAuthStateChanged(auth, callback);
}
