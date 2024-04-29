import React, { useEffect, useState } from 'react'
// import Layouts from '@/Components/layouts/lay'
import Layout from '@/Components/layouts/Layout'
import axios from 'axios'
const SupervisorScrutiny = () => {

    const [list, setList] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {

        axios.get("/students/supervisor/scrutiny")
            .then((res) => {
                setList(res.data)
            })
            .catch((error) => {
                setError(error.message)
            })
    }, [])



    return (
        <div>
            <Layout>
                <div className='bg-white'>
                    <h1 className='text-slate-700 text-3xl m-8 font-bold pt-5 mt-0'>Students</h1>
                    <h3 className='text-slate-700 ml-12 text-xl'>Supervisor Student Scrutiny</h3>
                    <nav
                        className="relative flex w-full flex-wrap items-center justify-between bg-slate-700 py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
                        <div className="flex w-full  flex-wrap items-center justify-between px-3">
                            <div className="mx-72">
                                <a
                                    className="text-xl font-semibold ml-0 text-white dark:text-neutral-200"
                                    href="/supervisor"
                                >All</a
                                >

                                <a
                                    className="text-xl font-semibold ml-24 text-white dark:text-neutral-200"
                                    href="#"
                                >Scrutiny</a
                                >
                                <a
                                    className="text-xl font-semibold ml-24 text-white dark:text-neutral-200"
                                    href="#"
                                >Slot Allocation</a
                                >

                                <a
                                    className="text-xl font-semibold ml-24 text-white dark:text-neutral-200"
                                    href="#"
                                >Viva</a
                                >

                                <a
                                    className="text-xl font-semibold ml-24 text-white dark:text-neutral-200"
                                    href="#"
                                >Results</a
                                >
                            </div>
                        </div>
                    </nav>
                    <div className='container-fluid border-2 border-blue-700 mt-2 rounded-2xl'>
                        <form>
                            <div class="grid gap-6 mb-6 md:grid-cols-2 ml-12">

                                <div>
                                    <label htmlFor="Semesters" class="block mb-2 mt-4 text-sm font-medium text-slate-600 dark:text-white">Semesters</label>
                                    <select id="Semesters"
                                        // value={selectedSemester}
                                        // onChange={handleSemesterChange}
                                        className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-500 focus:outline-none text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Select</option>
                                        {/* {semester && semester.map((semesterItem) => (
                                        <option key={semesterItem.id} value={semesterItem.id}>
                                            {semesterItem.code}
                                        </option>
                                    ))} */}

                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="Sorted By" className="block mb-2 mt-4 text-sm font-medium text-slate-600  dark:text-white">
                                        Sorted By
                                    </label>
                                    <select
                                        id="Sorted By"
                                        className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-500 focus:outline-none text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    // value={selectedSortBy}
                                    // onChange={handleSortByChange}
                                    >
                                        <option value="" selected>
                                            Select
                                        </option>
                                        <option value="name">Name</option>
                                        <option value="vuid">VUID</option>
                                        <option value="semesterCode">Semester Code</option>
                                        <option value="groupid">Group ID</option>
                                    </select>
                                </div>


                                <div>
                                    <label htmlFor="Project" class="block mb-2 mt-4 text-sm font-medium text-slate-600 dark:text-white">Project</label>
                                    <select
                                        // id="Project"
                                        // value={selectedSupervisor}
                                        // onChange={handleSupervisorChange}
                                        className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-500 focus:outline-none text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Select</option>
                                        {/* {supervisor && supervisor.map((supervisorItem) => (
                                        <option key={supervisorItem.id} value={supervisorItem.id}>
                                            {supervisorItem.name}
                                        </option>
                                    ))} */}

                                    </select>
                                </div>





                            </div>

                            <div>
                                <button type='button' className='bg-blue-700 rounded-xl w-40 px-6 text-white h-10 float-right mr-96 -mt-14'>Reset</button>
                                <button type='submit' className='bg-blue-700 rounded-xl w-40 px-6 text-white h-10 float-right mr-52 -mt-14'>Apply</button>
                            </div>
                        </form>
                    </div>
                    <div className='bg-gray-500 mt-2 h-16 w-full'>
                        <button
                            type="button"
                            className="inline-block float-right mr-12 rounded w-52 bg-blue-900 mt-3 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                        ><a href='/students/add'>
                                Submit
                            </a></button>
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
                                <tr class="bg-white border-b text-center text-blue-700 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td class="w-4 px-14">
                                        <div class="flex items-center">
                                            <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <td scope="row" class="px-6 py-4 ">
                                        1
                                    </td>
                                    <td class="px-6 py-4">
                                        Umair
                                    </td>
                                    <td class="px-6 py-4">
                                        Viva Scheduling
                                    </td>
                                    <td class="px-6 py-4">
                                        VLHR15
                                    </td>
                                    <td class="px-6 py-4">
                                        Lahore
                                    </td>
                                    <td class="px-6 py-4">
                                        Eligibile
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
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                            <path fill-rule="evenodd" d="M10.5 3A1.501 1.501 0 0 0 9 4.5h6A1.5 1.5 0 0 0 13.5 3h-3Zm-2.693.178A3 3 0 0 1 10.5 1.5h3a3 3 0 0 1 2.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15Z" clip-rule="evenodd" />
                                        </svg>

                                    </td>
                                </tr>
                                <tr class="bg-white border-b text-center text-blue-700 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td class="w-4 px-14">
                                        <div class="flex items-center">
                                            <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <td scope="row" class="px-6 py-4 ">
                                        1
                                    </td>
                                    <td class="px-6 py-4">
                                        Umair
                                    </td>
                                    <td class="px-6 py-4">
                                        Viva Scheduling
                                    </td>
                                    <td class="px-6 py-4">
                                        VLHR15
                                    </td>
                                    <td class="px-6 py-4">
                                        Lahore
                                    </td>
                                    <td class="px-6 py-4">
                                        Eligibile
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
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                            <path fill-rule="evenodd" d="M10.5 3A1.501 1.501 0 0 0 9 4.5h6A1.5 1.5 0 0 0 13.5 3h-3Zm-2.693.178A3 3 0 0 1 10.5 1.5h3a3 3 0 0 1 2.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15Z" clip-rule="evenodd" />
                                        </svg>

                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default SupervisorScrutiny