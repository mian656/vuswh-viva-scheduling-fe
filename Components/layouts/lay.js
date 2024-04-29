import Footer from '@/Components/Footer'
import Header from '@/Components/Header'
import React from 'react'

function Layouts({ children }) {
    return (
        <div>
            <Header />
            <>
                <div className="flex min-h-screen  text-white -mt-20">
                    <div className="hidden md:flex flex-col w-64 ">

                        <div className="shadow-lg shadow-right shadow-blue-950 flex items-center space-x-1 px-5 h-16  bg-blue-900 ">
                            <button className=" focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:bg-blue-400" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <span className="text-white font-bold uppercase ">Admin</span>
                        </div>
                        <div className="flex flex-col flex-1 overflow-y-auto">
                            <nav className="flex-1 px-5 py-5 bg-blue-900 text-lg">
                                
                         <div className='relative  text-blue-700 overflow-hidden rounded-2xl'>
                        <input type='checkbox' className='absolute peer top-0 inset-x-0 w-full h-12 z-10  cursor-pointer opacity-0' />
                        <div className=' h-12 w-full pl-5 flex items-center'>
                            <a href="/users" className="flex items-center px-4 py-2 text-gray-100 hover:bg-blue-400">
                                <h1 className='text-lg font-bold text-white'>Users</h1>
                                </a>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-white w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            </div>
                            <div className='text-blue-700 overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-40'>
                            <a href="/users/create/" className="flex items-center px-4 py-2 text-gray-100 hover:bg-blue-400">Register User</a>
                            </div>
                            </div>
                                 
                                
                                <a href="/roles" className="text-lg font-bold text-white hover:bg-blue-400">
                                    Roles
                                </a>
                                <a href="/semesters" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-blue-400">
                                    Semesters
                                </a>
                                <a href="/provinces" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-blue-400">
                                    Provinces
                                </a>
                                <a href="/cities" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-blue-400">
                                    Cities
                                </a>
                            </nav>
                        </div>
                    </div>
                    <div>{children}</div>
                </div>
            </>
            </div>

    )
}

export default Layouts;
