import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React from 'react'

async function fetchindData(data, searchParams) {
    const params = new URLSearchParams(searchParams);
    console.log("checking data for sortby",data)
    if (data.supervisor) {
        params.set('supervisor', data.supervisor);
    }
    if (data.semester) {
        params.set('semester', data.semester);
    }
    if (data.Status) {
        params.set('Status', data.Status);
    }
    if (data.sortedBy) {
        params.set('sortedBy', data.sortedBy);
    }
    if (data.orderBy) {
        params.set('orderBy', data.orderBy);
    }
    const res = await axios.get(`/students/allByCurrActSem?${params.toString()}`);
    // replace(`/students/allByCurrActSem?${params.toString()}`);
    return res.data;
}

export default fetchindData

// fetchindData.js

// import axios from 'axios';

// // Modify the function to use query parameters directly
// const fetchindData = async ({ supervisor, semester, studentstatus, sortBy }) => {
//   const params = new URLSearchParams();

//   if (supervisor) {
//     params.set('Supervisor', supervisor);
//   }
//   if (semester) {
//     params.set('Semester', semester);
//   }
//   if (studentstatus) {
//     params.set('Status', studentstatus);
//   }
//   if (sortBy) {
//     params.set('Sort by', sortBy);
//   }

//   try {
//     const res = await axios.get(`/students/allByCurrActSem?${params.toString()}`);
//     return res.data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// export default fetchindData;


// import React, { useEffect } from 'react'
// import { useState } from 'react';
// import axios from 'axios';
// import Layouts from '@/Components/layouts/lay'
// import TablePagination from '@mui/material/TablePagination';
// import { useSearchParams } from 'next/navigation';
// import fetchindData from './fetchindData';
// import { useRouter } from 'next/router';
// export async function getServerSideProps() {
//     const data = await axios.get("/students/allByCurrActSem");
//     return {
//         props: {
//             data: data.data.allStudentByCurrAct,

//         }
//     }
// }


// const Studentlist = ({ data }) => {

//     const searchParams = useSearchParams();
//     const [list, setList] = useState([]);
//     const [error, setError] = useState("")
//     const [supervisor, setSupervisor] = useState([])
//     const [semester, setSemester] = useState([])
//     const [sortBy, setSortBy] = useState([]);
//     const [meta, setMeta] = useState(data.meta)
//     const [page, setPage] = useState(0)
//     const [studentsPerPage, setstudentsPerPage] = useState(10)
//     const [studentstatus, setStudentstatus] = useState([])
//     const router = useRouter();
//     const [selectedSupervisor, setSelectedSupervisor] = useState('');
//     const [selectedSemester, setSelectedSemester] = useState('');
//     const [selectedStatus, setSelectedStatus] = useState('');
//     const [selectedOrderBy, setSelectedOrderBy] = useState('');
//     const [filteredData, setFilteredData] = useState([]);


//     const setInitialFilteredData = () => {
//         setFilteredData(data.allStudentByCurrAct.data);
//     };
//     useEffect(() => {
//         axios.get("/students/allByCurrActSem")
//             .then((res) => {
//                 setList(res.data.allStudentByCurrAct.data);
//                 setMeta(res.data.meta);
//                 setSupervisor(res.data.supervisors);
//                 setSemester(res.data.semesters);
//                 setStudentstatus(res.data.statuses);
//                 setInitialFilteredData();
//             })
//             .catch((error) => {
//                 setError(error.message)
//             });

//     }, [selectedSupervisor, selectedSemester, selectedStatus, selectedOrderBy])

//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         try {
//     //             const res = await axios.get("/students/allByCurrActSem", {
//     //                 params: router.query, // Pass query parameters to the API request
//     //             });
//     //             setList(res.data.allStudentByCurrAct.data);
//     //             setMeta(res.data.meta);
//     //             setSupervisor(res.data.supervisors);
//     //             setSemester(res.data.semesters);
//     //             setStudentstatus(res.data.statuses);
//     //             setInitialFilteredData(); // Set initial filtered data here
//     //         } catch (error) {
//     //             setError(error.message);
//     //         }
//     //     };
//     //     fetchData();
//     // }, [router.query]);



