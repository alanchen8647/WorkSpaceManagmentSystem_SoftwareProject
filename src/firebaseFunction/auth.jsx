import {auth} from "../private/firebase.jsx";
import {signInWithEmailAndPassword} from "firebase/auth";

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error logging in:", error);
    }
};

export const logoutUser = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

export const getCurrentUser = () => {
    return auth.currentUser;
}