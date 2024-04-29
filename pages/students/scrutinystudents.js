import React, { useState, useEffect } from 'react'
import Layouts from '@/Components/layouts/lay'
import axios from 'axios'
const scrutinystudents = () => {

    const [list, setList] = useState([])
    const [error, setError] = useState("")
    const [semesters, setSemesters] = useState([])


    useEffect(() => {

        axios.get("/students/scrutiny")
            .then((res) => {

                setList(res.data.pagedata.data)
                console.log(res.data.pagedata)
                setSemesters(res.data.semesters)
                console.log(res.data.semesters)
            })
            .catch((error) => {
                setError(error.message)
            })
    }, [])






    return (
        <div>
            <div>
                <Layouts>
                    <div className="bg-white">
                        <div className="text-blue-700 text-4xl m-8 font-bold mt-0 pt-5">
                            Scrutiny Students
                        </div>
                        <nav className="relative flex w-full flex-wrap items-center justify-between bg-blue-700 py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
                            <div className="flex w-full  flex-wrap items-center justify-between px-3">
                                <div className="mx-16">
                                    <a
                                        className="text-xl font-semibold ml-7 text-white dark:text-neutral-200"
                                        href="/students"
                                    >
                                        All
                                    </a>
                                    <a
                                        className="text-xl font-semibold ml-12 text-white dark:text-neutral-200"
                                        href="/students/openStudents"
                                    >
                                        Open
                                    </a>
                                    <a
                                        className="text-xl font-semibold ml-12 text-white dark:text-neutral-200"
                                        href="/students/scrutinystudents"
                                    >
                                        Scrutiny
                                    </a>
                                    <a
                                        className="text-xl font-semibold ml-12 text-white dark:text-neutral-200"
                                        href="#"
                                    >
                                        Schedule
                                    </a>
                                    <a
                                        class="text-xl font-semibold ml-12 text-white dark:text-neutral-200"
                                        href="#"
                                    >
                                        Slot Allocation
                                    </a>
                                    <a
                                        className="text-xl font-semibold ml-12 text-white dark:text-neutral-200"
                                        href="#"
                                    >
                                        Scheduled
                                    </a>
                                    <a
                                        className="text-xl font-semibold ml-12 text-white dark:text-neutral-200"
                                        href="#"
                                    >
                                        Results
                                    </a>
                                    <a
                                        className="text-xl font-semibold ml-12 text-white dark:text-neutral-200"
                                        href="#"
                                    >
                                        Exams
                                    </a>
                                </div>
                            </div>
                        </nav>
                        <div className="container-fluid border-2 border-blue-700 mt-2 rounded-2xl h">
                            <form>
                                <div class="grid gap-6 mb-6 md:grid-cols-2 ml-20">
                                    <div>
                                        <label
                                            htmlFor="Semesters"
                                            class="block mb-2 mt-4 text-sm font-medium text-blue-500 dark:text-white"
                                        >
                                            Semesters
                                        </label>
                                        <select
                                            id="Semesters"
                                            className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-500 focus:outline-none text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected>Select</option>
                                            {semesters && semesters.map((semesterItem) => (
                                                <option key={semesterItem.id} value={semesterItem.code}>
                                                    {semesterItem.code}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="Sorted by"
                                            class="block mb-2 mt-4 text-sm font-medium text-blue-500 dark:text-white"
                                        >
                                            Sorted by
                                        </label>
                                        <select
                                            id="Sorted by"
                                            className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-500 focus:outline-none text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected>Select</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="Search"
                                            class="block mb-2 text-sm font-medium text-blue-500 dark:text-white"
                                        >
                                            Search
                                        </label>
                                        {/* <select
                                            id="Sorted By"
                                            className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-500 focus:outline-none text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected>Select</option>
                                        </select> */}



                                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                        <div class="relative">
                                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                </svg>
                                            </div>
                                            <input type="search" id="default-search" class="block w-96 focus:outline-none outline outline-2 outline-gray-500 p-4 ps-10  text-sm text-blue-700 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />

                                        </div>


                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="bg-blue-700 rounded-xl w-40 px-6 text-white h-10 float-right mr-96 -mt-14"
                                    >
                                        Reset
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-700 rounded-xl w-40 px-6 text-white h-10 float-right mr-52 -mt-14"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="bg-gray-500 mt-2 h-16 w-full ">
                            <button
                                type="button"
                                className="flex float-right mr-12 rounded w-52 bg-blue-900 mt-3 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-5 mr-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                                Eligibility Date
                            </button>

                        </div>


                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-lg bg-slate-300 text-blue-700  text-center divide-y divide-blue-700 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-14">
                                            <div class="flex items-center">
                                                <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                            </div>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Sr #
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Student
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Project
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Campus
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            City
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Eligible
                                        </th>

                                        <th scope="col" class="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list && list.map((lis, serial) => (
                                        <tr class="bg-white border-b text-center text-blue-700 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={lis.id}>
                                            <td class="w-4 px-14">
                                                <div class="flex items-center">
                                                    <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                                </div>
                                            </td>
                                            <td scope="row" class="px-6 py-4 ">
                                                {serial + 1}
                                            </td>
                                            <td class="px-6 py-4">
                                                <ul>
                                                    <li>{lis.name}</li>
                                                    <li>{lis.vuid}</li>
                                                </ul>
                                            </td>
                                            <td class="px-6 py-4">
                                                <ul>
                                                    <li>{lis.groupid}</li>
                                                    <li>{lis.project_title}</li>
                                                </ul>
                                            </td>
                                            <td class="px-6 py-4">
                                                {lis.campus.code}
                                            </td>
                                            <td class="px-6 py-4">
                                                {lis.city.name}
                                            </td>
                                            <td class="px-6 py-4">
                                                {lis.is_eligible === true && "Eligible"}
                                                {lis.is_eligible === false && "Not Eligible"}
                                                {lis.is_eligible == null && "Not Processed"}
                                            </td>

                                            <td class="flex items-center px-6 py-4">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-6 h-6 justify-between align-middle ml-8 hover:cursor-pointer"
                                                >
                                                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>

                        {/*                         
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg -pt-14">
                            <table className="w-full text-sm text-center divide-y divide-blue-700 rtl:text-right text-gray-500 dark:text-gray-400 mt-3">
                                <thead className="text-lg text-blue-700  bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-12 py-3">
                                            Sr#
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Sr#
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Student
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Project
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Supervisor
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            City
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Eligible
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b text-blue-700 dark:bg-gray-800 dark:border-gray-700">
                                        <td
                                            scope="row"
                                            className="px-6 py-4 font-medium  whitespace-nowrap dark:text-white"
                                        ></td>
                                        <td className="px-6 py-4"></td>
                                        <td className="px-6 py-4"></td>
                                        <td className="px-6 py-4"></td>
                                        <td className="px-6 py-4"></td>
                                        <td className="px-6 py-4"></td>
                                        <td className="px-6 py-4"></td>
                                        <td className="px-6 py-4 flex">
                                           
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-6 h-6 justify-between align-middle ml-8 hover:cursor-pointer"
                                            >
                                                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                <path
                                                    fillRule="evenodd"
                                                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> */}

                    </div>

                </Layouts>
            </div>
        </div>
    )
}

export default scrutinystudents