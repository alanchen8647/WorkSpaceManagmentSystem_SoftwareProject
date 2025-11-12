import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

// ProtectedRoute component to guard routes that require authentication
export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    // Show loading indicator while auth state is being determined
    if (loading) {
        return <div>Loading...</div>;
    }

    // If no user is authenticated, redirect to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If user is authenticated, render the protected component
    return children;
}