//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     const searchData = {
//     //         supervisor: selectedSupervisor,
//     //         semester: selectedSemester,
//     //         studentstatus: selectedStatus,
//     //         orderBy: selectedOrderBy,
//     //     };

//     //     try {
//     //         const filteredResponse = await fetchindData(searchData);
//     //         setList(filteredResponse.data);
//     //         setMeta(filteredResponse.meta);
//     //         setFilteredData(filteredResponse.allStudentByCurrAct.data); // Update filtered data here
//     //         // Update the query parameters in the URL when submitting the form
//     //         router.push({
//     //             pathname: router.pathname,
//     //             query: searchData,
//     //         });
//     //     } catch (error) {
//     //         setError(error.message);
//     //     }
//     // };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     const searchData = {
//     //         supervisor: selectedSupervisor,
//     //         semester: selectedSemester,
//     //         studentstatus: selectedStatus,
//     //         orderBy: selectedOrderBy,
//     //     };

//     //     try {
//     //         const filteredResponse = await fetchindData(searchData);
//     //         setList(filteredResponse.data);
//     //         setMeta(filteredResponse.meta);
//     //         setFilteredData(filteredResponse.allStudentByCurrAct.data);

//     //         // Update the query parameters in the URL when submitting the form
//     //         const queryParams = { ...router.query, ...searchData };
//     //         router.push({
//     //             pathname: router.pathname,
//     //             query: queryParams,
//     //         });
//     //     } catch (error) {
//     //         setError(error.message);
//     //     }
//     // };
// mmmmmmmmmmmmmmmmmmmmmmmmmmm



//     const handleSupervisorChange = (e) => {
//         setSelectedSupervisor(e.target.value);
//     };

//     const handleSemesterChange = (e) => {
//         setSelectedSemester(e.target.value);
//     };

//     const handleStatusChange = (e) => {
//         setSelectedStatus(e.target.value);
//     };

//     const handleOrderByChange = (e) => {
//         setSelectedOrderBy(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const searchData = {
//             "supervisor": selectedSupervisor,
//             "semester": selectedSemester,
//             "studentstatus": selectedStatus,
//             "orderBy": selectedOrderBy,
//         };

//         try {
//             const filteredData = await fetchindData(searchData);
//             console.log("Filtered Data:", filteredData);
//             console.log("Filtered Data Array:", filteredData.allStudentByCurrAct.data);
//             console.log(filteredData); // Log the value of filteredData.data
//             setList(filteredData.data);
//             setMeta(filteredData.meta);
//             setFilteredData(filteredResponse.allStudentByCurrAct.data);
//         } catch (error) {
//             setError(error.message);
//         }
//     };




//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangestudentsPerPage = (event) => {
//         setstudentsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const handleSortByChange = (event) => {
//         setSortBy(event.target.value);
//     };
  


