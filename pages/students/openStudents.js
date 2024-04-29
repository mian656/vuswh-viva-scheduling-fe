import React, { useEffect, useState } from "react";
import axios from "axios";
import Layouts from '@/Components/layouts/lay'
import fetchindData from "./fetchingdata";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/router";



export async function getServerSideProps() {
  const data = await axios.get("/students/openByCurrActSem");
  return {
    props: {
      data: data.data.allStudentByCurrAct,

    }
  }
}


const openstudents = ({ data }) => {

  //useState section
  const [lists, setLists] = useState([])
  const [error, setError] = useState("")
  const [supervisor, setSupervisor] = useState([])
  const [semester, setSemester] = useState([])
  const [meta, setMeta] = useState(data.meta)
  const router = useRouter();

  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedOrderBy, setSelectedOrderBy] = useState('');
  const [selectedSortedBy, setSelectedSortedBy] = useState('');

  //useEffect section
  useEffect(() => {
    axios.get("/students/openByCurrActSem?${params.toString()}")
      .then((res) => {

        setLists(res.data.allStudentByCurrAct.data);
        console.log("my data", res.data.allStudentByCurrAct)
        setSupervisor(res.data.supervisors)
        // console.log((res.data.supervisors))
        setSemester(res.data.semesters)
      })
      .catch((error) => {
        setError(error.message)
      })
  }, [selectedSupervisor, selectedSemester, selectedOrderBy, selectedSortedBy])

  //handle section

  const handleSupervisorChange = (e) => {
    setSelectedSupervisor(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSelectedSortedBy(e.target.value);
  };

  const handleOrderByChange = (e) => {
    setSelectedOrderBy(e.target.value);
  };


  const handleSubmit = async (e) => {
    // console.log("selectedSemester", selectedSemester)
    // console.log("selectedSupervisor", selectedSupervisor)
    e.preventDefault();
    const searchData = {
      supervisor: selectedSupervisor || '',
      semester: selectedSemester || '',
      sortedBy: selectedSortedBy || '',
      orderBy: selectedOrderBy || '',
    };


    try {
      const filteredData = await fetchindData(searchData);
      console.log("Filtered Data:", filteredData);
      // Check the structure of your response and update accordingly
      const dataList = filteredData?.allStudentByCurrAct?.data || [];

      console.log("Filtered Data Array:", filteredData.allStudentByCurrAct.data);
      console.log("datalist checking", dataList)
      setLists(dataList);
      setMeta(filteredData.meta);
      // Update URL with query parameters
      const queryParams = new URLSearchParams(searchData);
      router.push({
        pathname: '/students/openStudents', // Replace with the correct route
        search: queryParams.toString(),
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleReset = () => {
    setSelectedSupervisor('');
    setSelectedSemester('');
    setSelectedOrderBy('');
    setSelectedSortedBy('');
  };




  return (
    <div>
      <Layouts>
        <div className="bg-white">
          <div className="text-blue-700 text-4xl m-8 font-bold mt-0 pt-5">
            Open Students
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
          <div className="container-fluid border-2 border-blue-700 mt-3 rounded-2xl h">
            <form onSubmit={handleSubmit}>
              <div class="grid gap-6 mb-6 md:grid-cols-2 ml-16 mr-56">
                <div>
                  <label
                    htmlFor="Supervisors"
                    class="block mb-2 mt-4 text-sm font-medium text-blue-500 dark:text-white"
                  >
                    Supervisors
                  </label>
                  <select
                    id="Supervisors"
                    value={selectedSupervisor}
                    onChange={handleSupervisorChange}
                    className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-500 focus:outline-none text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Select</option>
                    {supervisor && supervisor.map((supers) => (
                      <option key={supers.id} value={supers.name}>
                        {supers.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="Semesters"
                    class="block mb-2 mt-4 text-sm font-medium text-blue-500 dark:text-white"
                  >
                    Semesters
                  </label>
                  <select
                    id="Semesters"
                    value={selectedSemester}
                    onChange={handleSemesterChange}
                    className="bg-gray-50  border  border-gray-50 outline outline-2 outline-gray-500 focus:outline-none text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Select</option>
                    {semester && semester.map((sem) => (
                      <option key={sem.id} value={sem.code}>
                        {sem.code}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="Sorted By"
                    class="block mb-2 text-sm font-medium text-blue-500 dark:text-white"
                  >
                    Sorted By
                  </label>
                  <select
                    id="Sorted By"
                    className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-500 focus:outline-none text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Select</option>

                  </select>
                </div>

                <div>
                  <label
                    htmlFor="Order By"
                    class="block mb-2 text-sm font-medium text-blue-500 dark:text-white"
                  >
                    Order By
                  </label>
                  <select
                    id="Order By"
                    value={selectedOrderBy}
                    onChange={handleOrderByChange}
                    className="bg-gray-50 border border-gray-50 outline outline-2 outline-gray-500 focus:outline-none text-blue-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-60 m-  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >

                    <option selected>Select</option>
                    <option value="name">Name</option>
                    <option value="vuid">VUID</option>
                    <option value="semesterCode">Semester Code</option>
                    <option value="groupid">Group ID</option>
                  </select>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-blue-700 rounded-xl w-40 px-6 text-white h-10 float-right mr-48 -mt-14"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-blue-700 rounded-xl w-40 px-6 text-white h-10 float-right mr-5 -mt-14"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
          <div className="bg-gray-500 mt-2 h-16 w-full">
            <button
              type="button"
              className="inline-block float-right mr-12 rounded w-52 bg-blue-900 mt-3 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
            >
              Start Scrutiny
            </button>

            <button
              type="button"
              className="inline-block float-right mr-8 rounded w-52 bg-blue-900 mt-3 px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
            >
              Import Students
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
                    Supervisor
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
                {lists && lists.map((dat, serial) => (

                  <tr class="bg-white border-b text-center text-blue-700 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={dat.id}>
                    <td class="w-4 px-14">
                      <div class="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 focus:outline-none bg-gray-100 border-gray-300 rounded  dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                      </div>
                    </td>
                    <td scope="row" class="px-6 py-4 ">
                      {serial + 1}
                    </td>
                    <td class="px-6 py-4">
                      <ul>
                        <li>{dat.name}</li>
                        <li>{dat.vuid}</li>
                      </ul>
                    </td>
                    <td class="px-6 py-4">
                      <ul>
                        <li>{dat.groupid}</li>
                        <li>{dat.project_title}</li>
                      </ul>
                    </td>
                    <td class="px-6 py-4">
                      {dat.supervisor?.name}
                    </td>
                    <td class="px-6 py-4">
                      {dat.city.name}
                    </td>
                    <td class="px-6 py-4">
                      {dat.is_eligible === true && "Eligible"}
                      {dat.is_eligible === false && "Not Eligible"}
                      {dat.is_eligible == null && "Not Processed"}
                    </td>

                    <td class="flex items-center px-6 py-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 justify-between align-middle ml-4 hover:cursor-pointer"
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
        </div>
      </Layouts>
    </div>
  );
}

export default openstudents