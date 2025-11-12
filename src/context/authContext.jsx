// This context provides authentication state and functions to the application
import { createContext, useContext, useState, useEffect } from "react";
import { listenToAuthChanges } from "../firebaseFunction/auth";

const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the app and provide auth state
// Child Components can access user and loading state via useAuth()
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Listen to authentication state changes once when the page loads
    useEffect(() => {
        const unsubscribe = listenToAuthChanges((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    // Value provided to consuming components
    const value = {
        user: currentUser,
        loading
    };

    // Render the provider with the auth state
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}