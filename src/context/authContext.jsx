// This context provides authentication state and functions to the application
import { createContext, useContext, useState, useEffect } from "react";
import { listenToAuthChanges } from "../firebaseFunction/auth";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../private/firebase.jsx";

const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the app and provide auth state
// Child Components can access user and loading state via useAuth()
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Listen to authentication state changes once when the page loads
    useEffect(() => {
        const unsubscribe = listenToAuthChanges((user) => {
            setCurrentUser(user);
        const fetchUserData = async (uid) => {
            try {
                const userDoc = await getDoc(doc(db, "Users", uid));
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                } else {
                    console.log("No such user document!");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        if (user) {
            fetchUserData(user.uid);
        } else {
            setUserData(null);
        }
        setLoading(false);
        });
        return unsubscribe;
    }, []);

    // Value provided to consuming components
    const value = {
        user: currentUser,
        loading,
        userDetail: userData,
    };

    // Render the provider with the auth state
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}