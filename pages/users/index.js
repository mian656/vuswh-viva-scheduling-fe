import { useState, useEffect } from "react";
// import Layouts from "@/Components/layouts/lay";
import axios from "axios"
import Swal from "sweetalert2";
import { useRouter } from 'next/router';
import fetchindData from './fetchingData';
import { useSearchParams } from 'next/navigation';
// import Layout from "@/Components/layouts/Layout";
import Layout from "@/Components/layouts/Layout";
// import TablePaginationDemo from "@/Components/pagination";
import TablePaginationDemo from "@/Components/pagination";
import Pagination from "@/Components/paginationC";

const userlist = () => {
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [isError, setIsError] = useState("");
    const [roles, setRoles] = useState([]);
    const [status, setStatus] = useState("")
    const [meta, setMeta] = useState({});
    const [data, setdata] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentTake, setCurrentTake] = useState(10)

    const [selectedStudents, setSelectedStudents] = useState('');
    const [selectedRoles, setSelectedRoles] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    // const { page, pageCount, hasPreviousPage, hasNextPage, take, itemCount } = meta;

    let startIndex = (meta.page - 1) * meta.take
    const handleReload = () => {
        // Reload the page
        window.location.reload();
    };

    // const page =searchParams['page'] ?? '1'
    // const per_page =searchParams['per_page'] ?? '1'

    const Activeuser = (e, user) => {
        if (user.is_active === false) {
            Swal.fire({
                title: "Activate/ Deactivate User",
                text: "You want to activate User",
                // showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Activate",
                // denyButtonText: `Deactivate`
            })
                .then(async (result) => {
                    // / Read more about isConfirmed, isDenied below /
                    if (result.isConfirmed) {
                        const activate = "/users/ActivateDeactivate/" + user.id + "?action=activate";
                        await axios.patch(activate);
                        Swal.fire("Saved!", "", "success");
                        // Handle the user's confirmation
                        handleReload();
                    }

                    else if (result.isDenied) {
                        const deactivate = "/users/ActivateDeactivate/" + user.id + "?action=deactivate";
                        await axios.patch(deactivate);
                        Swal.fire("Changes are saved", "", "success");
                        // Handle the user's confirmation
                        handleReload();
                    }
                });
        }
        if (user.is_active === true) {
            Swal.fire({
                title: "Activate/ Deactivate User",
                text: "You want to deactivate User",
                showCancelButton: true,
                confirmButtonText: "Deactivate",
                confirmButtonColor: "red",
            })
                .then(async (result) => {
                    // / Read more about isConfirmed, isDenied below /
                    if (result.isConfirmed) {
                        const activate = "/users/ActivateDeactivate/" + user.id + "?action=deactivate";
                        await axios.patch(activate);
                        Swal.fire("Saved!", "", "success");
                        // Handle the user's confirmation
                        handleReload();
                    }

                    else if (result.isDenied) {
                        const deactivate = "/users/ActivateDeactivate/" + user.id + "?action=activate";
                        await axios.patch(deactivate);
                        Swal.fire("Changes are saved", "", "success");
                        // Handle the user's confirmation
                        handleReload();
                    }
                });
        }
    }

    const Delete = (e, uid) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You want to Delete from the list.Are You sure to delete it!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const deleteUrl = "/users/delete/" + uid
                await axios.delete(deleteUrl);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                // Handle the user's confirmation
                handleReload();
            }
            else
                Swal.fire("Canceled", 'info');
            // Handle the user's confirmation
            handleReload();
        });
    }

    const Update = (uid) => {
        const updateUserLink = '/update' + uid;
        console.log(updateUserLink)
    }

    // function userlist({ data }) { }

    useEffect(() => {
        axios
            .get(`/users/pagedata?page=${currentPage}&take=${currentTake}`)
            .then((data) => {
                console.log("checkdata", data)
                console.log("testingdata", data.data.pagedata.meta);
                console.log("Current Page:", router.query.page);
                console.log("metatesting", data.data.pagedata.meta);
                setdata(data.data.pagedata.data);
                setMeta(data.data.pagedata.meta);
                setUsers(data.data.pagedata.data);
                setRoles(data.data.roles);
                setStatus(data.data.is_active);
            })
            .catch((err) => {
                setIsError(err.message);
            });
    }, [currentPage, currentTake, selectedStudents, selectedRoles, selectedStatus]);


    //handle section

    const handleStudentChange = (e) => {
        setSelectedStudents(e.target.value);
    };

    const handleRolesChange = (e) => {
        setSelectedRoles(e.target.value);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleSubmit = async (e) => {
        // console.log("selectedSemester", selectedSemester)
        // console.log("selectedSupervisor", selectedSupervisor)
        e.preventDefault();
        const searchData = {
            student: selectedStudents || '',
            roles: selectedRoles || '',
            status: selectedStatus || '',
        };

        try {
            const filteredData = await fetchindData(searchData);
            // Check the structure of your response and update accordingly
            const dataList = filteredData?.pagedata.data || [];
            const MetaData = filteredData?.pagedata.meta
            setUsers(dataList);
            setMeta(MetaData);
            // Update URL with query parameters
            const queryParams = new URLSearchParams(searchData);
            router.push({
                pathname: '/users', // Replace with the correct route
                search: queryParams.toString(),
            });
        } catch (error) {
            setIsError(error.message);
        }
    };

    const handleReset = () => {
        setSelectedStudents('');
        setSelectedRoles('');
        setSelectedStatus('');
    };

    const filteredUsers = users.filter(user => user.status === selectedStatus);


    return (

        <>
            <Layout>
                {isError != "" && <h3>{(isError)}</h3>}
                <div className='relative m-6 p-5 bg-gray-500 text-blue-700 overflow-hidden rounded-2xl'>
                    <input type='checkbox' className='absolute peer top-0 inset-x-0 w-full h-12 z-10  cursor-pointer opacity-0' />
                    <div className=' bg-gray-500    text-black h-12 w-full pl-5 flex items-center'>
                        <h1 className='text-lg font-bold bg-gray-500 text-black'>Filters</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                    <div className='bg-white text-blue-700 overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-40'>
                        <div className='p-4'>
                            <input className="border m-5 w-80 h-10 p-2 ml-20  outline-2 outline outline-gray-400 border-gray-50 rounded-xl"
                                type='text'
                                value={selectedStudents}
                                onChange={handleStudentChange}
                                placeholder='Full Name' />
                            <select id='roles'
                                value={selectedRoles}
                                onChange={handleRolesChange}
                                placeholder="roles"
                                className="border m-5 w-80 h-10 p-2 ml-5 outline-2 outline outline-gray-400 border-gray-50 rounded-2xl">
                                {roles.map((rol) => {
                                    return <option key={rol.name} value={rol.name} >{rol.name}</option>
                                })}
                            </select>

                            <button type='button'
                                className="border m-4 w-80 h-10 p-2 outline-2 outline outline-gray-400 border-gray-50 rounded-2xl text-lg">Status<label className="relative inline-flex items-center cursor-pointer ml-3">
                                    <input type="checkbox" value={selectedStatus}
                                        onChange={handleStatusChange} className="sr-only peer ml-20" />
                                    <div className="w-9 h-5 outline outline-gray-400  border-blue-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-sky-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-sky-200"></div>
                                </label></button><br />
                        </div>

                        <div className='flex space-x-2 p-1 float-right mr-5'>
                            <button className="bg-blue-700  text-[#eeeff1] p-2 px-7 w-36  rounded-xl hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium" type="button" onClick={handleReset}>Cancel</button>
                            <button className="bg-blue-700  text-[#eeeff1] p-2 px-7 w-36  rounded-xl hover:scale-105 duration-300 hover:bg-[#1a3f49] font-medium" type="submit" onClick={handleSubmit}>Apply Filters</button>
                        </div>
                    </div>
                </div>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg mb-24 ml-5 mr-5 mt-5">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
                            <tr>

                                <th scope="col" class="px-6 py-3">
                                    SR#
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Full Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    User Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Roles
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Phone no
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {/* <tbody className="divide-y divide-blue-600">
                        {
                            users.map((user, serial) => {
                                return (
                                    <tr className=" text-center h-20 align-middle">
                                        <td className=" border-blue-800 y-2 px-4 py-1 text-sm ">{serial + 1}</td>
                                        <td className="    border-blue-800 y-2 px-4 py-1 text-sm align-middle">{user.fullname}</td>
                                        <td className="    border-blue-800 y-2 px-4 py-1 text-sm ">{user.username}</td>
                                        <td className="   border-blue-800 y-2 px-4 py-1 text-sm ">
                                            <ul>
                                                {user.roles.map((role) => (
                                                    <li>  <span key={role.id} className="inline-block m-1 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                                        {role.name}
                                                    </span></li>
                                                ))}</ul></td>
                                        <td className="   border-blue-800 y-2 px-4 py-1 text-sm ">
                                            <span onClick={(e) => Activeuser(e, user.id)}>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" value="" className="sr-only peer " checked={user.is_active} />
                                                    <div className="w-9 h-5 outline outline-gray-400  border-blue-500 peer-focus:outline-none peer-focus:ring-2
                                                 peer-focus:ring-blue-300 dark:peer-focus:ring-sky-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
                                                  peer-checked:after:border-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300
                                                   after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-sky-200"></div>
                                                </label></span>
                                        </td>
                                        <td className="  border-blue-800 y-2  px-4 py-1 text-sm ">{user.email}</td>
                                        <td className="  border-blue-800 y-2  px-4 py-1 text-sm ">{user.phoneno}</td>
                                        <td className="  border-blue-800 y-2  px-4 py-1  text-sm flex">
                                            <a href={'/users/update/' + user.id}>
                                                <svg onClick={Update} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mt-5 ml-5">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                            </a>
                                            <span onClick={(e) => Delete(e, user.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mt-5 hover:cursor-pointer">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg></span>
                                        </td>
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody> */}


                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                    <td class="px-6 py-4">
                                        {startIndex += 1}
                                    </td>

                                    <td class="px-6 py-4">
                                        {user.fullname}
                                    </td>
                                    <td class="px-6 py-4">
                                        {user.username}
                                    </td>
                                    <td className="   border-blue-800 y-2 px-4 py-1 text-sm ">
                                        <ul>
                                            {user.roles.map((role) => (
                                                <li>  <span key={role.id} className="inline-block m-1 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                                    {role.name}
                                                </span></li>
                                            ))}</ul></td>
                                    <td className="   border-blue-800 y-2 px-4 py-1 text-sm ">
                                        <span onClick={(e) => Activeuser(e, user)}>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" value="" className="sr-only peer " checked={user.is_active} />
                                                <div className="w-9 h-5 outline outline-gray-400  border-blue-500 peer-focus:outline-none peer-focus:ring-2
                                                 peer-focus:ring-blue-300 dark:peer-focus:ring-sky-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
                                                  peer-checked:after:border-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300
                                                   after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-sky-200"></div>
                                            </label></span>
                                    </td>

                                    <td class="px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td className="  border-blue-800 y-2  px-4 py-1 text-sm ">{user.phoneno}</td>
                                    <td className="  border-blue-800 y-2  px-4 py-1  text-sm flex">
                                        <a href={'/users/update/' + user.id}>
                                            <svg onClick={Update} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mt-5 ml-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </a>
                                        <span onClick={(e) => Delete(e, user.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mt-5 hover:cursor-pointer">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg></span>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                    <Pagination meta={meta} router={router} currentPage={currentPage} setCurrentPage={setCurrentPage} currentTake={currentTake} setCurrentTake={setCurrentTake} />{" "}
                </div>
                {/* <div className='container-fluid flex border-2  border-blue-600 bg-opacity-70 mt-6 rounded-xl mx-4 w-[1100px] bg-blue-700'>
                    <select className='ml-5 w-16 rounded-lg h-10 mt-1 text-black'>
                        <option selected>10 </option>
                        <option value="1">20</option>
                    </select>
                    <span className='text-white flex-col text-xs ml-2 mt-1'>User Per Page</span>
                    <div className='text-white text-center -mt-1 ml-[300px]'>
                        Page <span className='bg-white text-black flex-col flex text-center'>1</span>
                    </div>
                    <nav aria-label="Page navigation example">
                        <ul className="inline-flex -space-x-px text-base float-right ml-72 mr-3 mt-1  h-10">
                            <li>
                                <a href="#" className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                            </li>
                            <li>
                                <a href="#" aria-current="page" className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div> */}
            </Layout>
        </>

    )
}

export default userlist