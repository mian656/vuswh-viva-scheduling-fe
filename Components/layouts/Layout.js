import Footer from '@/Components/Footer'
import Header from '@/Components/Header'
import React from 'react'
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";


function Layout({ children }) {
    const { user } = useAuth();
    const router = useRouter();

    console.log("layout user checking", user);

    const getSidebarLinks = () => {
        if (user) {
            const roles = user.roles.map((role) => role.name.toLowerCase());
            const allLinks = [];

            roles.forEach((role) => {
                switch (role) {
                    case "admin":
                        allLinks.push(
                            { href: "/users", label: "Users" },
                            { href: "/roles", label: "Roles" },
                            { href: "/semesters", label: "Semester" },
                            { href: "/provinces", label: "Provinces" },
                            { href: "/cities", label: "Cities" }
                        );
                        break;
                    case "supervisor":
                        allLinks.push(
                            { href: "/students", label: "Students" },
                            { href: "/vivaschedule", label: "Viva Schedule" },
                            { href: "/scheduleviva", label: "Schedule viva" },
                            { href: "/conductviva", label: "Conduct viva" },
                            { href: "/submitresult", label: "Submit Result" }
                        );
                        break;
                    case "coordinator":
                        allLinks.push(
                            { href: "/supervisors", label: "Supervisors" },
                            { href: "/semesters", label: "Semesters" },
                            { href: "/campuses", label: "Campuses" },
                            { href: "/students", label: "Students" },
                            { href: "/semesterviva", label: "Semester Viva" },
                            { href: "/vivaschedule", label: "Viva Schedule" }
                        );
                        break;
                    // Add additional cases for other roles if needed
                    default:
                        break;
                }
            });

            return allLinks;
        }

        // Return an empty array if user information is not available
        return [];
    };

    const sidebarLinks = getSidebarLinks();

    return (
        <div>
            <Header />
            <div id="drawer-navigation" class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-64 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-navigation-label">
                <div className="shadow-lg shadow-right shadow-blue-950 flex items-center space-x-1 px-5 h-16 ">

                    <span className="text-black font-bold ">{user
                        ? user.roles.map((role) => role.name).join(", ")
                        : "Roles"}</span>
                </div>
                <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close menu</span>
                </button>
                <div class="py-4 overflow-y-auto">
                    <ul class="space-y-2 font-medium">
                        <div className="flex flex-col flex-1 overflow-y-auto">
                            <nav className="flex-1 px-5 py-5 text-lg">
                                {sidebarLinks.map((link, index) => (
                                    <Link key={index} href={link.href}>
                                        <div
                                            className={`flex items-center px-4 py-2 text-black ${router.pathname === link.href
                                                ? "bg-blue-500"
                                                : "hover:bg-blue-400"
                                                }`}
                                        >
                                            {link.label}
                                        </div>
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <li>
                            <button type="button" class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                                </svg>
                                <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">E-commerce</span>
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown-example" class="hidden py-2 space-y-2">
                                <li>
                                    <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products</a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Billing</a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Invoice</a>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
            <div className='flex flex-col flex-1'>
                {children}
            </div>
            <Footer />
        </div>

    )
}

export default Layout;
