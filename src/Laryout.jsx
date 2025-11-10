import Navbar from './components/Navbar.jsx'
import { Outlet } from 'react-router-dom'

export default function Laryout() {
    return (
        <>
            <Navbar />
            <main className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-28'>
                <Outlet />
            </main>
        </>
    )
}