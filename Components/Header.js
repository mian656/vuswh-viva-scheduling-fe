import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const menuRef = useRef();
  const imgRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        imgRef.current &&
        !imgRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    // <></>
    // <div className="flex flex-col sm:flex-row h-36 text-white">

    //   {/* Header */}
    //   <div className="flex flex-col sm:flex-row flex-1 overflow-y-auto">
    //     <nav className="shadow-sm shadow-amber-200 flex items-center justify-between h-16 bg-blue-600 border-b border-gray-400 sm:w-full">
    //       <div className="flex items-center px-4">
    //         <Image src="/logo.png" alt="viva" height={30} width={80}></Image>
    //         <h2 className="text-white hover:text-gray-300 mt-5 font-bold uppercase ml-2 sm:ml-0">Viva Scheduling</h2>
    //       </div>
    //       <div className="flex items-center pr-4 mt-2 sm:mt-0">
    //         {user && (
    //           <>
    //             <h6 className="text-white hover:text-gray-300">{user.username}</h6>
    //             <div className="relative">
    //               <div
    //                 ref={imgRef}
    //                 onClick={() => setOpen(!open)}
    //                 className="flex items-center text-hover:text-gray-300 focus:outline-none focus:text-gray-700 cursor-pointer"
    //               >
    //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-16 h-16">
    //                   <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    //                 </svg>
    //               </div>
    //               {open && (
    //                 <div ref={menuRef} className="bg-white w-48 sm:w-auto shadow-lg absolute right-2 top-16">
    //                   <ul>
    //                     <li
    //                       onClick={() => {
    //                         setOpen(false);
    //                         /* Handle change password logic */
    //                       }}
    //                       className="p-2 text-lg text-black cursor-pointer rounded hover:bg-blue-100"
    //                     >
    //                       <a href='/users/change-password'>Change Password</a>
    //                     </li>
    //                     <li
    //                       onClick={handleLogout}
    //                       className="p-2 text-lg text-black cursor-pointer rounded hover:bg-blue-100"
    //                     >
    //                       Logout
    //                     </li>
    //                   </ul>
    //                 </div>
    //               )}
    //             </div>
    //           </>
    //         )}
    //       </div>
    //     </nav>
    //   </div>

    // </div>



    <nav class="bg-slate-300 border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <div class="text-center">
          <button class="text-black  font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation" aria-controls="drawer-navigation">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>

          </button>
        </div>
        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.png" alt="viva" height={60} width={70} class="h-8" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap uppercase italic dark:text-white">Viva Scheduling</span>
        </a>
        <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">


          {user && (
            <>
              <h3 className="text-black text-xl font-semibold m-4 text- hover:text-lg">{user.username}</h3>
            </>
          )}
          <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
            <span class="sr-only">Open user menu</span>
            <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
          </button>
          <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow" id="user-dropdown">
            <div class="px-4 py-3">

            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
              <li
                onClick={() => {
                  setOpen(false);
                  /* Handle change password logic */
                }}
                className="p-2 text-lg text-black cursor-pointer rounded hover:bg-blue-100"
              >
                <a href='/users/change-password'>Change Password</a>
              </li>

              <li
                onClick={handleLogout}
                className="p-2 text-lg text-black cursor-pointer rounded hover:bg-blue-100"
              >
                Logout
              </li>
            </ul>
          </div>

        </div>
      </div>
    </nav >

  );
};

export default Header;
