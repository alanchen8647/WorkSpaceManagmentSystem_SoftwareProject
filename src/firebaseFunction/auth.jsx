import {auth} from "../private/firebase.jsx";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";

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

export const logoutUser = async () => {
    try {
        await auth.signOut();
        console.log("User logged out successfully.");
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

export const getCurrentUser = () => {
    return auth.currentUser;
}


export const checkIfLoggedIn = () => {
    if (auth.currentUser) {
        return true;
    }
    return false;
}