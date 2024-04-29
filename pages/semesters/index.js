import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Layouts from '@/Components/layouts/lay';
import axios from 'axios';
import Layout from "@/Components/layouts/Layout";
import TablePaginationDemo from '@/Components/pagination';

const semester = () => {

    const [semester, setSemester] = useState([]);
    const [error, setError] = useState("");
    const handleReload = () => {
        // Reload the page
        window.location.reload();
    };



    const activeSemester = (e, id) => {
        Swal.fire({
            title: "Activate/ Deactivate Semesters",
            text: "You want to activate or deactivate semesters",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Activate",
            denyButtonText: `Deactivate`
        })
            .then(async (result) => {
                // / Read more about isConfirmed, isDenied below /
                if (result.isConfirmed) {
                    const activate = "/semesters/status/" + id + "?action=activate";
                    await axios.patch(activate);
                    Swal.fire("Saved!", "", "success");
                    // Handle the user's confirmation
                    handleReload();
                }

                else if (result.isDenied) {
                    const deactivate = "/semesters/status/" + id + "?action=deactivate";
                    await axios.patch(deactivate);
                    Swal.fire("Changes are saved", "", "success");
                    // Handle the user's confirmation
                    handleReload();
                }
            })
            .catch(
                (error) => {
                    setError(error.response.data.message)
                    Swal.fire({
                        icon: "error",
                        title: "The following error occured",
                        text: error.response.data.message,
                    });
                })
    }

    const Edit = (id) => {
        const editSemester = '/edit' + id;
        console.log(editSemester)
    }

    const Addsem = () => {
        const addSemester = '/add';
        console.log(addSemester)
    }
    useEffect(() => {
        axios.get("/semesters/pagedata")
            .then((res) => {
                setSemester(res.data.data);
                console.log(res.data.data);
            }
            )
            .catch(
                (error) => {
                    setError(error.message)
                }
            )
    }, [])

    const formatDate = (inputDateString) => {
        const dateObject = new Date(inputDateString);
        const year = dateObject.getFullYear();
        const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(dateObject);
        const day = dateObject.getDate();

        // Combine the formatted values
        const formattedDate = `${day}-${month}-${year} `;

        return formattedDate;
    };



    return (
        <Layout>
            {error != "" && <h3>{(Error)}</h3>}

            {/* <div className=" min-[320px]:text-center  w-full md:w-full lg:w-full h-screen md:h-screen lg:h-screen outline-opacity-80 bg-white text-blue-700 border-opacity-5 border-solid border-8 border-blue-800">

                    <h2 className="ml-8 mt-8 font-bold text-3xl">Semesters</h2>
                    <div className='bg-slate-300 h-16'>
                        <a href={'/semesters/add/'}><button
                            onClick={Addsem}
                            type="button"
                            method="post"
                            className="p-2 px-7 rounded-xl  hover:scale-105 inline-block float-right mr-12 w-28 bg-blue-900 mt-3 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                        >
                            + Add

                        </button></a>
                    </div>

                    <table className="justify-center items-center w-full mt-2  border-2 p-5 bg-white text-blue-700 rounded-xl">

                        <thead className="h-20 items-center justify-between " >
                            <tr className='p3 gap-10 items-center justify-between bg-slate-300'>
                                <th scope="col" class="px-6 py-3">
                                    Sr#
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Semester Code
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Start Date
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    End Date
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {semester.map((sem, serial) => (
                                <tr class="text-center" key={sem.id}>

                                    <td scope="row" class="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium ">
                                        {serial + 1}</td>
                                    <td class="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium">
                                        {sem.code}
                                    </td>
                                    <td class="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium">
                                        {sem.start_date}
                                    </td>
                                    <td class="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium">
                                        {sem.end_date}
                                    </td>
                                    <td class="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium flex">
                                        <span onClick={(e) => activeSemester(e, sem.id)}>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" value="" className="sr-only peer " checked={sem.is_active} />
                                                <div className="w-9 h-5 outline outline-gray-400  border-blue-500 peer-focus:outline-none peer-focus:ring-2
                                                 peer-focus:ring-blue-300 dark:peer-focus:ring-sky-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
                                                  peer-checked:after:border-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300
                                                   after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-sky-200">
                                                </div>
                                            </label></span>
                                        <a href={'/semesters/edit/' + sem.id}>
                                            <svg onClick={Edit} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" class="w-6 h-6 ml-4 cursor-pointer" >
                                                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                                            </svg>
                                        </a>
                                    </td>
                                </tr>
                            ))
                            }



                        </tbody>
                    </table>
                </div> */}

            {/* <div class="flex flex-col items-center justify-center w-screen bg-gray-900">
                <h1 class="text-lg text-gray-400 font-medium">2020-21 Season</h1>
                <div class="flex flex-col mt-4 mb-4">
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 align-middle inline-block min-w-full md:px-7 sm:px-6 lg:px-8">
                            <div class="shadow overflow-hidden sm:rounded-lg">
                                <table class="min-w-full text-sm text-gray-400">
                                    <thead class="bg-gray-800 text-xs uppercase font-medium">
                                        <tr>
                                            <th>
                                                SR#
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                Semester Code
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                Start Date
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                End Date
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-gray-800">
                                        {semester.map((sem, serial) => (

                                            <tr class="bg-black bg-opacity-20" key={sem.id}>
                                                <td class="pl-4">
                                                    {serial + 1}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    24
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    10
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    34
                                                </td>
                                                <td class="flex px-6 py-4 whitespace-nowrap">
                                                    <svg class="w-4 fill-current text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                    </svg>
                                                    <svg class="w-4 fill-current text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                    </svg>
                                                    <svg class="w-4 fill-current text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                    </svg>
                                                    <svg class="w-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                                                    </svg>
                                                    <svg class="w-4 fill-current text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                    </svg>
                                                </td>
                                            </tr>

                                        ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}



            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mb-24 ml-5 mr-5 mt-5">
                <h3 className='text-slate-500 text-3xl font-bold m-5'>Semester List</h3>
                <div className='bg-slate-500 h-16'>
                        <a href={'/semesters/add/'}><button
                            onClick={Addsem}
                            type="button"
                            method="post"
                            className="p-2 px-7 rounded-xl  hover:scale-105 inline-block float-right mr-12 w-28 bg-white text-slate-500 mt-3 pb-2 pt-2.5 text-sm font-medium leading-normal  shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                        >
                            + Add

                        </button></a>
                    </div>   

                <table class="w-full text-sm text-left rtl:text-right mt-5 text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" class="px-6 py-3">
                                SR#
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Semester Code
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Start Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                End Date
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {semester.map((sem, serial) => (
                            <tr key={sem.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                <td class="px-6 py-4">
                                    {serial + 1}
                                </td>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {sem.code}
                                </th>

                                <td class="px-6 py-4">
                                    {formatDate(sem.start_date)}
                                    {/* {sem.start_date.toString()} */}
                                </td>
                                <td class="px-6 py-4">
                                    {formatDate(sem.end_date)}
                                </td>
                                <td class="px-6 py-4 h-16 border-blue-800 y-2 text-sm font-medium flex">
                                    <span onClick={(e) => activeSemester(e, sem.id)}>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer " checked={sem.is_active} />
                                            <div className="w-9 h-5 outline outline-gray-400  border-blue-500 peer-focus:outline-none peer-focus:ring-2
                                                 peer-focus:ring-blue-300 dark:peer-focus:ring-sky-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
                                                  peer-checked:after:border-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300
                                                   after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-sky-200">
                                            </div>
                                        </label></span>
                                    <a href={'/semesters/edit/' + sem.id}>
                                        <svg onClick={Edit} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="slate-300" class="w-6 h-6 ml-4 cursor-pointer" >
                                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                                        </svg>
                                    </a>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                {/* <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">1000</span></span>
                    <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                        </li>
                    </ul>
                </nav> */}
            </div>
            <TablePaginationDemo/>
        </Layout>
    )
}
export default semester