//     return (
//         <div>
//             <Layouts>
//                 <div className='bg-white'>
//                     <div className='text-blue-700 mt-0 pt-8 font-bold text-3xl m-8'>Students List</div>
//                     <nav
//                         className="relative flex w-full flex-wrap items-center justify-between bg-blue-700 py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
//                         <div className="flex w-full  flex-wrap items-center justify-between px-3">
//                             <div className="ml-2">
//                                 <a
//                                     className="text-xl font-semibold ml-20 text-white dark:text-neutral-200"
//                                     href="#"
//                                 >All</a
//                                 >
//                                 <a
//                                     className="text-xl font-semibold ml-12 text-white dark:text-neutral-200"
//                                     href="/students/openStudents"
//                                 >Open</a
//                                 >
//                                 <a
//                                     className="text-xl font-semibold ml-12 text-white dark:text-neutral-200"
//                                     href="/students/scrutinystudents"
//                                 >Scrutiny</a
//                                 >
//                                 <a
//                                     className="text-xl font-semibold ml-12 text-white dark:text-neutral-200"
//                                     href="#"
//                                 >Schedule</a
//                                 >
//                                 <a
//                                     class="text-xl font-semibold ml-12 text-white dark:text-neutral-200"
//                                     href="#"
//                                 >Slot Allocation</a
//                                 >
//                                 <a
//                                     className="text-xl font-semibold ml-12 text-white dark:text-neutral-200"
//                                     href="#"
//                                 >Scheduled</a
//                                 >
//                                 <a
//                                     className="text-xl font-semibold ml-12 text-white dark:text-neutral-200"
//                                     href="#"
//                                 >Results</a
//                                 >
//                                 <a
//                                     className="text-xl font-semibold ml-12 text-white dark:text-neutral-200"
//                                     href="#"
//                                 >Exams</a
//                                 >
//                             </div>
//                         </div>
//                     </nav>


//                     <div className='container-fluid border-2 border-blue-700 bg-white rounded-xl mt-2 h'>
//                         <form onSubmit={handleSubmit}>
//                             <div class="grid gap-6 mb-6 md:grid-cols-3 ml-12">
//                                 <div>
//                                     <label htmlFor="Supervisors" class="block mb-2 mt-4 text-sm font-medium text-blue-500 dark:text-white">Supervisors</label>
//                                     <select id="Supervisors"
//                                         value={selectedSupervisor}
//                                         onChange={handleSupervisorChange}
//                                         className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-500 focus:outline-none text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//                                         <option selected>Select</option>
//                                         {supervisor && supervisor.map((supervisorItem) => (
//                                             <option key={supervisorItem.id} value={supervisorItem.id}>
//                                                 {supervisorItem.name}
//                                             </option>
//                                         ))}

//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label htmlFor="Semesters" class="block mb-2 mt-4 text-sm font-medium text-blue-500 dark:text-white">Semesters</label>
//                                     <select id="Semesters"
//                                         value={selectedSemester}
//                                         onChange={handleSemesterChange}
//                                         className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-500 focus:outline-none text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//                                         <option selected>Select</option>
//                                         {semester && semester.map((semesterItem) => (
//                                             <option key={semesterItem.id} value={semesterItem.id}>
//                                                 {semesterItem.code}
//                                             </option>
//                                         ))}

//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label htmlFor="Status" class="block mb-2 text-sm mt-4 font-medium text-blue-500 dark:text-white">Status</label>
//                                     <select id="Status"
//                                         value={selectedStatus}
//                                         onChange={handleStatusChange}
//                                         className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-500 focus:outline-none text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
//                                         <option value="" selected>Select</option>
//                                         {studentstatus && studentstatus.map((status) => (
//                                             <option key={status.id} value={status.id}>
//                                                 {status.student_status}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>


//                                 <div>
//                                     <label htmlFor="Sorted By" className="block mb-2 text-sm font-medium text-blue-500 dark:text-white">
//                                         Sorted By
//                                     </label>
//                                     <select
//                                         id="Sorted By"
//                                         className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-500 focus:outline-none text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

//                                     >
//                                         <option value="" selected>
//                                             Select
//                                         </option>

//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label
//                                         htmlFor="Order By"
//                                         class="block mb-2 text-sm font-medium text-blue-500 dark:text-white"
//                                     >
//                                         Order By
//                                     </label>
//                                     <select
//                                         id="Order By"
//                                         value={selectedOrderBy}
//                                         onChange={handleOrderByChange}
//                                         className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-500 focus:outline-none text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                                     >
//                                         <option selected>Select</option>
//                                         <option value="name">Name</option>
//                                         <option value="vuid">VUID</option>
//                                         <option value="semesterCode">Semester Code</option>
//                                         <option value="groupid">Group ID</option>
//                                     </select>
//                                 </div>
//                                 {filteredData.map((item) => (
//                                     <div key={item.id} className='bg-blue-700 text-blue-700'>
//                                         <p>{item.name}</p>
//                                         <p>{item.description}</p>
//                                         {/* Adjust based on your data structure */}
//                                     </div>
//                                 ))}

