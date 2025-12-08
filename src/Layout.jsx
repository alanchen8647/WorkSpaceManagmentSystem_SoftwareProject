import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Layout component that includes Navbar and wraps protected routes
export default function Layout() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 mx-auto max-w-7xl px-2 sm:px-6 lg:px-28">
          <Outlet />
        </main>

        <footer className="bg-gray-100 text-gray-700 text-center py-4">
          © 2025 WorkSpaceProject. All rights reserved.
        </footer>
      </div>
    </ProtectedRoute>
  );
}
