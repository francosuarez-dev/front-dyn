import { useState } from 'react'
import { Link } from 'react-router-dom'
import SidebarDrawer from './Sidebar'
import margaLogo from '../assets/logo-c.png'
import listMenu from './MenuItems'

const Header = () => {
    const [isOpen, setIsopen] = useState(false)
    const handleClose = () => setIsopen(false)

    return (
        <>
            <header className="sticky top-0 w-full shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <nav className="container mx-auto px-4 py-3">
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                            <img src={margaLogo} className="mr-3 h-9" alt="Margarita Logo" />
                            <span className='text-xl font-bold text-white'>Margarita Tickets</span>
                        </div>
                        <div className='hidden md:flex items-center space-x-4'>
                            {listMenu.map((menu,i) => (
                                <Link key={i} to={menu.path} className='text-white font-semibold hover:text-blue-600'>{menu.text}</Link>
                            ))}
                        </div>
                        <div className="md:hidden flex items-center">
                            <button className="text-gray-800 focus:outline-none" onClick={() => setIsopen(true)}>
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="md:hidden">
                <SidebarDrawer isOpen={isOpen} handleClose={handleClose} />
            </div>
        </>
    )
}
export default Header