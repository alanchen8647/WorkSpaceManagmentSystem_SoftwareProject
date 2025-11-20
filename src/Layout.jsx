import Navbar from './components/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'

// Layout component that includes Navbar and wraps protected routes
export default function Layout() {
    return (
        <>
                <ProtectedRoute>
                    <Navbar />
                    <main className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-28'>
                        <Outlet />
                    </main>
                </ProtectedRoute>
        </>
    )
}