//                             </div>

//                             <div>
//                                 <button type='button' className='bg-blue-700 rounded-xl w-40 px-6 text-white h-10 float-right mr-52 -mt-14'>Reset</button>
//                                 <button type='submit' className='bg-blue-700 rounded-xl w-40 px-6 text-white h-10 float-right mr-10 -mt-14'>Apply</button>
//                             </div>
//                         </form>
//                     </div>
//                     <div className='bg-gray-500 mt-2 h-16 w-full'>
//                         <button
//                             type="button"
//                             className="inline-block float-right mr-12 rounded w-52 bg-blue-900 mt-3 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
//                         ><a href='/students/add'>
//                                 + Add Students
//                             </a></button>
//                     </div>
//                     <div className="relative overflow-x-auto shadow-md sm:rounded-lg -pt-14">
//                         <table className="w-full text-sm text-center divide-y divide-blue-700 rtl:text-right text-gray-500 dark:text-gray-400 mt-3">
//                             <thead className="text-lg text-blue-700  bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
//                                 <tr>
//                                     <th scope="col" className="px-12 py-3">
//                                         Sr#
//                                     </th>
//                                     <th scope="col" className="px-6 py-3">
//                                         Student
//                                     </th>
//                                     <th scope="col" className="px-6 py-3">
//                                         Project
//                                     </th>
//                                     <th scope="col" className="px-6 py-3">
//                                         Supervisor
//                                     </th>
//                                     <th scope="col" className="px-6 py-3">
//                                         City
//                                     </th>
//                                     <th scope="col" className="px-6 py-3">
//                                         Status
//                                     </th>
//                                     <th scope="col" className="px-6 py-3">
//                                         Eligible
//                                     </th>
//                                     <th scope="col" className="px-6 py-3">
//                                         Action
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {list && list.map((lis, serial) => (
//                                     <tr className="bg-white border-b text-blue-700 dark:bg-gray-800 dark:border-gray-700" key={lis.id} >
//                                         <td scope="row" className="px-6 py-4 font-medium  whitespace-nowrap dark:text-white">
//                                             {serial + 1}
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             <ul>
//                                                 <li>{lis.name}</li>
//                                                 <li>{lis.vuid}</li>
//                                                 <li>{lis.semester?.code}</li>
//                                             </ul>
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             <ul>
//                                                 <li>{lis.groupid}</li>
//                                                 <li>{lis.project_title}</li>
//                                             </ul>
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             {lis.supervisor?.name}
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             {lis.city?.name}
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             {lis.studentstatus.student_status}
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             {lis.is_eligible === true && "Eligible"}
//                                             {lis.is_eligible === false && "Not Eligible"}
//                                             {lis.is_eligible == null && "Not Processed"}
//                                         </td>
//                                         <td className="px-6 py-4 flex">
//                                             {/* <a href={'/campuses/details/' + cam.id}> */}
//                                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 justify-between align-middle ml-8 hover:cursor-pointer">
//                                                 <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
//                                                 <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
//                                             </svg>


//                                         </td>
//                                     </tr>
//                                 ))}

//                             </tbody>
//                         </table>
//                     </div>
//                     <TablePagination
//                         component="div"
//                         count={100}
//                         page={page}
//                         onPageChange={handleChangePage}
//                         rowsPerPage={studentsPerPage}
//                         onRowsPerPageChange={handleChangestudentsPerPage}
//                     />

//                 </div></Layouts>
//         </div>
//     )
// }

// export default Studentlist

